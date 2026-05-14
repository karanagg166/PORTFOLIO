'use client';

import React from 'react';
import { useAudioStore } from '@/store/useAudioStore';

export default function AudioToggle() {
  const { isPlaying, togglePlaying } = useAudioStore();

  return (
    <button 
      onClick={togglePlaying}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
      aria-label={isPlaying ? 'Mute' : 'Play ambient sound'}
    >
      <div className="flex items-center gap-1 h-4">
        <div className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-full animate-bounce' : 'h-1'}`} />
        <div className={`w-1 bg-purple-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-3/4 animate-bounce' : 'h-1'}`} style={{ animationDelay: '0.1s' }} />
        <div className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-full animate-bounce' : 'h-1'}`} style={{ animationDelay: '0.2s' }} />
      </div>
    </button>
  );
}
