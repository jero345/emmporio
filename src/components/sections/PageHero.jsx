import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';

/**
 * Cabecera de las páginas internas: fotografía de las instalaciones con
 * overlay, título y migas de pan.
 */
export function PageHero({ eyebrow, title, text, image, imageAlt, breadcrumbs = [] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Photo
          base={image}
          alt={imageAlt || ''}
          aria-hidden={imageAlt ? undefined : 'true'}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />
      </div>

      <div className="container-site relative py-20 md:py-28">
        {eyebrow && (
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-goldSoft">
            <span className="h-px w-10 bg-gold-gradient" aria-hidden="true" />
            {eyebrow}
          </p>
        )}

        <h1 className="mt-5 max-w-3xl text-h1 text-balance">{title}</h1>

        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>}

        {breadcrumbs.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mt-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.to} className="flex items-center gap-2">
                    {index > 0 && (
                      <Icon name="ChevronRight" size={14} className="text-gold" />
                    )}
                    {isLast ? (
                      <span aria-current="page" className="text-goldSoft">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link to={crumb.to} className="transition-colors hover:text-goldSoft">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}

export default PageHero;
