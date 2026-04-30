'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import type { TeamMember } from '@/lib/data/team';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function MemberCard({ member }: { member: TeamMember }) {
  // Use top positioning for Sumer Pannu's photo
  const imagePosition = member.name === 'Sumer Pannu' ? 'object-top' : 'object-center';

  return (
    <motion.div variants={itemVariants} className="group text-center">
      <div className="relative mb-4 w-32 h-32 mx-auto">
        {/* Image with gradient border on hover */}
        <div className="relative w-32 h-32 rounded-2xl p-[3px] bg-transparent group-hover:bg-gradient-to-br group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all">
          <div className="w-full h-full rounded-xl overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-transparent transition-colors">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className={`object-cover ${imagePosition} grayscale`}
            />
          </div>
        </div>
      </div>

      <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
      <p className="text-[var(--color-primary)] text-sm font-medium">
        {member.position}
      </p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mt-2 text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
          aria-label={`${member.name}'s LinkedIn profile`}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
    </motion.div>
  );
}

export function BoardSection({ members }: { members: TeamMember[] }) {
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
              Executive Board
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Our leadership team guides the club&apos;s direction and ensures
              members have the best experience.
            </p>
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
