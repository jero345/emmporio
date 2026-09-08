import { contactSection } from '../../data/home.js';
import { siteConfig, whatsappUrl } from '../../data/siteConfig.js';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
import { LeadForm } from './LeadForm.jsx';

const contactItems = [
  { icon: 'Phone', label: 'Teléfono', value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: 'MessageCircle', label: 'WhatsApp', value: siteConfig.mobile, href: whatsappUrl },
  { icon: 'Mail', label: 'Correo', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: 'MapPin',
    label: 'Oficina',
    value: `${siteConfig.address.street}, ${siteConfig.address.city}`,
    href: siteConfig.address.mapsUrl,
  },
];

/** Split: imagen y datos de contacto a la izquierda, formulario a la derecha. */
export function ContactCTA() {
  return (
    <section id="contacto" className="section bg-surface/40">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={contactSection.eyebrow}
            title={contactSection.title}
            text={contactSection.text}
          />

          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/5">
            <Photo
              base={contactSection.image.src}
              alt={contactSection.image.alt}
              sizes="(min-width: 1024px) 45vw, 90vw"
              ratio={16 / 9}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {contactItems.map((item, index) => (
              <Reveal as="li" key={item.label} delay={0.15 + index * 0.06}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/[0.07] text-gold">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-text transition-colors group-hover:text-goldSoft">
                      {item.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15} className="rounded-2xl border border-border bg-surface p-7 md:p-9">
          <LeadForm source="home-cta" compact />
        </Reveal>
      </div>
    </section>
  );
}

export default ContactCTA;
