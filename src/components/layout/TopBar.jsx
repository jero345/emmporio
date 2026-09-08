import { siteConfig } from '../../data/siteConfig.js';
import { Icon } from '../ui/Icon.jsx';

/**
 * Franja superior con horario, contacto y redes.
 * Oculta en móvil; en desktop el Navbar la colapsa al hacer scroll.
 */
export function TopBar() {
  return (
    <div className="hidden border-b border-border bg-base lg:block">
      <div className="container-site flex h-11 items-center justify-between text-[0.8rem] text-muted">
        <p className="flex items-center gap-2">
          <Icon name="Clock" size={14} className="text-gold" />
          <span>
            {siteConfig.schedule[0].days}: {siteConfig.schedule[0].hours}
          </span>
        </p>

        <div className="flex items-center gap-6">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-goldSoft"
          >
            <Icon name="Phone" size={14} className="text-gold" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 transition-colors hover:text-goldSoft"
          >
            <Icon name="Mail" size={14} className="text-gold" />
            {siteConfig.email}
          </a>

          <ul className="flex items-center gap-3 border-l border-border pl-6">
            {siteConfig.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} en ${item.name}`}
                  className="block transition-colors hover:text-goldSoft"
                >
                  <Icon name={item.icon} size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
