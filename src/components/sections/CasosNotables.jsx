import { casosNotables } from '../../data/casosNotables.js';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Casos notables: los procesos con repercusión pública.
 *
 * Se distingue de `CaseResults` en que aquí manda la pieza gráfica —lleva el
 * título incrustado— y no hay documento judicial que enlazar.
 */
function CasoCard({ caso }) {
  const isLink = Boolean(caso.href);
  const Wrapper = isLink ? 'a' : 'div';
  const linkProps = isLink
    ? { href: caso.href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={[
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface',
        isLink ? 'transition-colors duration-300 hover:border-gold' : '',
      ].join(' ')}
    >
      <div className="relative overflow-hidden bg-base">
        <Photo
          base={caso.image}
          alt={caso.imageAlt}
          ratio={16 / 10}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className={[
            'w-full',
            isLink ? 'transition-transform duration-700 group-hover:scale-105' : '',
          ].join(' ')}
        />

        {/* La duración solo la traen las piezas que son portada de un video. */}
        {caso.duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-base/85 px-3 py-1 text-xs font-semibold text-text">
            <Icon name="Play" size={12} className="fill-current text-gold" />
            {caso.duration}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
          {caso.area}
        </p>
        <h3 className="mt-3 font-display text-h3 text-text">{caso.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{caso.summary}</p>

        {isLink && (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft">
            Ver el caso
            <Icon
              name="ArrowUpRight"
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export function CasosNotables() {
  if (casosNotables.length === 0) return null;

  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="Casos notables"
          title="Procesos que trascendieron"
          text="Casos de la firma que tuvieron repercusión pública, contados sin exponer la identidad de quienes confiaron su defensa."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {casosNotables.map((caso, index) => (
            <Reveal key={caso.id} delay={(index % 3) * 0.1} className="h-full">
              <CasoCard caso={caso} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CasosNotables;
