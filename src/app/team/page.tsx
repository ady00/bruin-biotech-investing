import {
  getExecutiveBoard,
  getBoardMembers,
  getMembers,
  getPlacements,
} from '@/lib/data/team';
import { HeroSection } from '@/components/team/HeroSection';
import { TeamSection } from '@/components/team/TeamSection';
import { PlacementsSection } from '@/components/team/PlacementsSection';

export default function TeamPage() {
  const executives = getExecutiveBoard();
  const boardMembers = getBoardMembers();
  const members = getMembers();
  const placements = getPlacements();

  return (
    <main className="pt-24 pb-16">
      <HeroSection />
      <TeamSection title="Executive Board" members={executives} surface />
      <TeamSection title="Members" members={members} />
      <TeamSection title="Board Members" members={boardMembers} surface />
      <PlacementsSection placements={placements} />
    </main>
  );
}
