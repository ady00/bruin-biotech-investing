'use client';

import { motion } from 'framer-motion';

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:bruinbiotechinvesting@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--surface-hover)] transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
