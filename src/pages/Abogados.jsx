import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { AttorneyGrid } from '../components/sections/Attorneys.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';

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
        <div className="container-site">
          <AttorneyGrid revealed />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
