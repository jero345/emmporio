import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { testimonials } from '../../data/testimonials.js';
import { Icon } from '../ui/Icon.jsx';
import { Stars } from '../ui/Stars.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** Slider de testimonios: 3 visibles en desktop, 1 en móvil. */
export function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen quienes ya pasaron por esto"
          align="center"
        />

        <div className="mt-14">
          <Swiper
            modules={[A11y, Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            a11y={{
              prevSlideMessage: 'Testimonio anterior',
              nextSlideMessage: 'Testimonio siguiente',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <figure className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
                  <Icon
                    name="Quote"
                    size={44}
                    className="absolute right-6 top-6 fill-gold/10 text-gold/10"
                  />

                  <Stars rating={item.rating} />

                  <blockquote className="relative mt-5 flex-1 leading-relaxed text-muted">
                    <p>«{item.quote}»</p>
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        width={52}
                        height={52}
                        loading="lazy"
                        className="h-13 w-13 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-lg font-semibold text-ink"
                      >
                        {item.name.charAt(0)}
                      </span>
                    )}
                    <span>
                      <span className="block font-display text-lg text-text">{item.name}</span>
                      <span className="block text-sm text-muted">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
