import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { AttorneyCard } from '../components/sections/Attorneys.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { attorneys } from '../data/attorneys.js';
import { breadcrumbSchema } from '../lib/seo.js';

export default function Abogados() {
  return (
    <>
      <Seo
        title="Nuestros abogados"
        description="Conozca al equipo de Emmporio Jurídico: quién es el abogado responsable de cada área y cómo contactarlo."
        path="/abogados"
        schemas={[
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Abogados', to: '/abogados' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Nuestro equipo"
        title="Quién va a llevar su caso"
        text="Cada proceso tiene un abogado responsable identificado desde el primer día, con el respaldo del resto del equipo."
        image="/assets/instalaciones/sala-juntas-mapa-mundi"
        imageAlt="Equipo de Emmporio Jurídico en su sala de juntas"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Abogados', to: '/abogados' },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {attorneys.map((attorney, index) => (
            <Reveal key={attorney.slug} delay={(index % 5) * 0.08} className="h-full">
              <AttorneyCard attorney={attorney} />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
