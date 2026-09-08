import { useCounter } from '../../hooks/useCounter.js';

/**
 * Indicador en porcentaje con barra.
 *
 * El número y el ancho de la barra los mueve el mismo contador, así que
 * avanzan sincronizados sin una animación CSS aparte. `useCounter` ya
 * respeta `prefers-reduced-motion`: en ese caso salta directo al valor final.
 *
 * `aria-valuenow` lleva el valor definitivo, no el animado, para que el
 * lector de pantalla anuncie la cifra una sola vez.
 */
export function ProgressBar({ value, label, description, className = '' }) {
  const { ref, value: current } = useCounter(value);

  return (
    <div ref={ref} className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
        <p className="font-display text-2xl leading-none text-goldSoft">
          <span>{current}</span>
          <span aria-hidden="true">%</span>
        </p>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-text/10"
      >
        <span
          aria-hidden="true"
          className="block h-full rounded-full bg-gold-gradient"
          style={{ width: `${current}%` }}
        />
      </div>

      {description && (
        <p className="mt-2.5 text-xs leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

export default ProgressBar;
