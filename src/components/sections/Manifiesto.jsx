import { manifiesto } from '../../data/home.js';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * Declaración de la firma, en una franja propia entre el hero y «Sobre la
 * firma». Sin foto ni botones: lo único que hay que leer aquí es la frase,
 * así que el bloque se sostiene solo con la tipografía y el filete dorado.
 */
export function Manifiesto() {
  return (
    <section
      aria-label="Declaración de la firma"
      className="border-b border-border bg-surface py-16 md:py-20"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mx-auto block h-px w-16 bg-gold-gradient" aria-hidden="true" />

          <p className="mt-8 font-display text-h3 leading-snug text-text text-balance md:text-h2">
            {manifiesto.lead}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted">{manifiesto.body}</p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft sm:text-sm sm:tracking-[0.26em]">
            {manifiesto.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Manifiesto;
