import { faqSection } from '../../data/home.js';
import { faqs } from '../../data/faqs.js';
import { Accordion } from '../ui/Accordion.jsx';
import { Button } from '../ui/Button.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Sección clara de contraste: fondo `bone` con texto `ink`, como pide el
 * sistema de diseño para una o dos secciones puntuales.
 */
export function FAQ() {
  return (
    <section className="section bg-bone">
      <div className="container-site grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="overflow-hidden rounded-2xl lg:sticky lg:top-28">
          <Photo
            base={faqSection.image.src}
            alt={faqSection.image.alt}
            sizes="(min-width: 1024px) 45vw, 90vw"
            ratio={4 / 5}
            className="h-full w-full object-cover"
          />
        </Reveal>

        <div>
          <SectionHeading eyebrow={faqSection.eyebrow} title={faqSection.title} light />

          <div className="mt-8">
            <Accordion items={faqs} light />
          </div>

          <Reveal delay={0.2} className="mt-10 rounded-2xl border border-ink/10 bg-ink/[0.04] p-6">
            <p className="font-display text-lg text-ink">¿Su pregunta no está aquí?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Escríbanos y le respondemos sin compromiso. Le confirmamos el valor de la consulta al agendarla.
            </p>
            <Button to="/contacto" className="mt-5" icon="ArrowRight">
              Hacer una consulta
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
