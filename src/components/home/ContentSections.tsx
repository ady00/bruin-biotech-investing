'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Target, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Who We Are
            </h2>
          </motion.div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-left"
            >
              <h3 className="font-heading font-semibold text-xl mb-4 gradient-text">
                Our Focus
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                We are <span className="text-[var(--foreground)] font-medium">Bruin Biotech Investing</span>, a student-led organization at UCLA focused on the intersection of biotechnology, healthcare, and long/short investing. Our members are passionate about understanding how scientific innovation translates into investment opportunities, with a focus on therapeutics and biotechnology.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-left"
            >
              <h3 className="font-heading font-semibold text-xl mb-4 gradient-text">
                Our Mission
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                Through stock pitches, investment research, and industry focused discussions, we train students for careers in investment banking and public markets investing within the life sciences sector. We aim to bridge the gap between science and capital by developing both technical investing skills and a deep understanding of biotech.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhyWeExist() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Why We Exist
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Decorative gradient line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full hidden md:block" />

              <div className="space-y-8 md:pl-8 text-left">
                <motion.div variants={itemVariants}>
                  <h3 className="font-heading font-semibold text-xl mb-3">The Gap</h3>
                  <p className="text-[var(--muted)] leading-relaxed text-lg">
                    UCLA has a strong track record of placing students into Wall Street and medical school, but there is a clear gap at the intersection of healthcare, biology, and investing. Many students with scientific backgrounds are not aware of careers in biotech investing or healthcare investment banking, while many students interested in finance do not realize they can specialize in healthcare.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="font-heading font-semibold text-xl mb-3">Our Solution</h3>
                  <p className="text-[var(--muted)] leading-relaxed text-lg">
                    We exist to close that gap by building a community of like-minded students, providing exposure to the industry, and demystifying the recruiting process. Our goal is to equip members with the knowledge and network needed to break into investment banking and public markets investing within healthcare.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhoWereLookingFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Who We&apos;re Looking For
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Students of all grade levels with a genuine passion for the biotech industry and its intersection with finance.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/recruitment"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-105 shadow-lg shadow-[var(--color-primary)]/20"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
