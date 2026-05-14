'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/constants';

const navLinks = [
  { href: '#hero', label: 'Terminal' },
  { href: '#about', label: 'VSCode' },
  { href: '#skills', label: 'htop' },
  { href: '#experience', label: 'git_log' },
  { href: '#projects', label: 'Blocks' },
  { href: '#github', label: 'Wrapped' },
  { href: '#terminal', label: 'CLI' },
  { href: '#contact', label: 'API' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section scroll-spy
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-2.5 shadow-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center font-mono text-sm">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="text-white font-bold tracking-wider hover:text-cyan-400 transition-colors text-base"
          >
            KARAN<span className="text-cyan-500">_</span>DEV
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-1.5 rounded-sm text-xs transition-all duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-white/50 hover:text-white/80 border border-transparent hover:border-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-all"
            >
              ⌘ GitHub
            </a>

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-sm text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs shadow-[0_0_10px_rgba(6,182,212,0.1)]"
            >
              Connect()
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-white/5 rounded transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white/70"
              />
              <motion.div
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-white/70"
              />
              <motion.div
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white/70"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#030712]/95 border-l border-white/10 flex flex-col pt-20 px-6"
            >
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-md font-mono text-sm transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    <span className="text-white/20 mr-2">/</span>
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto pb-8 space-y-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-2.5 text-xs text-white/50 border border-white/10 rounded-md hover:text-white hover:border-white/20 transition-all"
                >
                  GitHub ↗
                </a>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-cyan-400 text-xs font-bold"
                >
                  Connect()
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
