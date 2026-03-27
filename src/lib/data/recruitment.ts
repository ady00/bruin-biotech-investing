import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface RecruitmentEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  order: number;
}

export interface FAQ {
  question: string;
  answer: string;
  order: number;
}

export interface RecruitmentConfig {
  status: 'open' | 'closed';
  quarter: string;
  year: string;
  applicationUrl: string;
}

const recruitmentDirectory = path.join(process.cwd(), 'content/recruitment');

export function getRecruitmentConfig(): RecruitmentConfig {
  const configPath = path.join(recruitmentDirectory, 'config.md');

  if (!fs.existsSync(configPath)) {
    return {
      status: 'closed',
      quarter: 'Fall',
      year: '2025',
      applicationUrl: 'https://forms.google.com',
    };
  }

  const fileContents = fs.readFileSync(configPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    status: (data.status as 'open' | 'closed') || 'closed',
    quarter: data.quarter || 'Fall',
    year: String(data.year) || '2025',
    applicationUrl: data.applicationUrl || 'https://forms.google.com',
  };
}

export function getRecruitmentEvents(): RecruitmentEvent[] {
  const eventsDirectory = path.join(recruitmentDirectory, 'events');

  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory);
  const events = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName, index) => {
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id: String(index + 1),
        name: data.name || '',
        date: data.date || 'TBA',
        time: data.time || 'TBA',
        location: data.location || 'TBA',
        description: content.trim(),
        order: data.order || index + 1,
      };
    });

  return events.sort((a, b) => a.order - b.order);
}

export function getFAQs(): FAQ[] {
  const faqsDirectory = path.join(recruitmentDirectory, 'faqs');

  if (!fs.existsSync(faqsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(faqsDirectory);
  const faqs = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName, index) => {
      const fullPath = path.join(faqsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        question: data.question || '',
        answer: content.trim(),
        order: data.order || index + 1,
      };
    });

  return faqs.sort((a, b) => a.order - b.order);
}
