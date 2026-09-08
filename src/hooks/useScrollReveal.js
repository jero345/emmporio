import { useEffect, useRef, useState } from 'react';

/**
 * Marca un elemento como visible la primera vez que entra en el viewport.
 * Se usa para las animaciones de entrada sin depender de framer-motion en
 * los casos simples (una clase basta y evita montar un componente extra).
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Sin IntersectionObserver (o con motion reducido) se muestra directo.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
