import { useState } from 'react';
import { anonymizationNotice, resultados } from '../../data/resultados.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Modal } from '../ui/Modal.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Resultados y fallos.
 *
 * La imagen de la tarjeta es una ilustración del tipo de proceso, nunca un
 * documento. Al abrir la ficha se muestra el recorte del apartado resolutivo
 * de la providencia —con los datos personales tapados—, que es lo único del
 * expediente que se publica: el PDF completo no se enlaza en ninguna parte.
 */
export function ResultCard({ result, onOpen, index = 0 }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <button
        type="button"
        onClick={() => onOpen(result)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors duration-300 hover:border-gold"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Photo
            base={result.image}
            alt={result.imageAlt}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-card-overlay" aria-hidden="true" />
          <span className="absolute left-5 top-4 rounded-full border border-gold/40 bg-base/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-goldSoft">
            {result.area}
          </span>
          <span className="absolute bottom-4 left-5 font-display text-3xl text-white/25">
            {result.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{result.process}</p>
          <h3 className="mt-3 flex-1 font-display text-h3 leading-snug text-text transition-colors group-hover:text-goldSoft">
            {result.result}
          </h3>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Icon name="Gavel" size={15} className="text-gold" />
            {result.court}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft">
            {result.resuelve ? 'Ver el RESUELVE' : 'Ver el resumen'}
            <Icon
              name="ArrowRight"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export function CaseResults({ items = resultados, showHeading = true, showAll = false }) {
  const [selected, setSelected] = useState(null);
  const visible = showAll ? items : items.slice(0, 6);

  return (
    <section className="section bg-surface/40">
      <div className="container-site">
        {showHeading && (
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Resultados y fallos"
              title="Decisiones obtenidas por la firma"
              text="Una muestra de procesos con resultado favorable. De cada decisión se muestra el apartado resolutivo, con los datos personales suprimidos."
            />
            {!showAll && (
              <Reveal delay={0.15}>
                <Button to="/casos" variant="secondary" icon="ArrowRight">
                  Ver todos los casos
                </Button>
              </Reveal>
            )}
          </div>
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((result, index) => (
            <ResultCard key={result.id} result={result} index={index} onOpen={setSelected} />
          ))}
        </div>

        <p className="mt-12 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
          {anonymizationNotice}
        </p>
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.result}
        size="lg"
      >
        {selected && (
          <>
            {/*
              El recorte del RESUELVE va primero y sobre fondo claro: es una
              hoja escaneada, y sobre el fondo oscuro del sitio se leeria peor.
              Con `overflow-auto` la providencia larga se puede recorrer sin
              que el modal crezca fuera de la pantalla.
            */}
            {selected.resuelve && (
              <figure className="max-h-[65vh] overflow-auto bg-white">
                <Photo
                  base={selected.resuelve}
                  alt={selected.resuelveAlt}
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  className="w-full"
                />
              </figure>
            )}

            <div className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
                {selected.area} · {selected.year}
              </p>
              <h2 className="mt-4 font-display text-h3 leading-snug text-text">{selected.result}</h2>

              <dl className="mt-6 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">Tipo de proceso</dt>
                  <dd className="mt-1.5 text-text">{selected.process}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">Despacho</dt>
                  <dd className="mt-1.5 text-text">{selected.court}</dd>
                </div>
              </dl>

              <p className="mt-6 leading-relaxed text-muted">{selected.summary}</p>

              <p className="mt-6 text-xs leading-relaxed text-muted">{anonymizationNotice}</p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

export default CaseResults;
