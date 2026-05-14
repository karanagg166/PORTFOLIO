'use client';

import React, { useEffect, useState } from 'react';
import { isWebGLSupported } from '@/lib/webgl';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ThreeGuard({ children, fallback }: Props) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLSupported());
  }, []);

  if (supported === null) return null; // Avoid hydration mismatch
  
  if (!supported) {
    return (
      <>{fallback || <div className="absolute inset-0 z-0 bg-deep-space"></div>}</>
    );
  }

  return <>{children}</>;
}
