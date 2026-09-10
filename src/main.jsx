import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { routes } from './routes.jsx';
import './index.css';

// El router se crea aquí y no en `routes.jsx`: necesita `document`, y ese
// módulo lo comparte el generador de HTML estático, que corre en Node.
const router = createBrowserRouter(routes);

const container = document.getElementById('root');

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
