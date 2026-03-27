'use client';

import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Idea Generation', desc: 'Identify compelling investment opportunities in healthcare and biotech' },
  { step: '02', title: 'Deep Dive Research', desc: 'Analyze science, competitive landscape, and financial metrics' },
  { step: '03', title: 'Thesis Development', desc: 'Build a clear investment thesis with catalysts and risks' },
  { step: '04', title: 'Pitch & Debate', desc: 'Present to the group and refine through Q&A' },
];

export function ProcessSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Our Research Process
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            We follow a rigorous, systematic approach to investment research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-heading font-bold gradient-text mb-4">
                {item.step}
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--muted)] text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
