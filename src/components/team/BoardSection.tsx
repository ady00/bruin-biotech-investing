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
  return (
    <motion.div variants={itemVariants} className="group text-center">
      <div className="relative mb-4 w-32 h-32 mx-auto">
        {/* Image with gradient border on hover */}
        <div className="relative w-32 h-32 rounded-full p-[3px] bg-transparent group-hover:bg-gradient-to-br group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all">
          <div className="w-full h-full rounded-full overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-transparent transition-colors">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
      <p className="text-[var(--color-primary)] text-sm font-medium">
        {member.position}
      </p>
      <p className="text-[var(--muted)] text-sm">Class of {member.year}</p>
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
