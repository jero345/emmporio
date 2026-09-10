import { Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';

/**
 * Definición de rutas compartida por el navegador y por el prerenderizado.
 *
 * Cada página se carga con el `lazy` de react-router y no con `React.lazy`:
 * hace el mismo reparto en trozos —el Home no arrastra el peso de las
 * páginas internas— pero además el generador de HTML estático sabe resolverlo
 * antes de renderizar, cosa que `React.lazy` no permite fuera del navegador.
 */
export const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', lazy: async () => ({ Component: (await import('./pages/Home.jsx')).default }) },
      {
        path: '/nosotros',
        lazy: async () => ({ Component: (await import('./pages/Nosotros.jsx')).default }),
      },
      {
        path: '/areas-de-practica',
        lazy: async () => ({ Component: (await import('./pages/AreasDePractica.jsx')).default }),
      },
      {
        path: '/areas-de-practica/:slug',
        lazy: async () => ({ Component: (await import('./pages/AreaDetalle.jsx')).default }),
      },
      {
        path: '/abogados',
        lazy: async () => ({ Component: (await import('./pages/Abogados.jsx')).default }),
      },
      {
        path: '/casos',
        lazy: async () => ({ Component: (await import('./pages/Casos.jsx')).default }),
      },
      {
        path: '/blog',
        lazy: async () => ({ Component: (await import('./pages/Blog.jsx')).default }),
      },
      {
        path: '/blog/:slug',
        lazy: async () => ({ Component: (await import('./pages/BlogArticulo.jsx')).default }),
      },
      {
        path: '/contacto',
        lazy: async () => ({ Component: (await import('./pages/Contacto.jsx')).default }),
      },
      {
        path: '/politica-de-datos',
        lazy: async () => ({
          Component: (await import('./pages/Legal.jsx')).PoliticaDeDatos,
        }),
      },
      {
        path: '/aviso-legal',
        lazy: async () => ({ Component: (await import('./pages/Legal.jsx')).AvisoLegal }),
      },
      {
        path: '/404',
        lazy: async () => ({ Component: (await import('./pages/NotFound.jsx')).default }),
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];

export default routes;
