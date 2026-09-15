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
      <TeamSection
        title="Executive Board"
        description="Our leadership team guides the club's direction and ensures members have the best experience."
        members={executives}
        surface
      />
      <TeamSection
        title="Members"
        description="Our members drive research and analysis across the biotech landscape."
        members={members}
      />
      <TeamSection
        title="Board Members"
        description="Our board members support the club's mission and help shape its future."
        members={boardMembers}
        surface
      />
      <PlacementsSection placements={placements} />
    </main>
  );
}
