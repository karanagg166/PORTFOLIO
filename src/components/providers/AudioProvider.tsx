'use client';

import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '@/store/useAudioStore';

export default function AudioProvider() {
  const { isPlaying, volume, setPlaying } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, setPlaying]);

  return (
    <audio 
      ref={audioRef}
      src="/ambient-space.mp3" 
      loop 
      preload="auto"
    />
  );
}
