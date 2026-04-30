'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { RecruitmentConfig } from '@/lib/data/recruitment';

export function HeroSection({ config }: { config: RecruitmentConfig }) {
  const isOpen = config.status === 'open';

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Join <span className="gradient-text">Bruin Biotech Investing</span>
          </h1>
          <p className="text-xl text-[var(--muted)] mb-8">
            We carefully select students who are passionate about biotech and eager to learn about healthcare investing.
          </p>

          {/* Application Status Banner */}
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
              isOpen
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-[var(--surface)] border border-[var(--border)]'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isOpen ? 'bg-green-500 animate-pulse' : 'bg-[var(--muted)]'
              }`}
            />
            <span className="font-medium">
              {config.quarter} {config.year} Applications{' '}
              {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          <div className="mt-6">
            {isOpen ? (
              <a
                href={config.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Apply Now
                <ExternalLink className="w-5 h-5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-400 text-white font-semibold text-lg cursor-not-allowed">
                Closed
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
