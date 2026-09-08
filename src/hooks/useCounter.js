import { useEffect, useRef, useState } from 'react';

/**
 * Contador animado que arranca cuando la cifra entra en pantalla.
 * Usa IntersectionObserver + requestAnimationFrame, sin librería extra.
 */
export function useCounter(target, { duration = 1800, start = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(start);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return undefined;
    }

    let frame;
    let startedAt;

    const step = (timestamp) => {
      if (startedAt === undefined) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      // easeOutExpo: arranca rápido y frena al llegar a la cifra.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, start]);

  return { ref, value };
}
