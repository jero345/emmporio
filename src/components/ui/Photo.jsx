import { PHOTO_WIDTHS, PORTRAIT_WIDTHS, srcSet, src } from '../../lib/images.js';

/**
 * <img> responsive con `srcset`, `loading="lazy"` y dimensiones explícitas
 * para no generar CLS. Recibe la ruta base sin sufijo ni extensión.
 */
export function Photo({
  base,
  alt,
  variant = 'photo',
  sizes = '100vw',
  ratio,
  className = '',
  priority = false,
  ...props
}) {
  const widths = variant === 'portrait' ? PORTRAIT_WIDTHS : PHOTO_WIDTHS;
  const largest = widths[widths.length - 1];
  const aspect = ratio ?? (variant === 'portrait' ? 3 / 4 : 3 / 2);

  return (
    <img
      src={src(base, largest)}
      srcSet={srcSet(base, widths)}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / aspect)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      {...props}
    />
  );
}

export default Photo;
