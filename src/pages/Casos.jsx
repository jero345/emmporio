import { useMemo, useState } from 'react';

import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { CaseResults } from '../components/sections/CaseResults.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';

import { resultados } from '../data/resultados.js';
import { breadcrumbSchema } from '../lib/seo.js';

export default function Casos() {
  const areas = useMemo(() => ['Todas', ...new Set(resultados.map((item) => item.area))], []);
  const [filter, setFilter] = useState('Todas');

  const visible = filter === 'Todas' ? resultados : resultados.filter((item) => item.area === filter);

  return (
    <>
      <Seo
        title="Casos y resultados"
        description="Fallos y decisiones favorables obtenidas por Emmporio Jurídico en materia penal, laboral, civil y de familia."
        path="/casos"
        schemas={[
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Casos', to: '/casos' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Resultados"
        title="Casos y fallos favorables"
        text="Una muestra de procesos con resultado favorable. Los documentos que se pueden compartir están enlazados en cada caso, anonimizados."
        image="/assets/instalaciones/sala-juntas-diplomas"
        imageAlt="Sala de juntas de Emmporio Jurídico con los reconocimientos de la firma"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Casos', to: '/casos' },
        ]}
      />

      <div className="container-site pt-16">
        <ul className="flex flex-wrap gap-3">
          {areas.map((area) => (
            <li key={area}>
              <button
                type="button"
                onClick={() => setFilter(area)}
                aria-pressed={filter === area}
                className={[
                  'rounded-full border px-5 py-2.5 text-sm transition-colors',
                  filter === area
                    ? 'border-gold bg-gold text-ink'
                    : 'border-border text-muted hover:border-gold hover:text-goldSoft',
                ].join(' ')}
              >
                {area}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CaseResults items={visible} showHeading={false} showAll />
      <ContactCTA />
    </>
  );
}
