import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Al cambiar de ruta el scroll vuelve arriba, salvo si hay ancla (#). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
