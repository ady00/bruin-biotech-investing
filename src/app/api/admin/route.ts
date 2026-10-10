import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';

// Content is edited by committing to GitHub, which triggers a Vercel redeploy.
// Without GITHUB_TOKEN (local dev), edits are written straight to disk instead.
const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPO || 'ady00/bruin-biotech-investing';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

const ASSET_DIRS = ['public/team/', 'public/pitches/', 'public/newsletter/'];

type Change = {
  path: string;
  delete?: boolean;
  data?: Record<string, unknown>; // markdown frontmatter
  body?: string; // markdown body
  base64?: string; // uploaded image / pdf
};

function authorized(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const given = request.headers.get('x-admin-password') || '';
  const hash = (s: string) => crypto.createHash('sha256').update(s).digest();
  // ponytail: no rate limiting on guesses, add one if the password is ever weak/leaked
  return crypto.timingSafeEqual(hash(given), hash(expected));
}

function validPath(change: Change) {
  const p = change.path;
  if (p.includes('..') || p.includes('\\') || p.startsWith('/')) return false;
  if (change.base64 !== undefined) return ASSET_DIRS.some((dir) => p.startsWith(dir));
  return p.startsWith('content/') && p.endsWith('.md');
}

function toFile(change: Change): Buffer {
  if (change.base64 !== undefined) return Buffer.from(change.base64, 'base64');
  const data = Object.fromEntries(
    Object.entries(change.data || {}).filter(([, v]) => v !== '' && v !== null && v !== undefined)
  );
  const body = (change.body || '').trim();
  // lineWidth -1: don't fold long URLs onto a second line
  return Buffer.from(matter.stringify(body ? `\n${body}` : '', data, { lineWidth: -1 } as object).trimEnd() + '\n');
}

async function gh(endpoint: string, init?: { method: string; body: unknown }) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${endpoint}`, {
    method: init?.method || 'GET',
    body: init ? JSON.stringify(init.body) : undefined,
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function listFiles(): Promise<{ path: string; read: () => Promise<string> }[]> {
  if (TOKEN) {
    const { tree } = await gh(`/git/trees/${BRANCH}?recursive=1`);
    return tree
      .filter((e: { type: string }) => e.type === 'blob')
      .map((e: { path: string; sha: string }) => ({
        path: e.path,
        read: async () => Buffer.from((await gh(`/git/blobs/${e.sha}`)).content, 'base64').toString('utf8'),
      }));
  }
  const root = process.cwd();
  return ['content', ...ASSET_DIRS]
    .filter((dir) => fs.existsSync(path.join(root, dir)))
    .flatMap((dir) => fs.readdirSync(path.join(root, dir), { recursive: true, encoding: 'utf8' }).map((f) => path.posix.join(dir, f)))
    .filter((p) => fs.statSync(path.join(root, p)).isFile())
    .map((p) => ({ path: p, read: async () => fs.readFileSync(path.join(root, p), 'utf8') }));
}

async function commit(changes: Change[], message: string) {
  if (!TOKEN) {
    if (process.env.VERCEL) throw new Error('GITHUB_TOKEN is not set in Vercel, so changes cannot be saved.');
    for (const change of changes) {
      const full = path.join(process.cwd(), change.path);
      if (change.delete) fs.rmSync(full, { force: true });
      else {
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, toFile(change));
      }
    }
    return;
  }

  // All changes go into a single commit, so the site only redeploys once.
  const head = (await gh(`/git/ref/heads/${BRANCH}`)).object.sha;
  const baseTree = (await gh(`/git/commits/${head}`)).tree.sha;
  const tree = await Promise.all(
    changes.map(async (change) => ({
      path: change.path,
      mode: '100644',
      type: 'blob',
      sha: change.delete
        ? null
        : (await gh('/git/blobs', { method: 'POST', body: { content: toFile(change).toString('base64'), encoding: 'base64' } })).sha,
    }))
  );
  const newTree = await gh('/git/trees', { method: 'POST', body: { base_tree: baseTree, tree } });
  const newCommit = await gh('/git/commits', { method: 'POST', body: { message, tree: newTree.sha, parents: [head] } });
  await gh(`/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: { sha: newCommit.sha } });
}

export async function GET(request: Request) {
  if (!authorized(request)) return Response.json({ error: 'Wrong password' }, { status: 401 });
  try {
    const files = await listFiles();
    const docs = await Promise.all(
      files
        .filter((f) => f.path.startsWith('content/') && f.path.endsWith('.md'))
        .map(async (f) => {
          // Copy: gray-matter caches parsed results by input string
          const { data, content } = matter(await f.read());
          return { path: f.path, data: structuredClone(data), body: content.trim() };
        })
    );
    const assets = files.map((f) => f.path).filter((p) => ASSET_DIRS.some((dir) => p.startsWith(dir)));
    return Response.json({ docs, assets, mode: TOKEN ? 'github' : 'local' });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: 'Wrong password' }, { status: 401 });
  const { changes, message } = (await request.json()) as { changes: Change[]; message?: string };
  if (!Array.isArray(changes) || changes.length === 0) return Response.json({ error: 'Nothing to publish' }, { status: 400 });
  const bad = changes.find((c) => !validPath(c));
  if (bad) return Response.json({ error: `Not allowed to edit ${bad.path}` }, { status: 400 });
  try {
    await commit(changes, message?.trim() || 'Update content via admin portal');
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
