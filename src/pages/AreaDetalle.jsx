import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { ResultCard } from '../components/sections/CaseResults.jsx';
import { LeadForm } from '../components/sections/LeadForm.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { Photo } from '../components/ui/Photo.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { getPracticeArea, practiceAreas } from '../data/practiceAreas.js';
import { anonymizationNotice, resultados } from '../data/resultados.js';
import { breadcrumbSchema } from '../lib/seo.js';

/** Plantilla única de detalle de área, alimentada por `practiceAreas.js`. */
export default function AreaDetalle() {
  const { slug } = useParams();
  const area = getPracticeArea(slug);
  const [selected, setSelected] = useState(null);

  if (!area) return <Navigate to="/404" replace />;

  const cases = resultados.filter((result) => result.area === area.title);
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

            {cases.length > 0 && (
              <Reveal delay={0.2} className="mt-16">
                <h2 className="font-display text-h2 text-text">Resultados en esta área</h2>
                <span className="mt-4 block h-px w-16 bg-gold-gradient" aria-hidden="true" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {cases.slice(0, 4).map((result, index) => (
                    <ResultCard key={result.id} result={result} index={index} onOpen={setSelected} />
                  ))}
                </div>
                <p className="mt-8 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
                  {anonymizationNotice}
                </p>
              </Reveal>
            )}
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

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.result}>
        {selected && (
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
              {selected.area} · {selected.year}
            </p>
            <h2 className="mt-4 font-display text-h3 leading-snug text-text">{selected.result}</h2>
            <p className="mt-6 leading-relaxed text-muted">{selected.summary}</p>
            {selected.document && (
              <a
                href={selected.document}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldSoft"
              >
                <Icon name="FileText" size={18} />
                Ver el documento en PDF
              </a>
            )}
            <p className="mt-6 text-xs leading-relaxed text-muted">{anonymizationNotice}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
