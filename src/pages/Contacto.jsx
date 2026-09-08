import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { LeadForm } from '../components/sections/LeadForm.jsx';
import { FAQ } from '../components/sections/FAQ.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

import { siteConfig, whatsappUrl } from '../data/siteConfig.js';
import { breadcrumbSchema, legalServiceSchema } from '../lib/seo.js';
import { practiceAreas } from '../data/practiceAreas.js';

const channels = [
  {
    icon: 'Phone',
    label: 'PBX',
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    note: 'En horario de oficina',
  },
  {
    icon: 'MessageCircle',
    label: 'WhatsApp',
    value: siteConfig.mobile,
    href: whatsappUrl,
    note: 'La vía más rápida',
  },
  {
    icon: 'Mail',
    label: 'Correo electrónico',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: 'Respondemos en 24 horas hábiles',
  },
  {
    icon: 'MapPin',
    label: 'Oficina',
    value: `${siteConfig.address.street}, ${siteConfig.address.city}`,
    href: siteConfig.address.mapsUrl,
    note: 'Atención con cita previa',
  },
];

export default function Contacto() {
  return (
    <>
      <Seo
        title="Contacto"
        description={`Agende una consulta con Emmporio Jurídico en ${siteConfig.address.city}. Teléfono, WhatsApp, correo y formulario de contacto.`}
        path="/contacto"
        schemas={[
          legalServiceSchema(practiceAreas),
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Contacto', to: '/contacto' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Hablemos"
        title="Agende su consulta"
        text="Cuéntenos qué ocurrió. Un abogado del equipo revisa cada solicitud y le responde para coordinar la primera valoración."
        image="/assets/instalaciones/abogada-area-atencion"
        imageAlt="Abogada de Emmporio Jurídico en su despacho, con Medellín al fondo"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Contacto', to: '/contacto' },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Canales de atención" title="Cómo llegar a nosotros" />

            <ul className="mt-10 space-y-6">
              {channels.map((channel, index) => (
                <Reveal as="li" key={channel.label} delay={index * 0.08}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/[0.07] text-gold">
                      <Icon name={channel.icon} size={21} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                        {channel.label}
                      </span>
                      <span className="mt-1.5 block text-text transition-colors group-hover:text-goldSoft">
                        {channel.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{channel.note}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3} className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <h2 className="flex items-center gap-2.5 font-display text-h3 text-text">
                <Icon name="Clock" size={20} className="text-gold" />
                Horario de atención
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {siteConfig.schedule.map((item) => (
                  <li key={item.days} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <span className="text-muted">{item.days}</span>
                    <span className="text-right text-text">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="rounded-2xl border border-border bg-surface p-7 md:p-10">
            <h2 className="font-display text-h2 text-text">Escríbanos</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Entre más detalle nos dé, mejor podremos orientarlo desde la primera respuesta.
            </p>
            <div className="mt-8">
              <LeadForm source="pagina-contacto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TODO: reemplazar el iframe por la ubicación real cuando el cliente confirme la dirección. */}
      <section aria-label="Ubicación de la oficina" className="border-y border-border">
        <iframe
          title={`Ubicación de ${siteConfig.name}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[420px] w-full border-0 grayscale-[0.6] contrast-[1.1]"
        />
      </section>

      <FAQ />
    </>
  );
}
