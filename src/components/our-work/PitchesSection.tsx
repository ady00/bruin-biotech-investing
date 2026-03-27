'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Download, TrendingUp, TrendingDown } from 'lucide-react';
import type { StockPitch } from '@/lib/data/pitches';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PitchesSection({ pitches }: { pitches: StockPitch[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] mb-4">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Stock Pitches
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Our members present detailed investment theses on healthcare companies, analyzing fundamentals, competitive positioning, and catalysts.
            </p>
          </motion.div>

          {/* Pitches Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitches.map((pitch) => (
              <motion.div
                key={pitch.id}
                variants={itemVariants}
                className="group bg-[var(--background)] rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--color-primary)]/30 transition-all hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-[var(--border)]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-lg">
                        {pitch.company}
                      </h3>
                      <p className="text-[var(--muted)] text-sm">
                        {pitch.ticker}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        pitch.thesis === 'Long'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {pitch.thesis === 'Long' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {pitch.thesis}
                    </span>
                  </div>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {pitch.summary}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="p-4 flex items-center justify-between bg-[var(--surface)]/50">
                  <div className="text-sm text-[var(--muted)]">
                    <span>{pitch.date}</span>
                    <span className="mx-2">·</span>
                    <span>{pitch.author}</span>
                  </div>
                  <a
                    href={pitch.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium hover:bg-[var(--color-primary)]/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {pitches.length === 0 && (
            <div className="text-center py-12 text-[var(--muted)]">
              No stock pitches available yet. Check back soon!
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
