'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import sections for better performance
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Terminal = dynamic(() => import('@/components/sections/Terminal'), { ssr: false });
const GitHubWrapped = dynamic(() => import('@/components/sections/GitHub'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const SpaceScene = dynamic(() => import('@/components/three/SpaceScene'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* 3D Global Background */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-deep-space pointer-events-none" />}>
        <div className="fixed inset-0 z-0 bg-deep-space pointer-events-none overflow-hidden">
          <SpaceScene />
        </div>
      </Suspense>

      {/* Main Single Page Layout */}
      <div className="relative z-10 w-full min-h-screen">
        <Suspense fallback={null}><Hero /></Suspense>
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><Skills /></Suspense>
        <Suspense fallback={null}><Experience /></Suspense>
        <Suspense fallback={null}><Projects /></Suspense>
        <Suspense fallback={null}><GitHubWrapped /></Suspense>
        <Suspense fallback={null}><Terminal /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
      </div>
    </>
  );
}
