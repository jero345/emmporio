/**
 * Artículos del blog.
 *
 * Se entrega VACÍO a propósito: mientras no haya artículos reales, la
 * sección del Home no se renderiza, el enlace desaparece del menú y la ruta
 * /blog queda fuera del sitemap. Publicar un blog vacío perjudica el SEO y
 * la credibilidad de la firma.
 *
 * Para publicar el primer artículo basta con agregar un objeto con esta
 * forma; todo lo demás (menú, Home, sitemap, JSON-LD) se activa solo:
 *
 * {
 *   slug: 'que-hacer-si-lo-capturan',
 *   title: 'Qué hacer en las primeras 36 horas si lo capturan',
 *   excerpt: 'Los términos corren desde el primer minuto...',
 *   category: 'Derecho Penal',
 *   date: '2026-03-14',                       // ISO, se formatea solo
 *   author: 'edward-becerra',                 // slug de src/data/attorneys.js
 *   image: '/assets/instalaciones/sala-juntas-ventanal',
 *   imageAlt: 'Sala de juntas de la firma',
 *   readingTime: 6,
 *   body: [
 *     'Primer párrafo del artículo.',
 *     'Segundo párrafo del artículo.',
 *   ],
 * }
 */

// TODO: reemplazar con los artículos reales del cliente.
export const posts = [];

export const hasPosts = posts.length > 0;

export const getPost = (slug) => posts.find((post) => post.slug === slug);

export const postCategories = [...new Set(posts.map((post) => post.category))];
