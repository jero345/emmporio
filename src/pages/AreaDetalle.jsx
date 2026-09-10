import { Link, Navigate, useParams } from 'react-router-dom';

import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { LeadForm } from '../components/sections/LeadForm.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Photo } from '../components/ui/Photo.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { getPracticeArea, practiceAreas } from '../data/practiceAreas.js';
import { breadcrumbSchema } from '../lib/seo.js';

/**
 * Plantilla única de detalle de área, alimentada por `practiceAreas.js`.
 *
 * La página explica en qué consiste el área, qué servicios presta la firma y
 * qué asuntos se atienden. Los resultados NO van aquí: viven todos juntos en
 * «Casos y resultados», para no repetir la misma información en once páginas.
 */
export default function AreaDetalle() {
  const { slug } = useParams();
  const area = getPracticeArea(slug);

  if (!area) return <Navigate to="/404" replace />;

  const others = practiceAreas.filter((item) => item.slug !== area.slug);

  const breadcrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Áreas de práctica', to: '/areas-de-practica' },
    { label: area.title, to: `/areas-de-practica/${area.slug}` },
  ];

  return (
    <>
      <Seo
        title={area.title}
        description={area.excerpt}
        path={`/areas-de-practica/${area.slug}`}
        schemas={[breadcrumbSchema(breadcrumbs)]}
      />

      <PageHero
        eyebrow="Área de práctica"
        title={area.title}
        text={area.excerpt}
        image={area.image}
        imageAlt={area.imageAlt}
        breadcrumbs={breadcrumbs}
      />

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-text">{area.intro}</p>
              {area.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl ring-1 ring-white/5">
              <Photo
                base={area.image}
                alt={area.imageAlt}
                sizes="(min-width: 1024px) 55vw, 90vw"
                ratio={16 / 9}
                className="h-full w-full object-cover"
              />
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <h2 className="font-display text-h2 text-text">Qué incluye este servicio</h2>
              <span className="mt-4 block h-px w-16 bg-gold-gradient" aria-hidden="true" />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {area.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
                  >
                    <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-gold" />
                    <span className="text-sm leading-relaxed text-muted">{service}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-2xl border border-border bg-surface p-7">
              <h2 className="font-display text-h3 text-text">Otras áreas</h2>
              <ul className="mt-5 space-y-1">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/areas-de-practica/${item.slug}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-surface2 hover:text-goldSoft"
                    >
                      <Icon name={item.icon} size={17} className="shrink-0 text-gold" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="rounded-2xl border border-gold/30 bg-surface p-7">
              <h2 className="font-display text-h3 text-text">Consulte su caso</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Cuéntenos qué ocurrió y le decimos si tiene un caso.
              </p>
              <div className="mt-6">
                <LeadForm source={`area-${area.slug}`} compact defaultArea={area.slug} />
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

    </>
  );
}
