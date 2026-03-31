'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { RecruitmentEvent } from '@/lib/data/recruitment';

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

export function TimelineSection({ events }: { events: RecruitmentEvent[] }) {
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
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Recruitment Timeline
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Our recruitment process consists of several stages designed to help us get to know you.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)]" />

              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Circle */}
                  <div className="absolute left-5 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] border-4 border-[var(--surface)]" />

                  {/* Content */}
                  <div className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <h3 className="font-heading font-bold text-xl">
                        {event.name}
                      </h3>
                      <span className="text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                    </div>

                    <p className="text-[var(--muted)] mb-4">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && event.location !== 'N/A' && event.location !== 'TBA' && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
