'use client';

import dynamic from 'next/dynamic';

const SpaceScene = dynamic(() => import('./SpaceScene'), { ssr: false });

export default function SpaceSceneWrapper() {
  return <SpaceScene />;
}
