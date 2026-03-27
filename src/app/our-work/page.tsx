import { getAllPitches } from '@/lib/data/pitches';
import { HeroSection } from '@/components/our-work/HeroSection';
import { PitchesSection } from '@/components/our-work/PitchesSection';
import { ProcessSection } from '@/components/our-work/ProcessSection';

export default function OurWorkPage() {
  const pitches = getAllPitches();

  return (
    <main className="pt-24 pb-16">
      <HeroSection />
      <PitchesSection pitches={pitches} />
      <ProcessSection />
    </main>
  );
}
