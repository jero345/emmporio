import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';

/**
 * Code splitting por ruta: cada página es un chunk aparte y el Home no
 * arrastra el peso de las páginas internas.
 */
const Home = lazy(() => import('./pages/Home.jsx'));
const Nosotros = lazy(() => import('./pages/Nosotros.jsx'));
const AreasDePractica = lazy(() => import('./pages/AreasDePractica.jsx'));
const AreaDetalle = lazy(() => import('./pages/AreaDetalle.jsx'));
const Abogados = lazy(() => import('./pages/Abogados.jsx'));
const Casos = lazy(() => import('./pages/Casos.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogArticulo = lazy(() => import('./pages/BlogArticulo.jsx'));
const Contacto = lazy(() => import('./pages/Contacto.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const PoliticaDeDatos = lazy(() =>
  import('./pages/Legal.jsx').then((module) => ({ default: module.PoliticaDeDatos }))
);
const AvisoLegal = lazy(() =>
  import('./pages/Legal.jsx').then((module) => ({ default: module.AvisoLegal }))
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/nosotros', element: <Nosotros /> },
      { path: '/areas-de-practica', element: <AreasDePractica /> },
      { path: '/areas-de-practica/:slug', element: <AreaDetalle /> },
      { path: '/abogados', element: <Abogados /> },
      { path: '/casos', element: <Casos /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogArticulo /> },
      { path: '/contacto', element: <Contacto /> },
      { path: '/politica-de-datos', element: <PoliticaDeDatos /> },
      { path: '/aviso-legal', element: <AvisoLegal /> },
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
]);

export default router;
