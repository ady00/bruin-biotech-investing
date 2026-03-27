'use client';

import { motion } from 'framer-motion';

export function WhatToExpectSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6 text-center">
            What to Expect
          </h2>

          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8">
            <h3 className="font-heading font-semibold text-xl mb-4">
              Final Round Interview
            </h3>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              During this interview, we will assess your interests in healthcare and knowledge of the biotech industry as a whole. Additionally, candidates will be assigned various stocks to pitch live during their interview for approximately 10 minutes.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Expect follow-up questions related to scientific topics, competition, regulatory risk, clinical trial data, and your investment thesis. We&apos;re looking for clear thinking and genuine curiosity, not perfect answers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
