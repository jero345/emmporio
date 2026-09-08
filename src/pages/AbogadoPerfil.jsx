import { Link, Navigate, useParams } from 'react-router-dom';

import { Seo } from '../components/Seo.jsx';
import { LeadForm } from '../components/sections/LeadForm.jsx';
import { AttorneyCard } from '../components/sections/Attorneys.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Photo } from '../components/ui/Photo.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

import { attorneys, getAttorney } from '../data/attorneys.js';
import { getPracticeArea } from '../data/practiceAreas.js';
import { attorneySchema, breadcrumbSchema } from '../lib/seo.js';

export default function AbogadoPerfil() {
  const { slug } = useParams();
  const attorney = getAttorney(slug);

  if (!attorney) return <Navigate to="/404" replace />;

  const areas = attorney.areas.map(getPracticeArea).filter(Boolean);
  const others = attorneys.filter((item) => item.slug !== attorney.slug).slice(0, 4);

  const breadcrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Abogados', to: '/abogados' },
    { label: attorney.name, to: `/abogados/${attorney.slug}` },
  ];

  return (
    <>
      <Seo
        title={`${attorney.name} — ${attorney.role}`}
        description={attorney.bio[0]}
        path={`/abogados/${attorney.slug}`}
        type="profile"
        schemas={[attorneySchema(attorney), breadcrumbSchema(breadcrumbs)]}
      />

      <section className="border-b border-border bg-surface/40 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="container-site">
          <nav aria-label="Ruta de navegación" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.to} className="flex items-center gap-2">
                  {index > 0 && <Icon name="ChevronRight" size={14} className="text-gold" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-goldSoft">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="transition-colors hover:text-goldSoft">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="overflow-hidden rounded-2xl ring-1 ring-white/5">
              <Photo
                base={attorney.image}
                alt={attorney.imageAlt}
                variant="portrait"
                priority
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="h-full w-full object-cover object-top"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-goldSoft">
                <span className="h-px w-10 bg-gold-gradient" aria-hidden="true" />
                {attorney.specialty}
              </p>

              <h1 className="mt-5 text-h1">{attorney.name}</h1>
              <p className="mt-3 text-lg text-muted">{attorney.role}</p>

              <div className="mt-8 space-y-4">
                {attorney.bio.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <dl className="mt-9 grid gap-5 border-y border-border py-7 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">En la firma desde</dt>
                  <dd className="mt-1.5 text-text">{attorney.since}</dd>
                </div>
                {attorney.card && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                      Tarjeta profesional
                    </dt>
                    <dd className="mt-1.5 text-text">{attorney.card}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">Correo</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${attorney.email}`} className="text-text hover:text-goldSoft">
                      {attorney.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">Teléfono</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`tel:${attorney.phone.replace(/\s/g, '')}`}
                      className="text-text hover:text-goldSoft"
                    >
                      {attorney.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              {attorney.education.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-h3 text-text">Formación</h2>
                  <ul className="mt-4 space-y-3">
                    {attorney.education.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted">
                        <Icon name="GraduationCap" size={18} className="mt-0.5 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {areas.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-h3 text-text">Áreas en las que trabaja</h2>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {areas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          to={`/areas-de-practica/${area.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-goldSoft"
                        >
                          <Icon name={area.icon} size={15} className="text-gold" />
                          {area.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {attorney.social.length > 0 && (
                <ul className="mt-8 flex items-center gap-3">
                  {attorney.social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={`${attorney.name} en ${item.name}`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-goldSoft"
                      >
                        <Icon name={item.icon} size={17} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Agende una cita"
              title={`Consulte su caso con ${attorney.name.split(' ')[0]}`}
              text="Escríbanos y coordinamos una primera valoración de su caso."
            />
            <div className="mt-9">
              <LeadForm source={`abogado-${attorney.slug}`} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-h3 text-text">Otros abogados del equipo</h2>
            <span className="mt-4 block h-px w-16 bg-gold-gradient" aria-hidden="true" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {others.map((item) => (
                <AttorneyCard key={item.slug} attorney={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
