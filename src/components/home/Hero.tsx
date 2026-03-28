'use client';

import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Dynamically import DNAHelix to avoid SSR issues with Three.js
const DNAHelix = dynamic(
  () => import('./DNAHelix').then((mod) => mod.DNAHelix),
  {
    ssr: false,
    loading: () => null,
  }
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* DNA Helix - Full height with fade overlay */}
      <div className="absolute right-0 top-20 bottom-0 w-full md:w-1/2 lg:w-2/5">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent z-10 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
        {/* Left fade - wider on mobile for smooth blend with content */}
        <div className="absolute top-0 bottom-0 left-0 w-1/2 md:w-32 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
        {/* Right fade on mobile */}
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-0 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        {/* Mobile overlay to reduce intensity */}
        <div className="absolute inset-0 bg-[var(--background)]/30 md:bg-transparent z-[5] pointer-events-none" />
        <DNAHelix />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">Bruin Biotech</span>
              <br />
              <span>Investing</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-(--muted) max-w-xl mb-10"
            >
              Bridging science and capital. Training students for careers in
              IB and public markets investing within the life sciences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/recruitment"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-105 shadow-lg shadow-[var(--color-primary)]/20"
              >
                Join Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold text-lg hover:bg-[var(--surface-hover)] transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
