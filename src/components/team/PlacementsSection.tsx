'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Placement } from '@/lib/data/team';

export function PlacementsSection({
  placements,
}: {
  placements: Record<string, Placement[]>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const availableYears = Object.keys(placements).sort();
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || '2026');

  return (
    <section className="py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Placements
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto mb-8">
              Our members have gone on to top firms in healthcare investment
              banking and public markets investing.
            </p>

            {/* Year Toggle */}
            {availableYears.length > 0 && (
              <div className="inline-flex items-center gap-1 p-1 bg-[var(--surface)] rounded-full border border-[var(--border)]">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedYear === year
                        ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Placements Table */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-[var(--background)] border-b border-[var(--border)] text-sm font-medium text-[var(--muted)]">
                <div>Name</div>
                <div>Company</div>
                <div>Type</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[var(--border)]">
                {placements[selectedYear]?.map((placement) => (
                  <motion.div
                    key={placement.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 gap-4 px-6 py-4 text-sm hover:bg-[var(--background)] transition-colors"
                  >
                    <div className="font-medium">{placement.name}</div>
                    <div className="text-[var(--muted)]">{placement.company}</div>
                    <div>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          placement.type === 'Full-time'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}
                      >
                        {placement.type}
                      </span>
                    </div>
                  </motion.div>
                )) || (
                  <div className="px-6 py-8 text-center text-[var(--muted)]">
                    No placements data available for {selectedYear}.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
