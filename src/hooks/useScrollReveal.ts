import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(options = { threshold: 0.1, y: 50, duration: 0.8 }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial state
    el.style.opacity = '0';
    el.style.transform = `translateY(${options.y}px)`;
    el.style.transition = `opacity ${options.duration}s cubic-bezier(0.215, 0.61, 0.355, 1), transform ${options.duration}s cubic-bezier(0.215, 0.61, 0.355, 1)`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animation
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
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
