/**
 * Genera el HTML de cada página ya armado (prerenderizado).
 *
 *   npm run build
 *
 * El sitio es una aplicación de React que normalmente se monta en el
 * navegador: el servidor entregaba un documento vacío y el contenido aparecía
 * después, al ejecutarse el JavaScript. Un buscador que no ejecute JS —o que
 * lo deje para una segunda pasada, que es lo que hace Google con los sitios
 * nuevos— no veía absolutamente nada.
 *
 * Este paso corre después del build normal: renderiza cada ruta en Node y
 * escribe el resultado dentro del `index.html` de esa ruta, con sus etiquetas
 * de título, descripción, canonical y los datos estructurados de la firma.
 * En el navegador la aplicación sigue funcionando igual: React toma el HTML
 * ya pintado y sigue desde ahí.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const { routePaths } = await import('../src/data/routePaths.js');
const { render } = await import(pathToFileUrl(SSR));

function pathToFileUrl(file) {
  return new URL(`file://${file.replace(/\\/g, '/')}`).href;
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

/** El `<title>` del template se sustituye por el que declara cada página. */
const TITLE_TAG = /<title>[\s\S]*?<\/title>/;

/** Etiquetas que `react-helmet-async` sabe volcar a texto. */
const HELMET_PARTS = ['title', 'meta', 'link', 'script'];

const routes = ['/', ...routePaths, '/404'];

let written = 0;
const failed = [];

for (const route of routes) {
  try {
    const { html, helmet } = await render(route);

    const head = HELMET_PARTS.map((part) => helmet?.[part]?.toString() || '')
      .filter(Boolean)
      .join('\n    ');

    const page = template
      .replace(TITLE_TAG, head)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // La raíz va a `dist/index.html`; el resto a `dist/<ruta>/index.html`,
    // que es lo que sirve cualquier hosting estático para esa dirección.
    const out =
      route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');

    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page, 'utf8');
    written += 1;

    // Copia en la raíz: el hosting la sirve con código 404 ante una dirección
    // que no existe, que es lo que un buscador necesita ver para descartarla.
    if (route === '/404') fs.writeFileSync(path.join(DIST, '404.html'), page, 'utf8');
  } catch (error) {
    failed.push({ route, message: error.message });
  }
}

console.log(`\n  ${written} páginas prerenderizadas.`);

if (failed.length) {
  console.error(`\n  ${failed.length} fallaron:`);
  for (const { route, message } of failed) console.error(`    ${route} — ${message}`);
  // Un fallo aquí deja páginas sin contenido para los buscadores, que es
  // justamente lo que este paso viene a evitar: mejor romper el build.
  process.exit(1);
}

fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
