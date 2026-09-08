import { useRef, useState } from 'react';
import { useDomId } from '../../hooks/useDomId.js';
import { Icon } from './Icon.jsx';

/**
 * Acordeón accesible.
 *
 * - Cada cabecera es un <button> con `aria-expanded` y `aria-controls`.
 * - El panel usa `role="region"` y `aria-labelledby`.
 * - Flechas arriba/abajo, Inicio y Fin mueven el foco entre cabeceras.
 */
export function Accordion({ items, defaultOpen = 0, light = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useDomId('faq');
  const buttonsRef = useRef([]);

  const onKeyDown = (event, index) => {
    const keys = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    buttonsRef.current[next]?.focus();
  };

  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => {
        const isOpen = open === index;
        const headingId = `${baseId}-h-${index}`;
        const panelId = `${baseId}-p-${index}`;

        return (
          <div key={item.id || index}>
            <h3>
              <button
                type="button"
                id={headingId}
                ref={(node) => {
                  buttonsRef.current[index] = node;
                }}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={[
                  'flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg transition-colors',
                  light
                    ? isOpen
                      ? 'text-ink'
                      : 'text-ink/75 hover:text-ink'
                    : isOpen
                      ? 'text-goldSoft'
                      : 'text-text hover:text-goldSoft',
                ].join(' ')}
              >
                <span>{item.question}</span>
                <span
                  className={[
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-180 border-gold bg-gold text-ink'
                      : light
                        ? 'border-ink/20 text-ink/60'
                        : 'border-border text-muted',
                  ].join(' ')}
                >
                  <Icon name="ChevronDown" size={18} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={['pb-6 pr-14 leading-relaxed', light ? 'text-ink/75' : 'text-muted'].join(
                ' '
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
