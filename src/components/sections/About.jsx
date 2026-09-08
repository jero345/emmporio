import { aboutSection } from '../../data/home.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Dos fotografías superpuestas con el sello circular de años de experiencia,
 * y a la derecha el texto de la firma con la grilla 2x2 de diferenciadores.
 */
export function About() {
  const [primary, secondary] = aboutSection.images;

  return (
    <section className="section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/5">
            <Photo
              base={primary.src}
              alt={primary.alt}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-10 -right-4 hidden w-[46%] overflow-hidden rounded-2xl border-4 border-base ring-1 ring-white/5 sm:block lg:-right-10">
            <Photo
              base={secondary.src}
              alt={secondary.alt}
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Sello circular giratorio con los años de trayectoria. */}
          <div className="absolute -left-4 bottom-6 grid h-28 w-28 place-items-center rounded-full bg-gold-gradient text-center shadow-xl lg:-left-10 lg:h-32 lg:w-32">
            <span
              aria-hidden="true"
              className="absolute inset-2 animate-spin-slow rounded-full border border-dashed border-base/40"
            />
            <span className="relative leading-tight text-ink">
              <span className="block font-display text-2xl font-semibold lg:text-3xl">
                {aboutSection.badge.top}
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.18em]">
                {aboutSection.badge.bottom}
              </span>
            </span>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={aboutSection.eyebrow} title={aboutSection.title} />

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-text">{aboutSection.lead}</p>
            <p className="mt-4 leading-relaxed text-muted">{aboutSection.body}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {aboutSection.highlights.map((item, index) => (
              <Reveal key={item.title} delay={0.15 + index * 0.08} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-surface text-gold">
                  <Icon name={item.icon} size={22} />
                </span>
                <span>
                  <span className="block font-display text-lg text-text">{item.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">{item.text}</span>
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35} className="mt-10">
            <Button to="/nosotros" variant="secondary" icon="ArrowRight">
              Conozca la firma
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
