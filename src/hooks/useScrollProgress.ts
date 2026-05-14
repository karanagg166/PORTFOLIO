import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}
