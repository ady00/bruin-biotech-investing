'use client';

import { useEffect, useState } from 'react';

type Data = Record<string, unknown>;
type Doc = { path: string; data: Data; body: string; status?: 'new' | 'changed' | 'deleted' };
type Upload = { path: string; base64: string; preview: string };

type Field = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'month' | 'file' | 'list';
  options?: string[];
  dir?: string; // file: folder inside public/ to pick from / upload to
  accept?: string;
  fields?: Field[]; // list: the fields of each row
  hint?: string;
};

type Section = {
  id: string;
  label: string;
  dir: string;
  single?: boolean; // one settings file (dir/config.md) instead of a list of entries
  titleKey: string;
  subtitle?: (data: Data) => string;
  fields: Field[];
  body?: string; // label for the free-text part of the file
  sort?: { key: string; desc?: boolean };
  hint?: string;
};

const PERSON: Field[] = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position', hint: 'e.g. President, Analyst, Board Member' },
  { key: 'image', label: 'Headshot', type: 'file', dir: 'team', accept: 'image/*', hint: 'Square photos look best' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'order', label: 'Display order', type: 'number', hint: '1 = shown first' },
];

const SECTIONS: Section[] = [
  {
    id: 'newsletters',
    label: 'Newsletters',
    dir: 'content/newsletters',
    titleKey: 'title',
    subtitle: (d) => String(d.date || ''),
    fields: [
      { key: 'title', label: 'Title', hint: 'e.g. October 2026 Issue' },
      { key: 'date', label: 'Issue month', type: 'month', hint: 'The newest month is shown as the latest issue' },
      { key: 'pdfUrl', label: 'Newsletter PDF', type: 'file', dir: 'newsletter', accept: 'application/pdf' },
    ],
    sort: { key: 'date', desc: true },
  },
  {
    id: 'recruitment',
    label: 'Recruiting Settings',
    dir: 'content/recruitment',
    single: true,
    titleKey: 'status',
    fields: [
      { key: 'status', label: 'Applications', type: 'select', options: ['open', 'closed'], hint: 'Open shows the "Apply Now" button; closed greys it out' },
      { key: 'applicationUrl', label: 'Google Form link', hint: 'Where the "Apply Now" button goes' },
      { key: 'quarter', label: 'Quarter', type: 'select', options: ['Fall', 'Winter', 'Spring'] },
      { key: 'year', label: 'Year' },
    ],
  },
  {
    id: 'events',
    label: 'Recruiting Timeline',
    dir: 'content/recruitment/events',
    titleKey: 'name',
    subtitle: (d) => [d.date, d.time].filter(Boolean).join(' · '),
    fields: [
      { key: 'name', label: 'Event name' },
      { key: 'date', label: 'Date', hint: 'Or TBA' },
      { key: 'time', label: 'Time', hint: 'Or TBA' },
      { key: 'location', label: 'Location', hint: 'Or TBA' },
      { key: 'order', label: 'Display order', type: 'number', hint: '1 = first event' },
    ],
    body: 'Description',
    sort: { key: 'order' },
  },
  {
    id: 'faqs',
    label: 'FAQs',
    dir: 'content/recruitment/faqs',
    titleKey: 'question',
    fields: [
      { key: 'question', label: 'Question' },
      { key: 'order', label: 'Display order', type: 'number' },
    ],
    body: 'Answer',
    sort: { key: 'order' },
  },
  {
    id: 'executive',
    label: 'Executive Board',
    dir: 'content/team/executive',
    titleKey: 'name',
    subtitle: (d) => String(d.position || ''),
    fields: PERSON,
    sort: { key: 'order' },
  },
  {
    id: 'members',
    label: 'Members',
    dir: 'content/team/members',
    titleKey: 'name',
    subtitle: (d) => String(d.position || ''),
    fields: PERSON,
    sort: { key: 'order' },
  },
  {
    id: 'board',
    label: 'Board Members',
    dir: 'content/team/board',
    titleKey: 'name',
    subtitle: (d) => String(d.position || ''),
    fields: PERSON,
    sort: { key: 'order' },
  },
  {
    id: 'placements',
    label: 'Placements',
    dir: 'content/team/placements',
    titleKey: 'year',
    subtitle: (d) => `${Array.isArray(d.placements) ? d.placements.length : 0} placements`,
    fields: [
      { key: 'year', label: 'Class year', hint: 'e.g. 2028' },
      {
        key: 'placements',
        label: 'Placements',
        type: 'list',
        fields: [
          { key: 'name', label: 'Student name' },
          { key: 'company', label: 'Company' },
          { key: 'type', label: 'Type', type: 'select', options: ['Internship', 'Full-time'] },
        ],
      },
    ],
    sort: { key: 'year', desc: true },
  },
  {
    id: 'pitches',
    label: 'Stock Pitches',
    dir: 'content/pitches',
    titleKey: 'company',
    subtitle: (d) => [d.ticker, d.thesis].filter(Boolean).join(' · '),
    fields: [
      { key: 'company', label: 'Company', hint: 'e.g. Pfizer Inc.' },
      { key: 'ticker', label: 'Ticker' },
      { key: 'thesis', label: 'Thesis', type: 'select', options: ['Long', 'Short'] },
      { key: 'date', label: 'Date', hint: 'e.g. March 2025' },
      { key: 'author', label: 'Author(s)' },
      { key: 'pdfUrl', label: 'Pitch PDF', type: 'file', dir: 'pitches', accept: 'application/pdf' },
    ],
    body: 'Summary (1-2 sentences)',
    hint: 'Note: pitches are not currently displayed anywhere on the public site.',
  },
];

const PASSWORD_KEY = 'bbi-admin-password';
const MAX_PDF_BYTES = 3_000_000;
const MAX_PUBLISH_BYTES = 4_000_000; // Vercel rejects request bodies over 4.5 MB

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]';
const buttonClass =
  'rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--surface-hover)] disabled:opacity-50';
const primaryClass =
  'rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50';

const dirOf = (p: string) => p.slice(0, p.lastIndexOf('/'));
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';
const assetUrl = (p: string) => p.replace(/^public/, '');

function compare(a: unknown, b: unknown) {
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true });
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Phone photos are often 5-15 MB; shrink them so uploads fit and pages load fast.
async function shrinkImage(file: File): Promise<Blob> {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 800 / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not process image'))), 'image/jpeg', 0.85)
  );
}

type Ctx = {
  assets: string[];
  uploads: Upload[];
  addUpload: (file: File, dir: string) => Promise<string | null>;
};

function FieldInput({ field, value, onChange, ctx }: { field: Field; value: unknown; onChange: (v: unknown) => void; ctx: Ctx }) {
  const str = value === undefined || value === null ? '' : String(value);

  if (field.type === 'select') {
    return (
      <select className={inputClass} value={str} onChange={(e) => onChange(e.target.value)}>
        {field.options!.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'number') {
    return (
      <input
        type="number"
        className={inputClass}
        value={str}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
      />
    );
  }

  if (field.type === 'month') {
    return <input type="month" className={inputClass} value={str} onChange={(e) => onChange(e.target.value)} />;
  }

  if (field.type === 'list') {
    const rows = Array.isArray(value) ? (value as Data[]) : [];
    const setRow = (i: number, row: Data) => onChange(rows.map((r, j) => (j === i ? row : r)));
    return (
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-center">
            {field.fields!.map((sub) => (
              <div key={sub.key} className="flex-1 min-w-[140px]">
                <FieldInput field={sub} value={row[sub.key]} onChange={(v) => setRow(i, { ...row, [sub.key]: v })} ctx={ctx} />
              </div>
            ))}
            <button type="button" className={buttonClass} onClick={() => onChange(rows.filter((_, j) => j !== i))} aria-label="Remove row">
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={buttonClass}
          onClick={() => onChange([...rows, Object.fromEntries(field.fields!.map((f) => [f.key, f.options?.[0] ?? '']))])}
        >
          + Add row
        </button>
      </div>
    );
  }

  if (field.type === 'file') {
    const prefix = `public/${field.dir}/`;
    const choices = [...new Set([...ctx.assets, ...ctx.uploads.map((u) => u.path)])]
      .filter((p) => p.startsWith(prefix))
      .sort()
      .map(assetUrl);
    const pending = ctx.uploads.find((u) => assetUrl(u.path) === str);
    const isImage = field.accept?.startsWith('image');
    return (
      <div className="flex flex-wrap items-center gap-3">
        {isImage && str && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pending?.preview || str} alt="" className="w-16 h-16 rounded-lg object-cover border border-[var(--border)]" />
        )}
        <select className={`${inputClass} flex-1 min-w-[200px]`} value={str} onChange={(e) => onChange(e.target.value)}>
          <option value="">(none)</option>
          {choices.map((c) => (
            <option key={c} value={c}>
              {c.split('/').pop()}
            </option>
          ))}
        </select>
        <label className={`${buttonClass} cursor-pointer`}>
          Upload new…
          <input
            type="file"
            accept={field.accept}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (!file) return;
              const url = await ctx.addUpload(file, field.dir!);
              if (url) onChange(url);
            }}
          />
        </label>
        {!isImage && str && (
          <a href={pending?.preview || str} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
            View
          </a>
        )}
      </div>
    );
  }

  return <input type="text" className={inputClass} value={str} onChange={(e) => onChange(e.target.value)} />;
}

function DocForm({ section, doc, onChange, ctx }: { section: Section; doc: Doc; onChange: (patch: Partial<Doc>) => void; ctx: Ctx }) {
  return (
    <div className="space-y-4">
      {section.fields.map((field) => {
        // Fields with several controls can't sit inside one <label>
        const Wrapper = field.type === 'list' || field.type === 'file' ? 'div' : 'label';
        return (
          <Wrapper key={field.key} className="block">
            <span className="block text-sm font-medium mb-1">{field.label}</span>
            <FieldInput
              field={field}
              value={doc.data[field.key]}
              onChange={(v) => onChange({ data: { ...doc.data, [field.key]: v } })}
              ctx={ctx}
            />
            {field.hint && <span className="block text-xs text-[var(--muted)] mt-1">{field.hint}</span>}
          </Wrapper>
        );
      })}
      {section.body && (
        <label className="block">
          <span className="block text-sm font-medium mb-1">{section.body}</span>
          <textarea className={`${inputClass} min-h-[100px]`} value={doc.body} onChange={(e) => onChange({ body: e.target.value })} />
        </label>
      )}
    </div>
  );
}

export function AdminPortal() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [mode, setMode] = useState('');
  const [sectionId, setSectionId] = useState(SECTIONS[0].id);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);

  const pending = docs.filter((d) => d.status).length + uploads.length;

  async function load(pw: string) {
    setBusy(true);
    try {
      const res = await fetch('/api/admin', { headers: { 'x-admin-password': pw } });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(PASSWORD_KEY);
          setAuthed(false);
        }
        setNotice({ text: json.error || 'Something went wrong', error: true });
        return false;
      }
      sessionStorage.setItem(PASSWORD_KEY, pw);
      setPassword(pw);
      setAuthed(true);
      setDocs(json.docs);
      setAssets(json.assets);
      setUploads([]);
      setMode(json.mode);
      return true;
    } catch (e) {
      setNotice({ text: String(e), error: true });
      return false;
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) load(saved);
  }, []);

  // Warn before leaving with unpublished edits
  useEffect(() => {
    if (!pending) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [pending]);

  async function addUpload(file: File, dir: string) {
    try {
      const isImage = file.type.startsWith('image/');
      if (!isImage && file.size > MAX_PDF_BYTES) {
        setNotice({ text: `${file.name} is over 3 MB. Please compress the PDF first.`, error: true });
        return null;
      }
      const blob = isImage ? await shrinkImage(file) : file;
      const base = slug(file.name.replace(/\.[^.]+$/, ''));
      const ext = isImage ? 'jpg' : file.name.split('.').pop()!.toLowerCase();
      let path = `public/${dir}/${base}.${ext}`;
      if (assets.includes(path) || uploads.some((u) => u.path === path)) path = `public/${dir}/${base}-${Date.now()}.${ext}`;
      const upload = { path, base64: await toBase64(blob), preview: URL.createObjectURL(blob) };
      setUploads((u) => [...u, upload]);
      return assetUrl(path);
    } catch {
      setNotice({ text: `Could not read ${file.name}. Try a JPG or PNG.`, error: true });
      return null;
    }
  }

  function updateDoc(path: string, patch: Partial<Doc>) {
    setDocs((ds) => ds.map((d) => (d.path === path ? { ...d, ...patch, status: d.status === 'new' ? 'new' : 'changed' } : d)));
  }

  function removeDoc(doc: Doc) {
    if (doc.status === 'new') setDocs((ds) => ds.filter((d) => d !== doc));
    else setDocs((ds) => ds.map((d) => (d === doc ? { ...d, status: 'deleted' } : d)));
  }

  function addDoc(section: Section) {
    const inSection = docs.filter((d) => dirOf(d.path) === section.dir);
    const data: Data = {};
    for (const f of section.fields) {
      if (f.type === 'select') data[f.key] = f.options![0];
      if (f.type === 'list') data[f.key] = [];
      if (f.type === 'month') data[f.key] = new Date().toISOString().slice(0, 7);
      if (f.key === 'order') data.order = Math.max(0, ...inSection.map((d) => Number(d.data.order) || 0)) + 1;
    }
    const path = section.single ? `${section.dir}/config.md` : `${section.dir}/__new-${Date.now()}.md`;
    setDocs((ds) => [...ds, { path, data, body: '', status: 'new' }]);
    setOpenPath(path);
  }

  async function publish() {
    const changed = docs.filter((d) => d.status);
    const taken = new Set(docs.map((d) => d.path));
    const changes: Record<string, unknown>[] = [];
    const touched = new Set<string>();

    for (const doc of changed) {
      const section = SECTIONS.find((s) => s.dir === dirOf(doc.path))!;
      touched.add(section.label);
      if (doc.status === 'deleted') {
        changes.push({ path: doc.path, delete: true });
        continue;
      }
      if (!section.single && !doc.data[section.titleKey]) {
        const label = section.fields.find((f) => f.key === section.titleKey)!.label;
        setNotice({ text: `An entry in ${section.label} is missing its ${label}.`, error: true });
        setSectionId(section.id);
        setOpenPath(doc.path);
        return;
      }
      let path = doc.path;
      if (path.includes('/__new-')) {
        // Name new files like the existing ones, e.g. 15-jane-doe.md
        const order = Number(doc.data.order);
        const base = (order ? `${String(order).padStart(2, '0')}-` : '') + slug(String(doc.data[section.titleKey]));
        path = `${section.dir}/${base}.md`;
        for (let i = 2; taken.has(path); i++) path = `${section.dir}/${base}-${i}.md`;
        taken.add(path);
      }
      changes.push({ path, data: doc.data, body: doc.body });
    }

    // Only upload files that are still used somewhere
    const live = JSON.stringify(docs.filter((d) => d.status !== 'deleted').map((d) => d.data));
    const used = uploads.filter((u) => live.includes(JSON.stringify(assetUrl(u.path))));
    changes.push(...used.map((u) => ({ path: u.path, base64: u.base64 })));
    if (used.length) touched.add('uploads');

    if (!changes.length) {
      setNotice({ text: 'Nothing to publish.' });
      return;
    }
    const size = used.reduce((n, u) => n + u.base64.length, 0);
    if (size > MAX_PUBLISH_BYTES) {
      setNotice({ text: 'Too many files at once. Publish a few uploads at a time.', error: true });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes, message: `Admin portal: update ${[...touched].join(', ')}` }),
      });
      const json = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
      if (!res.ok) {
        setNotice({ text: json.error, error: true });
        return;
      }
      setOpenPath(null);
      if (await load(password)) {
        setNotice({
          text: mode === 'github' ? 'Published! The live site will update in about 3–5 minutes.' : 'Saved to local files.',
        });
      }
    } finally {
      setBusy(false);
    }
  }

  const noticeEl = notice && (
    <div
      role="status"
      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
        notice.error ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-[var(--border)]'
      }`}
    >
      {notice.text}
    </div>
  );

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold mb-6">Admin</h1>
        {noticeEl}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(null);
            load(password);
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="block text-sm font-medium mb-1">Password</span>
            <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
          </label>
          <button type="submit" className={`${primaryClass} w-full`} disabled={busy || !password}>
            {busy ? 'Checking…' : 'Log in'}
          </button>
        </form>
      </div>
    );
  }

  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const ctx: Ctx = { assets, uploads, addUpload };
  const items = docs
    .filter((d) => dirOf(d.path) === section.dir)
    .sort((a, b) => (section.sort ? compare(a.data[section.sort.key], b.data[section.sort.key]) * (section.sort.desc ? -1 : 1) : 0));
  const single = section.single && items.find((d) => d.path === `${section.dir}/config.md`);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="font-heading text-3xl font-bold mr-auto">Admin</h1>
        {mode === 'local' && <span className="text-xs text-[var(--muted)]">Local mode: saves to files on this computer</span>}
        <span className="text-sm text-[var(--muted)]">
          {pending ? `${pending} unpublished change${pending === 1 ? '' : 's'}` : 'All changes published'}
        </span>
        <button
          className={buttonClass}
          disabled={!pending || busy}
          onClick={() => confirm('Discard all unpublished changes?') && load(password)}
        >
          Discard
        </button>
        <button className={primaryClass} disabled={!pending || busy} onClick={publish}>
          {busy ? 'Working…' : 'Publish changes'}
        </button>
        <button
          className={buttonClass}
          onClick={() => {
            if (pending && !confirm('You have unpublished changes. Log out anyway?')) return;
            sessionStorage.removeItem(PASSWORD_KEY);
            setPassword('');
            setAuthed(false);
            setNotice(null);
          }}
        >
          Log out
        </button>
      </div>
      {noticeEl}

      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        <nav className="flex md:flex-col flex-wrap gap-1">
          {SECTIONS.map((s) => {
            const count = docs.filter((d) => d.status && dirOf(d.path) === s.dir).length;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSectionId(s.id);
                  setOpenPath(null);
                }}
                className={`text-left rounded-lg px-3 py-2 text-sm ${
                  s.id === sectionId ? 'bg-[var(--surface-hover)] font-semibold' : 'hover:bg-[var(--surface-hover)]'
                }`}
              >
                {s.label}
                {count > 0 && <span className="ml-2 text-[var(--color-primary)]">•</span>}
              </button>
            );
          })}
        </nav>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-heading text-2xl font-bold mr-auto">{section.label}</h2>
            {!section.single && (
              <button className={buttonClass} onClick={() => addDoc(section)}>
                + Add
              </button>
            )}
          </div>
          {section.hint && <p className="text-sm text-[var(--muted)] mb-4">{section.hint}</p>}

          {section.single ? (
            single ? (
              <DocForm section={section} doc={single} onChange={(p) => updateDoc(single.path, p)} ctx={ctx} />
            ) : (
              <button className={buttonClass} onClick={() => addDoc(section)}>
                Create settings
              </button>
            )
          ) : items.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">Nothing here yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {items.map((doc) => {
                const isOpen = openPath === doc.path;
                const deleted = doc.status === 'deleted';
                return (
                  <li key={doc.path} className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`mr-auto min-w-0 ${deleted ? 'line-through opacity-50' : ''}`}>
                        <div className="font-medium truncate">{String(doc.data[section.titleKey] || '(untitled)')}</div>
                        {section.subtitle && <div className="text-sm text-[var(--muted)] truncate">{section.subtitle(doc.data)}</div>}
                      </div>
                      {doc.status && (
                        <span className="text-xs uppercase tracking-wide text-[var(--color-primary)]">
                          {doc.status === 'changed' ? 'edited' : doc.status}
                        </span>
                      )}
                      {deleted ? (
                        <button className={buttonClass} onClick={() => updateDoc(doc.path, {})}>
                          Undo
                        </button>
                      ) : (
                        <>
                          <button className={buttonClass} onClick={() => setOpenPath(isOpen ? null : doc.path)}>
                            {isOpen ? 'Done' : 'Edit'}
                          </button>
                          <button
                            className={buttonClass}
                            onClick={() => confirm(`Delete "${String(doc.data[section.titleKey] || 'this entry')}"?`) && removeDoc(doc)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                    {isOpen && !deleted && (
                      <div className="mt-4 pl-4 border-l-2 border-[var(--border)]">
                        <DocForm section={section} doc={doc} onChange={(p) => updateDoc(doc.path, p)} ctx={ctx} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
