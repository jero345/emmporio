import { Link } from 'react-router-dom';
import { legalLinks, siteConfig, whatsappUrl } from '../../data/siteConfig.js';
import { practiceAreas } from '../../data/practiceAreas.js';
import { hasPosts } from '../../data/posts.js';
import { Icon } from '../ui/Icon.jsx';
import { Logo } from './Logo.jsx';
import { NewsletterForm } from '../sections/NewsletterForm.jsx';

const quickLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Áreas de práctica', to: '/areas-de-practica' },
  { label: 'Abogados', to: '/abogados' },
  { label: 'Casos y resultados', to: '/casos' },
  ...(hasPosts ? [{ label: 'Blog', to: '/blog' }] : []),
  { label: 'Contacto', to: '/contacto' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {/* Formas decorativas de fondo, muy sutiles. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-gold/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-goldSoft/[0.03] blur-3xl"
      />

      <div className="container-site relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo height={46} />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{siteConfig.description}</p>

            <ul className="mt-7 space-y-2 text-sm text-muted">
              {siteConfig.schedule.map((item) => (
                <li key={item.days} className="flex items-start gap-2.5">
                  <Icon name="Clock" size={15} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    <span className="text-text">{item.days}:</span> {item.hours}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-7 flex items-center gap-3">
              {siteConfig.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} en ${item.name}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-goldSoft"
                  >
                    <Icon name={item.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Enlaces rápidos">
            <h2 className="font-display text-lg text-text">Enlaces</h2>
            <span className="mt-3 block h-px w-10 bg-gold-gradient" aria-hidden="true" />
            <ul className="mt-6 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-goldSoft"
                  >
                    <Icon name="ChevronRight" size={14} className="text-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Áreas de práctica">
            <h2 className="font-display text-lg text-text">Áreas</h2>
            <span className="mt-3 block h-px w-10 bg-gold-gradient" aria-hidden="true" />
            <ul className="mt-6 space-y-3 text-sm">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/areas-de-practica/${area.slug}`}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-goldSoft"
                  >
                    <Icon name="ChevronRight" size={14} className="text-gold" />
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg text-text">Contacto</h2>
            <span className="mt-3 block h-px w-10 bg-gold-gradient" aria-hidden="true" />

            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-gold" />
                <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-goldSoft">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="shrink-0 text-gold" />
                <a href={siteConfig.phoneHref} className="hover:text-goldSoft">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="MessageCircle" size={16} className="shrink-0 text-gold" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-goldSoft">
                  WhatsApp {siteConfig.mobile}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-goldSoft">
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <NewsletterForm className="mt-8" />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-muted md:flex-row md:text-left">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-goldSoft">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
