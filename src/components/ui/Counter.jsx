import { useState } from 'react';
import { useCounter } from '../../hooks/useCounter.js';

/**
 * Cifra de la firma representada con una barra.
 *
 * La barra se llena en la proporción `value / max` cuando entra en pantalla,
 * movida por el mismo contador que antes animaba el número; `useCounter` ya
 * respeta `prefers-reduced-motion` y en ese caso la pinta llena de una vez.
 *
 * Con `won` la barra se parte en dos tramos —lo atendido y, dentro, lo
 * ganado— y se vuelve interactiva: al pasar el mouse, al enfocarla con el
 * teclado o al tocarla en móvil muestra las cifras exactas.
 *
 * La cifra no se imprime en pantalla, pero viaja en el texto accesible: una
 * barra sin número no comunica nada por sí sola.
 */
export function Counter({
  value,
  suffix = '',
  label,
  max,
  won,
  wonLabel = 'ganados',
  className = '',
}) {
  const { ref, value: current } = useCounter(value);
  const [open, setOpen] = useState(false);

  const percent = max ? Math.min((current / max) * 100, 100) : 100;

  // El tramo ganado crece al mismo ritmo que el contador, para que los dos
  // tramos lleguen juntos a su posición final.
  const progress = value ? current / value : 1;
  const hasWon = typeof won === 'number' && max;
  const wonPercent = hasWon ? Math.min((won / max) * progress * 100, 100) : 0;
  const wonRatio = hasWon && value ? Math.round((won / value) * 100) : 0;

  const track = (
    <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-text/10">
      <span
        className={`absolute inset-y-0 left-0 rounded-full ${hasWon ? 'bg-gold/25' : 'bg-gold-gradient'}`}
        style={{ width: `${percent}%` }}
      />
      {hasWon && (
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-gold-gradient"
          style={{ width: `${wonPercent}%` }}
        />
      )}
    </span>
  );

  const caption = (
    <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">
      {label}
      <span className="sr-only">
        {hasWon
          ? `: ${value.toLocaleString('es-CO')}${suffix}, de los cuales ${won.toLocaleString('es-CO')} ganados, el ${wonRatio} %.`
          : `: ${value.toLocaleString('es-CO')}${suffix}`}
      </span>
    </p>
  );

  if (!hasWon) {
    return (
      <div ref={ref} className={className}>
        <span aria-hidden="true">{track}</span>
        {caption}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <div className="relative">
        {/*
          Botón y no un `div` con `title`: así responde igual al mouse, al
          teclado y al toque en móvil, donde no existe el hover.
        */}
        <button
          type="button"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`${label}: ${value.toLocaleString('es-CO')}${suffix}, de los cuales ${won.toLocaleString('es-CO')} ganados, el ${wonRatio} %. Ver detalle.`}
          className="block w-full rounded-full py-2 -my-2"
        >
          {track}
        </button>

        {open && (
          <span
            role="tooltip"
            className="absolute bottom-full left-0 z-10 mb-2 block whitespace-nowrap rounded-xl border border-border bg-surface px-4 py-3 text-left shadow-2xl"
          >
            <span className="block font-display text-lg leading-none text-goldSoft">
              {won.toLocaleString('es-CO')} de {value.toLocaleString('es-CO')}
              {suffix}
            </span>
            <span className="mt-1.5 block text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {wonRatio} % {wonLabel}
            </span>
          </span>
        )}
      </div>
      {caption}
    </div>
  );
}

export default Counter;
