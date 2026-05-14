'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-deep-space flex flex-col items-center justify-center font-mono"
        >
          {/* Central Pulsating Star */}
          <div className="relative mb-12">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-cyan-500 blur-2xl opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
            </div>
          </div>

          <div className="w-64 space-y-4">
            <div className="flex justify-between text-xs text-cyan-500/70 mb-1">
              <span>BOOTING_SEQUENCE</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-600 to-purple-600"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-[10px] text-white/30 text-center uppercase tracking-[0.2em]">
              Establishing neural link...
            </div>
          </div>

          {/* Background CSS Stars */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
             {[...Array(20)].map((_, i) => (
               <div 
                 key={i}
                 className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 2}s`
                 }}
               />
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
