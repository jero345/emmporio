import { forwardRef } from 'react';
import { useDomId } from '../../hooks/useDomId.js';
import { Icon } from './Icon.jsx';

/**
 * Campos de formulario con etiqueta, estado de error y `aria-describedby`.
 * `react-hook-form` los conecta con `register()`, así que reenvían la ref.
 */

const controlClasses = (hasError) =>
  [
    'w-full rounded-xl border bg-surface px-4 py-3.5 text-[0.95rem] text-text placeholder:text-muted/70',
    'transition-colors duration-200 focus:border-gold focus:outline-none',
    hasError ? 'border-red-400/70' : 'border-border hover:border-white/20',
  ].join(' ');

function Wrapper({ id, label, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">
        {label}
        {required && (
          <span className="text-goldSoft" aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
          <Icon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { label, error, required, className, ...props },
  ref
) {
  const id = useDomId('campo');
  return (
    <Wrapper id={id} label={label} error={error} required={required} className={className}>
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses(Boolean(error))}
        {...props}
      />
    </Wrapper>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, required, className, rows = 5, ...props },
  ref
) {
  const id = useDomId('campo');
  return (
    <Wrapper id={id} label={label} error={error} required={required} className={className}>
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${controlClasses(Boolean(error))} resize-y`}
        {...props}
      />
    </Wrapper>
  );
});

export const Select = forwardRef(function Select(
  { label, error, required, className, options = [], placeholder = 'Seleccione una opción', ...props },
  ref
) {
  const id = useDomId('campo');
  return (
    <Wrapper id={id} label={label} error={error} required={required} className={className}>
      <div className="relative">
        <select
          id={id}
          ref={ref}
          defaultValue=""
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${controlClasses(Boolean(error))} appearance-none pr-11`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="ChevronDown"
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </Wrapper>
  );
});

export const Checkbox = forwardRef(function Checkbox(
  { label, error, className = '', ...props },
  ref
) {
  const id = useDomId('campo');
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border bg-surface accent-gold"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-muted">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
          <Icon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
});

/** Campo trampa para bots: fuera de pantalla, sin foco y sin autocompletado. */
export const Honeypot = forwardRef(function Honeypot(props, ref) {
  return (
    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website-hp">No completar</label>
      <input id="website-hp" ref={ref} type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
});
