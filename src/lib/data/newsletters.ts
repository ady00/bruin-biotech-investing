import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Newsletter {
  title: string;
  date: string; // YYYY-MM
  pdfUrl: string;
}

const newslettersDirectory = path.join(process.cwd(), 'content/newsletters');

export function getNewsletters(): Newsletter[] {
  if (!fs.existsSync(newslettersDirectory)) {
    return [];
  }

  const newsletters = fs
    .readdirSync(newslettersDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fileContents = fs.readFileSync(path.join(newslettersDirectory, fileName), 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title || '',
        date: String(data.date || ''),
        pdfUrl: data.pdfUrl || '',
      };
    });

  // Most recent first
  return newsletters.sort((a, b) => b.date.localeCompare(a.date));
}
