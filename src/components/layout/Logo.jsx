import { Link } from 'react-router-dom';
import logoLight from '../../assets/brand/logo-light.png';
import { siteConfig } from '../../data/siteConfig.js';

/**
 * Logotipo de la firma.
 *
 * Sobre fondo oscuro se usa SIEMPRE la versión invertida (wordmark en crema
 * + isotipo dorado) que genera `npm run assets` a partir del original del
 * cliente. El logo negro nunca va sobre el fondo `base`.
 */
export function Logo({ className = '', height = 44, asLink = true }) {
  const image = (
    <img
      src={logoLight}
      alt={`${siteConfig.name} — ${siteConfig.tagline}`}
      height={height}
      style={{ height }}
      className="w-auto"
      width={Math.round(height * 2.74)}
    />
  );

  if (!asLink) return <span className={className}>{image}</span>;

  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label={`${siteConfig.name} — inicio`}>
      {image}
    </Link>
  );
}

export default Logo;
