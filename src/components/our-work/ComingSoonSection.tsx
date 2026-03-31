'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Stay updated with our latest insights on biotech and healthcare investing.',
  },
  {
    id: 'portfolio',
    title: 'Investment Portfolio',
    description: 'Track our investment thesis and portfolio performance.',
  },
];

export function ComingSoonSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center"
            >
              <h3 className="font-heading text-2xl font-bold mb-3">
                {section.title}
              </h3>
              <p className="text-[var(--muted)] mb-6">
                {section.description}
              </p>
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium">
                Coming Soon
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
