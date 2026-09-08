/**
 * Casos notables: los procesos con repercusión pública que la firma quiere
 * destacar. Es una sección distinta de `resultados.js`, que recoge los fallos
 * favorables con su documento judicial.
 *
 * Cada pieza gráfica lleva el título incrustado, así que `npm run assets` las
 * encaja enteras en 16:10 sobre el fondo del sitio en vez de recortarlas.
 * La ruta se escribe SIN sufijo de ancho ni extensión.
 *
 * La sección se oculta sola si este array queda vacío.
 *
 * TODO: falta que el cliente confirme el resumen de cada caso y, en el del
 * pódcast, el enlace al video original.
 */

export const casosNotables = [
  {
    id: 'cn1',
    title: 'Defensa penal de los implicados en un homicidio',
    area: 'Derecho Penal',
    image: '/assets/casos/defensa-penal-homicidio',
    imageAlt:
      'Pieza gráfica del caso de defensa penal de los implicados en un homicidio, llevado por Emmporio Jurídico',
    summary:
      'Representación de los procesados desde las audiencias preliminares, con revisión de la legalidad de cada elemento material probatorio.', // TODO: resumen real
    href: null,
  },
  {
    id: 'cn2',
    title: 'Una muñeca cambió mi condena de 37 años',
    area: 'Derecho Penal',
    image: '/assets/casos/condena-37-anos',
    imageAlt:
      'Portada del video en el que se relata cómo una muñeca cambió una condena de 37 años',
    summary:
      'El relato en video de un caso en el que una prueba pasada por alto reabrió el proceso.', // TODO: resumen real
    duration: '1:08:40',
    // TODO: enlace al video en YouTube. Con `href` la tarjeta abre el original
    // en una pestaña nueva en vez de quedarse quieta.
    href: null,
  },
  {
    id: 'cn3',
    title: 'Caso fallecidos Metro de Medellín',
    area: 'Derecho Penal',
    image: '/assets/casos/caso-metro-de-medellin',
    imageAlt: 'Pieza gráfica del caso de los fallecidos del Metro de Medellín',
    summary:
      'Acompañamiento a las familias de las víctimas en el proceso por los hechos ocurridos en el Metro de Medellín.', // TODO: resumen real
    href: null,
  },
];
