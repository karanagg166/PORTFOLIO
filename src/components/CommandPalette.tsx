'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SOCIAL_LINKS, PROJECTS } from '@/lib/constants';

type Command = {
  id: string;
  name: string;
  group: string;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: Command[] = [
    { id: 'nav-home', name: 'Go to Home', group: 'Navigation', action: () => router.push('/') },
    { id: 'nav-uses', name: 'Go to /uses', group: 'Navigation', action: () => router.push('/uses') },
    { id: 'social-github', name: 'GitHub', group: 'Social', action: () => window.open(SOCIAL_LINKS.github, '_blank') },
    { id: 'social-linkedin', name: 'LinkedIn', group: 'Social', action: () => window.open(SOCIAL_LINKS.linkedin, '_blank') },
    { id: 'social-twitter', name: 'Twitter / X', group: 'Social', action: () => window.open(SOCIAL_LINKS.twitter, '_blank') },
    { id: 'social-email', name: 'Email Me', group: 'Social', action: () => window.open(`mailto:${SOCIAL_LINKS.email}`, '_blank') },
    ...PROJECTS.map((p) => ({
      id: `proj-${p.name}`,
      name: `Project: ${p.name}`,
      group: 'Projects',
      action: () => {
        if (p.live) window.open(p.live, '_blank');
        else if (p.github) window.open(p.github, '_blank');
      }
    }))
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Search trigger button for mobile/discoverability */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:bg-cyan-500/20 transition-all backdrop-blur-md"
        aria-label="Search commands"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Header/Input */}
              <div className="flex items-center px-4 border-b border-white/10 bg-white/5">
                <svg className="w-5 h-5 text-white/40 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none text-white focus:outline-none py-4 font-mono text-sm placeholder:text-white/30"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/40 rounded text-xs font-mono"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="overflow-y-auto p-2 flex-1 scrollbar-hide">
                {filteredCommands.length === 0 ? (
                  <div className="py-14 text-center text-white/40 font-mono text-sm">
                    No results found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, idx) => (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between font-mono text-sm transition-colors ${
                          idx === selectedIndex
                            ? 'bg-cyan-500/15 text-cyan-300'
                            : 'text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <span>{cmd.name}</span>
                        <span className="text-xs opacity-50 px-2 py-0.5 border border-current rounded">{cmd.group}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 border-t border-white/10 bg-white/5 text-xs text-white/40 flex items-center justify-between font-mono">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 rounded">↑</kbd> <kbd className="bg-white/10 px-1.5 rounded">↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 rounded">↵</kbd> select</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
