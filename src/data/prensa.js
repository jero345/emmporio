/**
 * Sección "En los medios y casos".
 *
 * Aquí viven juntas las apariciones en prensa y los casos de la firma que
 * tuvieron repercusión pública. Antes eran dos secciones —"En los medios" y
 * "Procesos que trascendieron"— que contaban lo mismo de dos maneras; se
 * unificaron a pedido del cliente.
 *
 * Sustituye el bloque de marcas de la plantilla de referencia. Cada ítem puede
 * tener, en este orden de prioridad:
 *   - `video` : ruta a un .mp4 en /assets/prensa/ (lo genera `npm run assets`
 *               desde la carpeta PRENSA). Abre el reproductor en un modal.
 *   - `href`  : enlace a la nota original (abre en pestaña nueva).
 *   - `image` : recorte o logo del medio; abre un lightbox con el recorte.
 * Si no hay ninguno, se muestra solo el nombre del medio compuesto, que se ve
 * ordenado y evita logotipos de baja resolución.
 *
 * `poster` es la ruta base de la portada del video, sin sufijo ni extensión.
 */

export const prensa = [
  {
    id: 'conducta-delictiva',
    outlet: 'Conducta Delictiva',
    headline: 'Entrevista al socio fundador de Emmporio Jurídico', // TODO: título real del episodio
    date: '2026-08-31', // TODO: confirmar la fecha de emisión
    format: 'Pódcast',
    // El episodio está en YouTube, así que se reproduce desde ahí en vez de
    // servir el .mp4 desde el hosting: YouTube ajusta la calidad a la conexión
    // de cada visitante y no consume el ancho de banda contratado.
    youtubeId: 'Mwaf7PNsIFM',
    // Portada propia: se prefiere a la miniatura que sirve YouTube, que llega
    // desaturada. Es la imagen a color que envió el Dr. Becerra.
    poster: '/assets/casos/muneca-condena-37-anos',
    posterAlt:
      'El socio fundador de Emmporio Jurídico durante la entrevista en el pódcast Conducta Delictiva',
    href: 'https://www.youtube.com/watch?v=Mwaf7PNsIFM',
    image: null,
  },
  // ---------------------------------------------------------------- casos
  // Procesos con repercusión pública. La pieza gráfica lleva el título
  // incrustado y se generó con `fit: contain` sobre el fondo del sitio, así
  // que se puede mostrar entera sin que el recorte se coma el titular.
  {
    id: 'cn2',
    outlet: 'Caso de la firma',
    headline: 'Una muñeca cambió mi condena de 37 años',
    format: 'Caso',
    date: null,
    summary:
      'La evidencia demostrativa transforma una defensa compleja en una estrategia clara, persuasiva y orientada al éxito.',
    body: [
      'Asumimos la defensa integral de Guillermo Garzón en uno de los casos más complejos que hemos enfrentado, marcado por una fuerte carga mediática y por una acusación de homicidio agravado.',
      'La defensa exigió un estudio profundo de la evidencia médica, biológica y forense, incluyendo necropsia, traumatología, fisiopatología, evolución de lesiones, hallazgos de laboratorio y reconstrucción de la mecánica de los hechos.',
      'A través del análisis técnico de la prueba, la teoría del delito y la investigación defensiva, logramos demostrar que no existió intención homicida y que los hechos debían ser comprendidos desde una conducta imprudente ocurrida durante un intento de auxilio.',
      'Un caso de alta complejidad. Ciencia, derecho y estrategia para transformar la interpretación de la evidencia y alcanzar una decisión favorable.',
    ],
    image: '/assets/casos/muneca-condena-37-anos',
    imageAlt:
      'Portada del caso en el que una muñeca cambió una condena de 37 años',
    // Sin `duration`: la portada ya trae el 1:08:40 incrustado abajo a la
    // derecha y el badge de la tarjeta lo repetía justo encima.
    // TODO: enlace al video original. Con `href` la tarjeta lo abre en una
    // pestaña nueva en vez de mostrar solo la pieza.
    href: null,
  },
  {
    id: 'cn3',
    outlet: 'Caso de la firma',
    headline: 'Caso fallecidos Metro de Medellín',
    format: 'Caso',
    date: null,
    // `summary` es lo que se lee en la tarjeta; `body` es el relato completo,
    // que solo aparece al abrir el caso.
    summary:
      'Representamos a las víctimas en el doloroso caso en el que fallecieron dos operarios del Sistema Metro de Medellín.',
    body: [
      'Representamos a las víctimas en el doloroso caso en el que fallecieron dos operarios del Sistema Metro de Medellín.',
      'Nuestra intervención comprendió la representación integral de las víctimas directas e indirectas, logrando su indemnización integral y su reconocimiento y representación dentro del proceso penal.',
      'Además, participamos desde la criminalística en la reconstrucción del accidente, trabajando junto con la Fiscalía y la Policía Judicial en el esclarecimiento técnico de los hechos.',
      'Un caso en el que la preparación jurídica, la investigación y el análisis criminalístico fueron determinantes para alcanzar nuestro propósito: verdad, justicia y reparación para las víctimas.',
    ],
    image: '/assets/casos/caso-metro-de-medellin',
    imageAlt: 'Pieza gráfica del caso de los fallecidos del Metro de Medellín',
    href: null,
  },
  {
    id: 'cn1',
    outlet: 'Caso de la firma',
    headline: 'Defensa penal de los implicados en un homicidio',
    format: 'Caso',
    date: null,
    summary:
      'Asumimos integralmente la defensa de dos personas injustamente vinculadas a un complejo caso de homicidio.',
    body: [
      'Asumimos integralmente la defensa de dos personas injustamente vinculadas a un complejo caso de homicidio.',
      'La defensa permitió evidenciar graves irregularidades probatorias y cuestionamientos sobre la incorporación y autenticidad de elementos de evidencia. A ello se sumó un intenso trabajo investigativo: análisis de bases de datos, interpretación de información de telecomunicaciones y estudio de evidencia biológica y genética.',
      'La investigación defensiva permitió reconstruir lo ocurrido, orientar el caso hacia quienes realmente estaban comprometidos con los hechos y demostrar la inocencia de nuestros representados.',
      'Dos inocentes vinculados. Un caso complejo. Una defensa construida desde la investigación, la ciencia y el derecho.',
    ],
    image: '/assets/casos/defensa-penal-homicidio',
    imageAlt:
      'Pieza gráfica del caso de defensa penal de los implicados en un homicidio, llevado por Emmporio Jurídico',
    href: null,
  },

  // Para agregar otra aparición en medios, copie el bloque de arriba. Los
  // campos que la sección usa, por orden de prioridad:
  //   youtubeId : id del video en YouTube. Abre el reproductor en un modal.
  //   video     : ruta a un .mp4 propio en /assets/prensa/. Mismo modal.
  //   href      : enlace a la nota original. Abre en pestaña nueva.
  //   image     : recorte de prensa. Abre un lightbox con la imagen.
  // Sin ninguno de esos, la tarjeta queda como ficha de texto: sirve para una
  // mención sin enlace, pero no deje datos de relleno a la vista.
];

/**
 * Miniatura de un video de YouTube. `maxresdefault` no existe en todos los
 * videos; `hqdefault` sí, y hace de respaldo si la primera no carga.
 */
export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const youtubeThumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Un ítem es video si trae un archivo propio o un id de YouTube. */
export const isVideoItem = (item) => Boolean(item?.video || item?.youtubeId);

/** Primer video disponible: lo reutiliza el hero para su modal. */
export const featuredVideo = prensa.find(isVideoItem) || null;
