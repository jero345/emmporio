import { Seo } from '../components/Seo.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { practiceAreas } from '../data/practiceAreas.js';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Página no encontrada"
        description="La página que busca no existe o fue movida."
        path="/404"
        noIndex
      />

      <section className="section">
        <div className="container-site max-w-2xl text-center">
          <p className="font-display text-[clamp(5rem,18vw,10rem)] leading-none text-goldSoft/25">
            404
          </p>
          <h1 className="mt-2 text-h2">Esta página no existe</h1>
          <p className="mt-5 leading-relaxed text-muted">
            El enlace puede haber cambiado o la página fue retirada. Desde aquí puede volver al
            inicio o ir directamente a lo que buscaba.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button to="/" icon="ArrowRight">
              Volver al inicio
            </Button>
            <Button to="/contacto" variant="secondary">
              Contactar a la firma
            </Button>
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-goldSoft">
              Áreas de práctica
            </h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/areas-de-practica/${area.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-goldSoft"
                  >
                    <Icon name={area.icon} size={15} className="text-gold" />
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
