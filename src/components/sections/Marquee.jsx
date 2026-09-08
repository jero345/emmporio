import { practiceAreas } from '../../data/practiceAreas.js';

/**
 * Cinta infinita con las áreas de práctica.
 * CSS puro: la lista se duplica y se desplaza un 50 %, así el bucle es
 * continuo sin JavaScript ni librerías.
 */
export function Marquee() {
  const items = practiceAreas.map((area) => area.title);

  return (
    <section aria-hidden="true" className="overflow-hidden border-y border-border bg-surface py-6">
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-2xl uppercase tracking-[0.12em] text-text/70 md:text-3xl">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-gold-gradient" />
          </span>
        ))}
      </div>
    </section>
  );
}

export default Marquee;
