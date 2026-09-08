/**
 * Helpers de imagen.
 *
 * Todas las fotos procesadas por `npm run assets` existen en dos anchos, con
 * el sufijo `-800.webp` / `-1600.webp` (instalaciones) o `-600.webp` /
 * `-1200.webp` (retratos). En los datos se guarda la ruta SIN sufijo y el
 * `srcset` se arma aquí, para no repetir la convención en cada componente.
 */

export const PHOTO_WIDTHS = [800, 1600];
export const PORTRAIT_WIDTHS = [600, 1200];

export function srcSet(base, widths = PHOTO_WIDTHS) {
  if (!base) return undefined;
  return widths.map((width) => `${base}-${width}.webp ${width}w`).join(', ');
}

export function src(base, width) {
  return base ? `${base}-${width}.webp` : undefined;
}

/** Props listos para un <img> responsive con dimensiones explícitas (evita CLS). */
export function responsiveImage(base, { widths = PHOTO_WIDTHS, sizes = '100vw', ratio = 3 / 2 } = {}) {
  const largest = widths[widths.length - 1];
  return {
    src: src(base, largest),
    srcSet: srcSet(base, widths),
    sizes,
    width: largest,
    height: Math.round(largest / ratio),
  };
}
