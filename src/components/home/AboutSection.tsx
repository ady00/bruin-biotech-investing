'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, TrendingUp, Users, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Focused Mission',
    description:
      'Bridge the gap between science and capital by developing both technical investing skills and deep biotech knowledge.',
  },
  {
    icon: TrendingUp,
    title: 'Real Analysis',
    description:
      'Conduct rigorous investment research on public healthcare companies, analyzing clinical data, competitive landscapes, and market dynamics.',
  },
  {
    icon: Users,
    title: 'Industry Network',
    description:
      'Connect with professionals in healthcare investing, biotech, and life sciences through our events and alumni network.',
  },
  {
    icon: Lightbulb,
    title: 'Career Preparation',
    description:
      'Prepare for careers in investment banking, equity research, and public markets investing within the life sciences sector.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full mb-4">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
              Where{' '}
              <span className="gradient-text">Science Meets Finance</span>
            </h2>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              Bruin Biotech Investing is UCLA&apos;s premier student organization
              focused on healthcare and life sciences investing. Through stock
              pitches, investment research, and industry-focused discussions, we
              train students for careers in investment banking and public markets
              investing.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              Our members gain hands-on experience analyzing biotech companies,
              understanding clinical trial data, evaluating regulatory risks, and
              developing investment theses that bridge scientific understanding
              with financial analysis.
            </p>
          </motion.div>

          {/* Right: Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--color-primary)]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--muted)] text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
