import { whyChooseUs } from '../../data/home.js';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** Split: cuatro razones a la izquierda, foto con cinta vertical a la derecha. */
export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow={whyChooseUs.eyebrow} title={whyChooseUs.title} />

          <ul className="mt-10 space-y-8">
            {whyChooseUs.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08} className="flex gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/[0.07] text-gold">
                  <Icon name={item.icon} size={24} />
                </span>
                <span>
                  <span className="block font-display text-h3 text-text">{item.title}</span>
                  <span className="mt-2 block leading-relaxed text-muted">{item.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="relative lg:order-last">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/5">
            <Photo
              base={whyChooseUs.image.src}
              alt={whyChooseUs.image.alt}
              sizes="(min-width: 1024px) 45vw, 90vw"
              ratio={4 / 5}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Cinta vertical dorada con los años de experiencia. */}
          <div className="absolute -left-5 top-10 hidden bg-gold-gradient px-4 py-6 sm:block">
            <span
              className="block font-display text-lg font-semibold uppercase tracking-[0.18em] text-ink"
              style={{ writingMode: 'vertical-rl' }}
            >
              {whyChooseUs.ribbon}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyChooseUs;
