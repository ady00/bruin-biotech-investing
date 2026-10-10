import { HeroSection } from '@/components/our-work/HeroSection';
import { ComingSoonSection } from '@/components/our-work/ComingSoonSection';
import { getNewsletters } from '@/lib/data/newsletters';

export default function OurWorkPage() {
  return (
    <main className="pt-24 pb-16">
      <HeroSection />
      <ComingSoonSection newsletters={getNewsletters()} />
    </main>
  );
}
