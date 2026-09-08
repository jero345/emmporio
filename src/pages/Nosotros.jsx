import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { WhyChooseUs } from '../components/sections/WhyChooseUs.jsx';
import { Stats } from '../components/sections/Stats.jsx';
import { Process } from '../components/sections/Process.jsx';
import { Attorneys } from '../components/sections/Attorneys.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { Photo } from '../components/ui/Photo.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { Icon } from '../components/ui/Icon.jsx';

import { aboutSection } from '../data/home.js';
import { siteConfig } from '../data/siteConfig.js';
import { breadcrumbSchema } from '../lib/seo.js';

// TODO: reemplazar con los valores reales de la firma.
const valores = [
  {
    icon: 'ShieldCheck',
    title: 'Lealtad con el cliente',
    text: 'El interés del cliente está por encima de la conveniencia de la firma. Si un caso no tiene salida, se dice a tiempo.',
  },
  {
    icon: 'Scale',
    title: 'Rigor técnico',
    text: 'Cada actuación se sustenta en norma, jurisprudencia y prueba. No se litiga con voluntarismo.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Información permanente',
    text: 'El cliente sabe qué pasó, qué sigue y qué se espera del resultado, en lenguaje entendible.',
  },
  {
    icon: 'HandCoins',
    title: 'Claridad económica',
    text: 'Honorarios pactados por escrito, con alcance definido y sin cobros sorpresa.',
  },
];

export default function Nosotros() {
  return (
    <>
      <Seo
        title="Sobre la firma"
        description={`Emmporio Jurídico es una firma de abogados fundada en ${siteConfig.foundedYear} en ${siteConfig.address.city}. Conozca su historia, sus valores y su equipo.`}
        path="/nosotros"
        schemas={[
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Nosotros', to: '/nosotros' },
          ]),
        ]}
      />

      <PageHero
        eyebrow={siteConfig.kicker}
        title="Una firma construida caso a caso"
        text={`Desde ${siteConfig.foundedYear} representamos a personas y empresas que necesitan algo más que un abogado disponible: necesitan una defensa preparada.`}
        image="/assets/instalaciones/recepcion-logo-lateral"
        imageAlt="Recepción de las oficinas de Emmporio Jurídico"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Nosotros', to: '/nosotros' },
        ]}
      />

      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="grid gap-5 sm:grid-cols-2">
            {aboutSection.images.map((image, index) => (
              <div
                key={image.src}
                className={[
                  'overflow-hidden rounded-2xl ring-1 ring-white/5',
                  index === 1 ? 'sm:mt-10' : '',
                ].join(' ')}
              >
                <Photo
                  base={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  ratio={3 / 4}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Reveal>

          <div>
            <SectionHeading eyebrow="Quiénes somos" title="Defensa preparada, no improvisada" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-text">{aboutSection.lead}</p>
              <p className="mt-4 leading-relaxed text-muted">{aboutSection.body}</p>
              <p className="mt-4 leading-relaxed text-muted">
                El tagline que acompaña al logo desde 2010 —«{siteConfig.tagline}»— no es una frase
                publicitaria: es el criterio con el que se decide si la firma asume un caso y cómo lo
                lleva hasta el final.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-surface/40">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nuestros valores"
            title="Cómo trabajamos, en concreto"
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor, index) => (
              <Reveal
                key={valor.title}
                delay={index * 0.08}
                className="rounded-2xl border border-border bg-surface p-7"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gold/[0.07] text-gold">
                  <Icon name={valor.icon} size={24} />
                </span>
                <h3 className="mt-6 font-display text-h3 text-text">{valor.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{valor.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Stats />
      <Process />
      <Attorneys />
      <ContactCTA />
    </>
  );
}
