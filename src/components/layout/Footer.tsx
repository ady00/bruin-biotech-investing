'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

// Custom SVG icons for social media
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const footerLinks: { ourWork: FooterLink[]; club: FooterLink[] } = {
  ourWork: [
    { href: '/our-work#newsletter', label: 'Newsletter' },
    { href: '/our-work#portfolio', label: 'Investment Portfolio' },
  ],
  club: [
    { href: '/team', label: 'Our Team' },
    { href: '/recruitment', label: 'Recruitment' },
  ],
};

const socialLinks = [
  { href: 'https://www.linkedin.com/company/bruinbiotechinvesting/', icon: LinkedInIcon, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/bruinbiotechinvesting', icon: InstagramIcon, label: 'Instagram' },
  { href: 'mailto:bruinbiotechinvesting@gmail.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const renderLink = (link: FooterLink) => {
    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm transition-colors"
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link
        href={link.href}
        className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm transition-colors"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/BBI_logo.jpg"
                  alt="BBI Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-heading font-bold text-lg">
                Bruin Biotech Investing
              </span>
            </div>
            <p className="text-[var(--muted)] text-sm max-w-md mb-6">
              Bridging science and capital at UCLA. Training the next generation
              of life sciences investors through rigorous research and hands-on
              experience.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Our Work
            </h3>
            <ul className="space-y-2">
              {footerLinks.ourWork.map((link) => (
                <li key={link.href}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Club
            </h3>
            <ul className="space-y-2">
              {footerLinks.club.map((link) => (
                <li key={link.href}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[var(--muted)] text-sm">
            &copy; {new Date().getFullYear()} Bruin Biotech Investing.
            {/* Built by <a href="https://www.linkedin.com/in/advay-bajpai/" target="_blank" rel="noopener noreferrer" className='underline'>Advay Bajpai</a>. */}
          </p>
          <p className="text-[var(--muted)] text-sm">
            A student organization at UCLA
          </p>
        </div>
      </div>
    </footer>
  );
}
