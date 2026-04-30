import { Hero } from '@/components/home/Hero';
import { WhoWeAre, WhyWeExist, WhoWereLookingFor } from '@/components/home/ContentSections';
import { getRecruitmentConfig } from '@/lib/data/recruitment';

export default function Home() {
  const config = getRecruitmentConfig();
  const isRecruitingOpen = config.status === 'open';

  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyWeExist />
      <WhoWereLookingFor isRecruitingOpen={isRecruitingOpen} />
    </>
  );
}
