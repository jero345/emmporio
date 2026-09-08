import { Icon } from './Icon.jsx';

/** Calificación en estrellas, con el valor legible para lectores de pantalla. */
export function Stars({ rating = 5, max = 5, size = 16 }) {
  return (
    <p className="flex items-center gap-1" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }, (_, index) => (
        <Icon
          key={index}
          name="Star"
          size={size}
          className={index < rating ? 'fill-gold text-gold' : 'text-muted/40'}
        />
      ))}
    </p>
  );
}

export default Stars;
