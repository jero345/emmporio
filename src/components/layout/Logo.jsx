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
export function Logo({ className = '', height = 44, heightClass = '', asLink = true }) {
  const image = (
    <img
      src={logoLight}
      alt={`${siteConfig.name} — ${siteConfig.tagline}`}
      // `width`/`height` van siempre: reservan el espacio y evitan el salto de
      // maquetacion mientras carga la imagen.
      height={height}
      width={Math.round(height * 2.74)}
      // Con `heightClass` manda el CSS, que es lo que permite un alto distinto
      // por breakpoint; sin ella vale el alto fijo de `height`.
      style={heightClass ? undefined : { height }}
      className={`w-auto ${heightClass}`}
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
