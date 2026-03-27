import { getRecruitmentConfig, getRecruitmentEvents, getFAQs } from '@/lib/data/recruitment';
import { HeroSection } from '@/components/recruitment/HeroSection';
import { TimelineSection } from '@/components/recruitment/TimelineSection';
import { WhatToExpectSection } from '@/components/recruitment/WhatToExpectSection';
import { FAQSection } from '@/components/recruitment/FAQSection';
import { ContactSection } from '@/components/recruitment/ContactSection';

export default function RecruitmentPage() {
  const config = getRecruitmentConfig();
  const events = getRecruitmentEvents();
  const faqs = getFAQs();

  return (
    <main className="pt-24 pb-16">
      <HeroSection config={config} />
      <TimelineSection events={events} />
      <WhatToExpectSection />
      <FAQSection faqs={faqs} />
      <ContactSection />
    </main>
  );
}
