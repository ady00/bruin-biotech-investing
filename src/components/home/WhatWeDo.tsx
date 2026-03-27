'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PresentationIcon, Search, MessageSquare } from 'lucide-react';

const pillars = [
  {
    icon: PresentationIcon,
    title: 'Stock Pitches',
    description:
      'Members present live stock pitches on healthcare companies, defending their investment thesis with detailed analysis of clinical data, competitive positioning, and valuation.',
    highlights: ['Live 10-minute pitches', 'Q&A sessions', 'Peer feedback'],
  },
  {
    icon: Search,
    title: 'Investment Research',
    description:
      'Deep-dive research into biotech companies covering therapeutics, medical devices, diagnostics, and digital health. We analyze scientific merit, market opportunity, and financial metrics.',
    highlights: ['Sector coverage', 'Clinical trial analysis', 'Financial modeling'],
  },
  {
    icon: MessageSquare,
    title: 'Industry Discussions',
    description:
      'Regular discussions on healthcare trends, regulatory developments, and market dynamics. Guest speakers from industry share insights on career paths and market perspectives.',
    highlights: ['Guest speakers', 'Market updates', 'Career insights'],
  },
];

export function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 rounded-full mb-4">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Three Pillars of{' '}
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
            Our program combines rigorous analysis, hands-on learning, and
            industry connections to prepare members for careers in healthcare
            investing.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-primary)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-primary)]/5 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--muted)] mb-6">{pillar.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {pillar.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center text-sm text-[var(--muted)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gradient line at bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
