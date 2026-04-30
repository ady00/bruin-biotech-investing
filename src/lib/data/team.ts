import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  year?: string;
  image: string;
  linkedin?: string;
  order: number;
}

export interface Placement {
  id: string;
  name: string;
  company: string;
  type: 'Internship' | 'Full-time';
  year: string;
}

const teamDirectory = path.join(process.cwd(), 'content/team');

function loadTeamMembers(directory: string): TeamMember[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const members = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName, index) => {
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: String(index + 1),
        name: data.name || '',
        position: data.position || '',
        year: data.year ? String(data.year) : undefined,
        image: data.image || '/team/placeholder.svg',
        linkedin: data.linkedin || undefined,
        order: data.order || index + 1,
      };
    });

  return members.sort((a, b) => a.order - b.order);
}

export function getBoardMembers(): TeamMember[] {
  const membersDirectory = path.join(teamDirectory, 'members');
  return loadTeamMembers(membersDirectory);
}

export function getAnalysts(): TeamMember[] {
  const analystsDirectory = path.join(teamDirectory, 'analysts');
  return loadTeamMembers(analystsDirectory);
}

export function getPlacements(): Record<string, Placement[]> {
  const placementsDirectory = path.join(teamDirectory, 'placements');

  if (!fs.existsSync(placementsDirectory)) {
    return {};
  }

  const fileNames = fs.readdirSync(placementsDirectory);
  const placementsByYear: Record<string, Placement[]> = {};

  fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .forEach((fileName) => {
      const fullPath = path.join(placementsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      const year = String(data.year);
      const placements = (data.placements || []).map(
        (p: { name: string; company: string; type: string }, index: number) => ({
          id: String(index + 1),
          name: p.name || '',
          company: p.company || '',
          type: (p.type as 'Internship' | 'Full-time') || 'Internship',
          year,
        })
      );

      placementsByYear[year] = placements;
    });

  return placementsByYear;
}
