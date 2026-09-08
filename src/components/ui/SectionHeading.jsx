import { Reveal } from './Reveal.jsx';

/**
 * Eyebrow dorado con línea corta + H2, presente en todas las secciones.
 * `align` cambia la alineación y el orden de la línea decorativa.
 */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  as: Heading = 'h2',
  light = false,
  className = '',
  children,
}) {
  const centered = align === 'center';

  return (
    <Reveal
      className={[
        centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <p
          className={[
            'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-goldSoft',
            centered ? 'justify-center' : '',
          ].join(' ')}
        >
          <span className="h-px w-8 bg-gold-gradient" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-gold-gradient" aria-hidden="true" />}
        </p>
      )}

      <Heading
        className={[
          'mt-5 text-h2 text-balance',
          light ? 'text-ink' : 'text-text',
        ].join(' ')}
      >
        {title}
      </Heading>

      {text && (
        <p className={['mt-5 leading-relaxed', light ? 'text-ink/80' : 'text-muted'].join(' ')}>
          {text}
        </p>
      )}

      {children}
    </Reveal>
  );
}

export default SectionHeading;
