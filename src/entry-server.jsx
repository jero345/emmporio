import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { routes } from './routes.jsx';

/**
 * Punto de entrada del prerenderizado.
 *
 * `scripts/prerender.mjs` llama a `render()` una vez por ruta y guarda el
 * resultado como HTML ya armado. El sitio sigue siendo la misma aplicación de
 * React en el navegador: esto solo adelanta el primer pintado para que quien
 * lea la página sin ejecutar JavaScript —los buscadores, sobre todo— reciba
 * el contenido y no un documento vacío.
 */
export async function render(url) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${url}`));

  if (context instanceof Response) {
    throw new Error(`La ruta ${url} devolvió una redirección en vez de una página.`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  // `helmetContext` se llena durante el render con las etiquetas que cada
  // página declara en su componente `<Seo>`.
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider router={router} context={context} nonce={undefined} />
      </HelmetProvider>
    </StrictMode>
  );

  return { html, helmet: helmetContext.helmet };
}

export default render;
