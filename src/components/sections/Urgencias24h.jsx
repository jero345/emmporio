import { siteConfig } from '../../data/siteConfig.js';
import { Icon } from '../ui/Icon.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * Franja de urgencias penales, justo debajo del hero.
 *
 * Es la única parte del sitio sobre fondo dorado: una captura sin arte ni
 * fotografía, para que no compita con nada y se lea de una pasada. Cada
 * teléfono es un enlace `tel:` —en móvil marca directo, que es donde llega
 * casi siempre quien tiene una urgencia penal.
 *
 * La condición «solo casos penales» aparece dos veces a propósito: en el
 * titular y en la nota al pie. Anunciar 24 horas sin acotarlo generaría una
 * expectativa que la firma no atiende en las demás áreas.
 */
export function Urgencias24h() {
  const { urgencias } = siteConfig;

  return (
    <section
      aria-label="Atención 24 horas para casos penales"
      className="relative overflow-hidden bg-gold-gradient"
    >
      {/* Pulso detrás del icono: sugiere línea activa sin llegar a parpadear. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="container-site relative py-10 md:py-12">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <Reveal className="flex flex-col items-center gap-5 sm:flex-row sm:items-center lg:gap-6">
            <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink/90 text-gold">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-ink/25 [animation-duration:2.5s]"
              />
              <Icon name="PhoneCall" size={28} className="relative" />
            </span>

            <span>
              <span className="block font-display text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-ink sm:text-3xl lg:text-4xl">
                {urgencias.eyebrow}
              </span>
              <span className="mt-1.5 block text-sm font-semibold uppercase tracking-[0.2em] text-ink/75 sm:text-base">
                {urgencias.title}
              </span>
              <span className="mt-3 block max-w-md text-sm leading-relaxed text-ink/80 sm:text-base">
                {urgencias.text}
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.12} className="w-full sm:w-auto">
            <ul className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {urgencias.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="flex items-center justify-center gap-3 rounded-xl bg-ink px-6 py-4 text-lg font-semibold text-bone shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:text-gold sm:text-xl"
                  >
                    <Icon name="Phone" size={20} className="shrink-0 text-gold" />
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 border-t border-ink/15 pt-5 text-center text-xs leading-relaxed text-ink/70 lg:text-left">
            {urgencias.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Urgencias24h;
