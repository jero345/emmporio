import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { PracticeAreaCard } from '../components/sections/PracticeAreas.jsx';
import { Process } from '../components/sections/Process.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { practiceAreas } from '../data/practiceAreas.js';
import { breadcrumbSchema } from '../lib/seo.js';

export default function AreasDePractica() {
  return (
    <>
      <Seo
        title="Áreas de práctica"
        description="Derecho penal, laboral, de familia, civil e inmobiliario, corporativo y responsabilidad civil. Conozca en qué puede representarlo Emmporio Jurídico."
        path="/areas-de-practica"
        schemas={[
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Áreas de práctica', to: '/areas-de-practica' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Qué hacemos"
        title="Áreas de práctica"
        text="Once frentes de trabajo con abogados dedicados a cada uno. Si su asunto toca más de una materia, el equipo se coordina internamente."
        image="/assets/instalaciones/mural-areas-practica"
        imageAlt="Mural con las áreas de práctica en las oficinas de la firma"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Áreas de práctica', to: '/areas-de-practica' },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Reveal key={area.slug} delay={(index % 3) * 0.1}>
              <PracticeAreaCard area={area} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <Process />
      <ContactCTA />
    </>
  );
}
