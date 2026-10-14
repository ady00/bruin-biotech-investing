import type { Metadata } from 'next';
import { getAllPitches } from '@/lib/data/pitches';
import { PitchesSection } from '@/components/our-work/PitchesSection';

export const metadata: Metadata = {
  title: 'Investment Portfolio | Bruin Biotech Investing',
};

export default function PitchesPage() {
  return (
    <main className="pt-24 pb-16">
      <PitchesSection pitches={getAllPitches()} />
    </main>
  );
}
