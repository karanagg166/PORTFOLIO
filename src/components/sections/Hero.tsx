import React from 'react';
import HeroContent from './HeroContent';
import HeroAnimations from './HeroAnimations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <HeroAnimations>
        <HeroContent />
      </HeroAnimations>
    </section>
  );
}
