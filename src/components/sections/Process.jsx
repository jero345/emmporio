import { processSteps } from '../../data/home.js';
import { Icon } from '../ui/Icon.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/**
 * Cuatro pasos unidos por una línea punteada: horizontal en desktop y
 * vertical en móvil.
 */
export function Process() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow={processSteps.eyebrow}
          title={processSteps.title}
          align="center"
          text="Un proceso claro desde la primera llamada hasta el cierre del caso."
        />

        <div className="relative mt-16">
          {/* Conector horizontal (desktop). */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-9 hidden border-t border-dashed border-gold/30 lg:block"
          />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.number}
                delay={index * 0.12}
                className="relative flex gap-6 lg:block lg:text-center"
              >
                {/* Conector vertical (móvil). */}
                {index < processSteps.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-9 top-[4.75rem] h-[calc(100%+1.5rem)] border-l border-dashed border-gold/30 lg:hidden"
                  />
                )}

                <div className="relative shrink-0 lg:mx-auto">
                  <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border border-gold/30 bg-base text-gold">
                    <Icon name={step.icon} size={28} />
                  </span>
                  <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-gold-gradient font-display text-sm font-semibold text-ink">
                    {step.number}
                  </span>
                </div>

                <div className="lg:mt-7">
                  <h3 className="font-display text-h3 text-text">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Process;
