'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
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
            Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-[var(--muted)]">
            Meet the passionate students driving Bruin Biotech Investing. Our members come from diverse backgrounds united by a shared interest in healthcare and finance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
