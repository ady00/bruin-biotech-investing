import { getBoardMembers, getAnalysts, getPlacements } from '@/lib/data/team';
import { HeroSection } from '@/components/team/HeroSection';
import { BoardSection } from '@/components/team/BoardSection';
import { AnalystsSection } from '@/components/team/AnalystsSection';
import { PlacementsSection } from '@/components/team/PlacementsSection';

export default function TeamPage() {
  const members = getBoardMembers();
  const analysts = getAnalysts();
  const placements = getPlacements();

  return (
    <main className="pt-24 pb-16">
      <HeroSection />
      <BoardSection members={members} />
      <AnalystsSection analysts={analysts} />
      <PlacementsSection placements={placements} />
    </main>
  );
}
