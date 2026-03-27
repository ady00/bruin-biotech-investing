import { Hero } from '@/components/home/Hero';
import { WhoWeAre, WhyWeExist, WhoWereLookingFor } from '@/components/home/ContentSections';

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyWeExist />
      <WhoWereLookingFor />
    </>
  );
}
