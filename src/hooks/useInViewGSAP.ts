import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export function useInViewGSAP<T extends HTMLElement>(options = { threshold: 0.1, y: 50, duration: 0.8 }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: options.y, opacity: 0 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(el, { y: 0, opacity: 1, duration: options.duration, ease: "power3.out" });
          observer.unobserve(el);
        }
      });
    }, { threshold: options.threshold });

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.threshold, options.y, options.duration]);

  return ref;
}
