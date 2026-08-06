'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/constants';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Floating Pill Navbar (appears after scroll) */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 shadow-2xl bg-[#05080f]/90 backdrop-blur-md"
          >
            <button
              onClick={() => handleNavClick('#hero')}
              className="px-3 py-1.5 text-amber-400 font-bold tracking-wider text-xs hover:text-amber-300 transition-colors font-mono"
            >
              KARAN // DEEP SPACE
            </button>

            <div className="w-px h-4 bg-white/10 mx-1" />

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-200 ${
                    isActive ? 'text-amber-300' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="pill-indicator"
                      className="absolute inset-0 rounded-full bg-amber-500/10 border border-amber-500/30"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10 uppercase">{link.label}</span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'lg:opacity-0 lg:pointer-events-none bg-[#05080f]/80 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center font-mono text-xs">
          <button
            onClick={() => handleNavClick('#hero')}
            className="text-white font-bold tracking-wider hover:text-amber-400 transition-colors text-sm uppercase"
          >
            KARAN // OBSERVATORY
          </button>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-1.5 rounded text-xs transition-all uppercase ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded transition-all"
            >
              GitHub ↗
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md flex justify-end"
          >
            <div className="w-64 bg-[#05080f] h-full border-l border-white/10 p-6 flex flex-col justify-between font-mono">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-xs text-amber-400 font-bold uppercase">// STATION NAV</span>
                  <button onClick={() => setMobileOpen(false)} className="text-white/50 text-sm">✕</button>
                </div>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-3 py-2 rounded text-xs text-white/70 hover:text-amber-300 hover:bg-white/5 uppercase"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-2 text-xs text-white/50 border border-white/10 rounded hover:text-white"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
