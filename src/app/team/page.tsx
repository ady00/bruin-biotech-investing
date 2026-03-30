import { getBoardMembers } from '@/lib/data/team';
import { HeroSection } from '@/components/team/HeroSection';
import { BoardSection } from '@/components/team/BoardSection';
// import { PlacementsSection } from '@/components/team/PlacementsSection';

export default function TeamPage() {
  const members = getBoardMembers();
  // const placements = getPlacements();

  return (
    <main className="pt-24 pb-16">
      <HeroSection />
      <BoardSection members={members} />
      {/* <PlacementsSection placements={placements} /> */}
    </main>
  );
}
