import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Terminal from '@/components/sections/Terminal';
import GitHubWrapped from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';

import SpaceSceneWrapper from '@/components/three/SpaceSceneWrapper';

export default function Home() {
  return (
    <>
      {/* 3D Global Background */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-deep-space pointer-events-none" />}>
        <div className="fixed inset-0 z-0 bg-deep-space pointer-events-none overflow-hidden">
          <SpaceSceneWrapper />
        </div>
      </Suspense>

      {/* Main Single Page Layout */}
      <div className="relative z-10 w-full min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubWrapped />
        <Terminal />
        <Contact />
      </div>
    </>
  );
}
