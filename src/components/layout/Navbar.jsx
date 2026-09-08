import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { mainNav, siteConfig } from '../../data/siteConfig.js';
import { practiceAreas } from '../../data/practiceAreas.js';
import { hasPosts } from '../../data/posts.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Logo } from './Logo.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { TopBar } from './TopBar.jsx';

/** El blog solo aparece en el menú cuando hay artículos publicados. */
const navItems = mainNav.filter((item) => !item.onlyIfPosts || hasPosts);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Al cambiar de ruta se cierra todo lo que estuviera abierto.
  useEffect(() => {
    setOpenDropdown(false);
    setMobileOpen(false);
  }, [pathname]);

  // Clic fuera y Escape cierran el desplegable de áreas.
  useEffect(() => {
    if (!openDropdown) return undefined;
    const onPointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setOpenDropdown(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenDropdown(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openDropdown]);

  const linkClasses = ({ isActive }) =>
    [
      'relative py-2 text-sm font-medium transition-colors',
      isActive ? 'text-goldSoft' : 'text-text hover:text-goldSoft',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50">
      {/* La franja superior se colapsa al hacer scroll en desktop. */}
      <div
        className={[
          'overflow-hidden transition-[max-height,opacity] duration-300',
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
        ].join(' ')}
      >
        <TopBar />
      </div>

      <nav
        aria-label="Navegación principal"
        className={[
          'border-b transition-all duration-300',
          scrolled
            ? 'border-border bg-base/85 backdrop-blur-lg'
            : 'border-transparent bg-base xl:bg-base/60',
        ].join(' ')}
      >
        {/* La barra crece con el logo y se compacta al hacer scroll. */}
        <div
          className={[
            'container-site flex items-center justify-between gap-6 transition-all duration-300',
            scrolled ? 'h-[74px]' : 'h-[92px]',
          ].join(' ')}
        >
          <Logo height={scrolled ? 54 : 70} className="shrink-0 transition-all duration-300" />

          <ul className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <li key={item.to} ref={dropdownRef} className="relative">
                  <div className="flex items-center">
                    <NavLink to={item.to} className={linkClasses}>
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown((value) => !value)}
                      aria-expanded={openDropdown}
                      aria-label="Ver todas las áreas de práctica"
                      className="ml-1.5 rounded p-1 text-muted transition-colors hover:text-goldSoft"
                    >
                      <Icon
                        name="ChevronDown"
                        size={15}
                        className={openDropdown ? 'rotate-180 transition-transform' : 'transition-transform'}
                      />
                    </button>
                  </div>

                  {openDropdown && (
                    <ul className="absolute left-1/2 top-[calc(100%+14px)] w-[19rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl">
                      {practiceAreas.map((area) => (
                        <li key={area.slug}>
                          <Link
                            to={`/areas-de-practica/${area.slug}`}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface2 hover:text-goldSoft"
                          >
                            <Icon name={area.icon} size={17} className="shrink-0 text-gold" />
                            {area.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className={linkClasses}>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className={[
                'hidden items-center gap-2.5 text-sm',
                scrolled ? 'xl:flex' : '',
              ].join(' ')}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold">
                <Icon name="Phone" size={16} />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  Llámenos
                </span>
                <span className="font-semibold text-text">{siteConfig.phone}</span>
              </span>
            </a>

            <Button to="/contacto" className="hidden md:inline-flex">
              Agendar consulta
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-xl border border-border text-text transition-colors hover:border-gold hover:text-goldSoft xl:hidden"
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={navItems} />
    </header>
  );
}

export default Navbar;
