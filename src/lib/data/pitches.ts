import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface StockPitch {
  id: string;
  company: string;
  ticker: string;
  thesis: 'Long' | 'Short';
  date: string;
  author: string;
  summary: string;
  pdfUrl: string;
}

const pitchesDirectory = path.join(process.cwd(), 'content/pitches');

export function getAllPitches(): StockPitch[] {
  // Check if directory exists
  if (!fs.existsSync(pitchesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(pitchesDirectory);
  const pitches = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName, index) => {
      const fullPath = path.join(pitchesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id: String(index + 1),
        company: data.company || '',
        ticker: data.ticker || '',
        thesis: data.thesis as 'Long' | 'Short',
        date: data.date || '',
        author: data.author || '',
        summary: content.trim(),
        pdfUrl: data.pdfUrl || '',
      };
    });

  // Sort by date (most recent first)
  return pitches.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
