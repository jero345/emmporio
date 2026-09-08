import { attorneys } from '../../data/attorneys.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Tarjeta de abogado. El retrato lleva el tratamiento duotono uniforme
 * (`portrait-duotone`) para que fotos tomadas en condiciones distintas se
 * vean coherentes; al hacer hover recupera el color.
 *
 * La tarjeta no enlaza a ningun lado: el equipo se presenta aqui mismo y los
 * unicos enlaces son los iconos de redes de cada abogado.
 */
export function AttorneyCard({ attorney }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-gold">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface2">
        <Photo
          base={attorney.image}
          alt={attorney.imageAlt}
          variant="portrait"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="portrait-duotone h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-card-overlay" aria-hidden="true" />

        {attorney.social.length > 0 && (
          <ul className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {attorney.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${attorney.name} en ${item.name}`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink transition-colors hover:bg-goldSoft"
                >
                  <Icon name={item.icon} size={16} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center p-4 text-center sm:p-5">
        <h3 className="font-display text-xl text-text lg:text-2xl">{attorney.name}</h3>
        <p className="mt-1.5 text-sm text-muted">{attorney.role}</p>
      </div>
    </article>
  );
}

export function Attorneys() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Nuestro equipo"
            title="Quién va a llevar su caso"
            text="Sabrá desde el primer día quién es el abogado responsable de su proceso y cómo contactarlo."
          />
          <Reveal delay={0.15}>
            <Button to="/abogados" variant="secondary" icon="ArrowRight">
              Ver todo el equipo
            </Button>
          </Reveal>
        </div>

        {/*
          Rejilla, no carrusel: el equipo cabe entero en una fila desde `xl`,
          asi que nadie queda escondido detras de una flecha. En pantallas mas
          angostas se reparte en dos o tres columnas.
        */}
        <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 xl:grid-cols-5">
          {attorneys.map((attorney) => (
            <AttorneyCard key={attorney.slug} attorney={attorney} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Attorneys;
