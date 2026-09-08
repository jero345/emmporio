import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig, whatsappUrl } from '../../data/siteConfig.js';
import { practiceAreas } from '../../data/practiceAreas.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Logo } from './Logo.jsx';

/**
 * Menú off-canvas a pantalla completa.
 * Bloquea el scroll del documento, cierra con Escape y devuelve el foco.
 */
export function MobileMenu({ open, onClose, items }) {
  const [areasOpen, setAreasOpen] = useState(false);
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    openerRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector('a, button')?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
      openerRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-base lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <div className="container-site flex h-[74px] shrink-0 items-center justify-between border-b border-border">
            <Logo height={36} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border text-text transition-colors hover:border-gold hover:text-goldSoft"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav aria-label="Navegación móvil" className="container-site flex-1 py-8">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.to}>
                  {item.hasDropdown ? (
                    <>
                      <div className="flex items-center justify-between">
                        <NavLink
                          to={item.to}
                          onClick={onClose}
                          className="flex-1 py-4 font-display text-xl text-text"
                        >
                          {item.label}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => setAreasOpen((value) => !value)}
                          aria-expanded={areasOpen}
                          aria-label="Ver áreas de práctica"
                          className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted"
                        >
                          <Icon
                            name="ChevronDown"
                            size={18}
                            className={areasOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                          />
                        </button>
                      </div>
                      {areasOpen && (
                        <ul className="mb-4 space-y-1 border-l border-gold/30 pl-4">
                          {practiceAreas.map((area) => (
                            <li key={area.slug}>
                              <Link
                                to={`/areas-de-practica/${area.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-3 py-2.5 text-[0.95rem] text-muted transition-colors hover:text-goldSoft"
                              >
                                <Icon name={area.icon} size={16} className="text-gold" />
                                {area.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block py-4 font-display text-xl ${isActive ? 'text-goldSoft' : 'text-text'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-4">
              <Button to="/contacto" onClick={onClose} className="w-full" size="lg">
                Agendar consulta
              </Button>
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon="MessageCircle"
                iconPosition="left"
                className="w-full"
              >
                Escribir por WhatsApp
              </Button>
            </div>

            <ul className="mt-10 space-y-4 text-sm text-muted">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-3">
                  <Icon name="Phone" size={16} className="text-gold" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3">
                  <Icon name="Mail" size={16} className="text-gold" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </li>
            </ul>

            <ul className="mt-8 flex items-center gap-3">
              {siteConfig.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} en ${item.name}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-goldSoft"
                  >
                    <Icon name={item.icon} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
