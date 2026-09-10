import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon.jsx';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Modal accesible: cierra con Escape y con clic en el fondo, bloquea el
 * scroll del documento, atrapa el foco dentro del diálogo y lo devuelve al
 * elemento que lo abrió.
 */
export function Modal({ open, onClose, title, children, size = 'md' }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  // `onClose` casi siempre llega como arrow inline, asi que cambia de
  // identidad en cada render del padre. Guardarlo en un ref mantiene estable
  // `handleKeyDown` y evita que el efecto se reinicie y mueva el foco solo.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    []
  );

  useEffect(() => {
    if (!open) return undefined;

    openerRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    // Espera al montaje del diálogo para mover el foco dentro.
    const timer = window.setTimeout(() => {
      dialogRef.current?.querySelector(FOCUSABLE)?.focus();
    }, 40);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
      openerRef.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  const widths = { sm: 'max-w-lg', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-base/85 p-4 backdrop-blur-sm md:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            /*
             * `max-h` + `flex-col`: el diálogo nunca pasa del alto de la
             * pantalla y es el contenido el que se desplaza. Sin esto, una
             * ficha larga se cortaba por abajo sin dejar forma de leerla,
             * porque el contenedor recortaba lo que sobraba.
             */
            className={`relative flex max-h-[92dvh] w-full flex-col ${widths[size] || widths.md} overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-base/70 text-text transition-colors hover:border-gold hover:text-goldSoft"
            >
              <Icon name="X" size={18} />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
