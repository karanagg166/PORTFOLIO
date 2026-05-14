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
  const [hasAutoTyped, setHasAutoTyped] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const increaseKonami = useEasterEggStore((s) => s.increaseKonamiScore);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Auto-type welcome on first view
  useEffect(() => {
    if (hasAutoTyped) return;
    const timeout = setTimeout(() => {
      const welcomeOutput = typeof COMMANDS.welcome === 'function' ? COMMANDS.welcome() : COMMANDS.welcome;
      setHistory([{ command: '', output: welcomeOutput, isSystem: true }]);
      setHasAutoTyped(true);
    }, 600);
    return () => clearTimeout(timeout);
  }, [hasAutoTyped]);

  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      // Burst from multiple origins
      const fire = (x: number, y: number) => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x, y },
          colors: ['#06b6d4', '#7c3aed', '#ffffff', '#22d3ee', '#a855f7'],
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });
      };
      fire(0.3, 0.5);
      setTimeout(() => fire(0.7, 0.5), 150);
      setTimeout(() => fire(0.5, 0.3), 300);
    } catch (e) {
      // confetti not available, fail silently
    }
  }, []);

  const processCommand = useCallback((cmd: string) => {
    if (!cmd) return;

    // Add to command history for up/down
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
          <span className="text-green-400 font-bold animate-pulse">
            🎉 You want to hire me? Let&apos;s gooo! Check the contact section below! 🚀
          </span>
        );
        fireConfetti();
        increaseKonami();
      } else {
        output = lookup;
      }
    } else if (cmd.startsWith('echo ')) {
      output = cmd.slice(5);
    } else {
      output = (
        <span className="text-red-400">
          bash: command not found: {cmd}
          {'\n'}
          <span className="text-white/40">Type &apos;help&apos; for available commands.</span>
        </span>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }, [fireConfetti, increaseKonami]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    processCommand(cmd);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion
      const partial = input.trim().toLowerCase();
      if (partial) {
        const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(partial) && c !== 'welcome');
        if (matches.length === 1) {
          setInput(matches[0]);
        }
      }
    }
  };

  return (
    <section className="relative py-20 px-4 min-h-[50vh] flex flex-col items-center justify-center font-mono" id="terminal">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-3">Interactive Terminal</h2>
        <p className="text-white/40 font-mono text-sm">Try typing commands below — it&apos;s a real shell experience</p>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-4xl glass-holo overflow-hidden bg-black/80 flex flex-col h-[60vh] max-h-[600px] shadow-[0_0_60px_rgba(6,182,212,0.1)] border border-white/10"
        onClick={() => inputRef.current?.focus()}
        style={{ borderRadius: '12px' }}
      >
        {/* macOS Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 flex-shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
          </div>
          <div className="text-xs text-white/50">guest@karan-dev: ~</div>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div className="p-4 flex-1 overflow-y-auto text-sm sm:text-base text-white/80 space-y-3">
          {history.map((entry, i) => (
            <div key={i} className="space-y-1">
              {!entry.isSystem && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-green-400">guest@karan-dev</span>
                  <span className="text-white/50">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-white/50">$</span>
                  <span className="text-white font-bold ml-1">{entry.command}</span>
                </div>
              )}
              <div className="text-white/70 whitespace-pre-wrap ml-0 leading-relaxed">
                {entry.output}
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <span className="text-green-400 flex-shrink-0">guest@karan-dev</span>
            <span className="text-white/50 flex-shrink-0">:</span>
            <span className="text-cyan-400 flex-shrink-0">~</span>
            <span className="text-white/50 flex-shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white font-bold ml-1 caret-cyan-400"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
