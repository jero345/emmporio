/**
 * Lista plana de rutas del sitio.
 *
 * La consume `vite.config.js` para generar el sitemap, así que este archivo
 * no puede importar nada que dependa del navegador ni de `import.meta.env`.
 * Al agregar un área, un abogado o un artículo, la ruta entra sola.
 */
import { practiceAreas } from './practiceAreas.js';
import { attorneys } from './attorneys.js';
import { posts } from './posts.js';

// La raíz la agrega el propio plugin de sitemap, por eso no está en la lista.
const staticPaths = [
  '/nosotros',
  '/areas-de-practica',
  '/abogados',
  '/casos',
  '/contacto',
  '/politica-de-datos',
  '/aviso-legal',
];

export const routePaths = [
  ...staticPaths,
  ...practiceAreas.map((area) => `/areas-de-practica/${area.slug}`),
  ...attorneys.map((attorney) => `/abogados/${attorney.slug}`),
  // El blog solo entra al sitemap cuando hay artículos publicados.
  ...(posts.length > 0 ? ['/blog', ...posts.map((post) => `/blog/${post.slug}`)] : []),
];
