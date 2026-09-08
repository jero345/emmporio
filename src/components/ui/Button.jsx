import { Link } from 'react-router-dom';
import { Icon } from './Icon.jsx';

/**
 * Botón único del sitio, en tres variantes.
 *
 * El primario es dorado con texto `base`: nunca blanco sobre dorado, porque
 * no alcanza el contraste AA.
 */
const variants = {
  primary:
    'bg-gold text-ink hover:bg-goldSoft focus-visible:bg-goldSoft border border-transparent',
  secondary:
    'border border-gold text-goldSoft hover:bg-gold hover:text-ink bg-transparent',
  ghost: 'border border-border text-text hover:border-gold hover:text-goldSoft bg-transparent',
};

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[0.95rem]',
};

export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) {
  const classes = [
    'group/btn inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold tracking-wide',
    'transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ].join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  const Component = as || 'button';
  return (
    <Component className={classes} {...props}>
      {content}
    </Component>
  );
}

export default Button;
