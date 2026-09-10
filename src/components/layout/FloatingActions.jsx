import { useEffect, useState } from 'react';
import { siteConfig, whatsappUrl } from '../../data/siteConfig.js';
import { Icon } from '../ui/Icon.jsx';

/**
 * Botón flotante de WhatsApp (siempre) y de volver arriba (tras 600 px).
 *
 * El de WhatsApp va en el verde de la marca y con su propio logo, no en el
 * dorado del sitio con un icono de chat: es el patrón que la gente reconoce
 * sin leer nada, que es justo lo que se le pide a un botón flotante.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 md:bottom-7 md:right-7">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={[
          'grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-text shadow-lg transition-all duration-300',
          'hover:border-gold hover:text-goldSoft',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        ].join(' ')}
      >
        <Icon name="ArrowUp" size={20} />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Escribir a ${siteConfig.name} por WhatsApp`}
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-200 hover:scale-105"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]"
        />
        <Icon name="WhatsApp" size={38} className="relative" />
      </a>
    </div>
  );
}

export default FloatingActions;
