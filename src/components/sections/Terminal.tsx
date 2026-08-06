'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COMMANDS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEasterEggStore } from '@/store/useEasterEggStore';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  isSystem?: boolean;
}

export default function Terminal() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoTyped, setHasAutoTyped] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const increaseKonami = useEasterEggStore((s) => s.increaseKonamiScore);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (!isOpen || hasAutoTyped) return;
    const welcomeOutput = typeof COMMANDS.welcome === 'function' ? COMMANDS.welcome() : COMMANDS.welcome;
    setHistory([{ command: '', output: welcomeOutput, isSystem: true }]);
    setHasAutoTyped(true);
  }, [isOpen, hasAutoTyped]);

  const processCommand = useCallback((cmd: string) => {
    if (!cmd) return;

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;
    const lookup = COMMANDS[cmd];

    if (lookup) {
      if (typeof lookup === 'function') {
        output = lookup();
      } else if (lookup === '__CONFETTI__') {
        output = (
          <span className="text-emerald-400 font-bold">
            🎉 Signal received! Direct contact initiated. Check the contact section below! 🚀
          </span>
        );
        increaseKonami();
      } else {
        output = lookup;
      }
    } else if (cmd.startsWith('echo ')) {
      output = cmd.slice(5);
    } else {
      output = (
        <span className="text-rose-400">
          command not found: {cmd}. Type &apos;help&apos; for commands.
        </span>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }, [increaseKonami]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    processCommand(cmd);
    setInput('');
  };

  return (
    <section className="relative py-12 px-4 flex flex-col items-center justify-center font-mono" id="terminal">
      <div ref={containerRef} className="w-full max-w-4xl flex flex-col items-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-white hover:bg-white/10 hover:border-amber-400/40 transition-all font-mono text-xs tracking-wider flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>OPEN ORBITAL CONSOLE (EASTER EGG)</span>
            <span>$</span>
          </button>
        ) : (
          <div
            className="w-full rounded-xl border border-white/10 bg-[#05080f]/95 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col h-[400px]"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs text-amber-400 tracking-widest font-mono">
                  KARAN-DEV // ORBITAL CONSOLE
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-xs text-white/40 hover:text-white px-2 py-0.5 rounded hover:bg-white/10"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Terminal History */}
            <div className="p-4 flex-1 overflow-y-auto text-xs text-white/80 space-y-2">
              {history.map((entry, i) => (
                <div key={i} className="space-y-1">
                  {!entry.isSystem && (
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <span>operator@orbital-station:~$</span>
                      <span className="text-white font-bold">{entry.command}</span>
                    </div>
                  )}
                  <div className="text-white/70 whitespace-pre-wrap">{entry.output}</div>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center gap-1.5 text-amber-400 pt-1">
                <span>operator@orbital-station:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white font-bold caret-amber-400 text-xs"
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
