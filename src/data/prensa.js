/**
 * Sección "En los medios".
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
    posterAlt:
      'El socio fundador de Emmporio Jurídico durante la entrevista en el pódcast Conducta Delictiva',
    duration: '17:05',
    href: 'https://www.youtube.com/watch?v=Mwaf7PNsIFM',
    image: null,
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
