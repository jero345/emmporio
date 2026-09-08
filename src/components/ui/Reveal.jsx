import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animación de entrada estándar: opacity + 20px hacia arriba, 0.5 s.
 * Respeta `prefers-reduced-motion` y solo se dispara una vez por elemento.
 */
export function Reveal({ as = 'div', delay = 0, className = '', children, ...props }) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduce) {
    const Static = as;
    return (
      <Static className={className} {...props}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
