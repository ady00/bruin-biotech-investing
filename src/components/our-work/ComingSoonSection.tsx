'use client';

import { motion } from 'framer-motion';
import type { Newsletter } from '@/lib/data/newsletters';

export function ComingSoonSection({ newsletters }: { newsletters: Newsletter[] }) {
  const [latest, ...past] = newsletters;
  const sections = [
    {
      id: 'newsletter',
      title: 'Newsletter',
      description: 'Stay updated with our latest insights on biotech and healthcare investing.',
      href: latest?.pdfUrl,
      past,
    },
    {
      id: 'portfolio',
      title: 'Investment Portfolio',
      description: 'Track our investment thesis and portfolio performance.',
      href: undefined,
      past: [],
    },
  ];

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
              {section.href ? (
                <a
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] underline underline-offset-4 text-sm font-medium"
                >
                  Read the Latest Issue
                </a>
              ) : (
                <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              )}
              {section.past.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">
                    Past Issues
                  </p>
                  <ul className="space-y-1">
                    {section.past.map((issue) => (
                      <li key={issue.pdfUrl + issue.date}>
                        <a
                          href={issue.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--muted)] hover:text-[var(--color-primary)] underline underline-offset-4"
                        >
                          {issue.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
