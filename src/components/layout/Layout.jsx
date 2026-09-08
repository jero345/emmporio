import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { ScrollToTop } from './ScrollToTop.jsx';
import { FloatingActions } from './FloatingActions.jsx';
import { Icon } from '../ui/Icon.jsx';

/** Estado de carga de las rutas divididas con React.lazy. */
function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Icon name="Loader2" size={32} className="animate-spin text-gold" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

export function Layout() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="contenido">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default Layout;
