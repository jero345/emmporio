import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { practiceAreas } from '../../data/practiceAreas.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** Tarjeta de área reutilizada por el Home y por /areas-de-practica. */
export function PracticeAreaCard({ area, index }) {
  return (
    <Link
      to={`/areas-de-practica/${area.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-gold"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          base={area.image}
          alt={area.imageAlt}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-card-overlay" aria-hidden="true" />

        <span
          aria-hidden="true"
          className="absolute right-5 top-4 font-display text-6xl leading-none text-white/10 transition-colors duration-300 group-hover:text-gold/60"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute bottom-4 left-5 grid h-12 w-12 place-items-center rounded-xl bg-gold text-ink">
          <Icon name={area.icon} size={22} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-h3 text-text transition-colors duration-300 group-hover:text-goldSoft">
          {area.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{area.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft">
          Ver el área
          <Icon
            name="ArrowRight"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

/** Flechas del carrusel. Swiper les pone `swiper-button-disabled` al llegar al tope. */
const arrowClasses = [
  'grid h-11 w-11 place-items-center rounded-xl border border-border text-text',
  'transition-colors hover:border-gold hover:text-goldSoft',
  '[&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30',
].join(' ');

export function PracticeAreas() {
  // Swiper necesita los nodos de las flechas antes de inicializarse; por eso
  // se le pasan tambien en `onBeforeInit`, cuando los refs ya estan resueltos.
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="section bg-surface/40">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Áreas de práctica"
            title="En qué podemos representarlo"
            text="Once frentes de trabajo con abogados dedicados a cada uno. Si su asunto toca más de una materia, el equipo se coordina internamente."
          />
          <Reveal delay={0.15} className="flex items-center gap-3">
            {/* En móvil sobra: ahí se navega deslizando y con los puntos. */}
            <button ref={prevRef} type="button" aria-label="Área anterior" className={`hidden md:grid ${arrowClasses}`}>
              <Icon name="ArrowLeft" size={18} />
            </button>
            <button ref={nextRef} type="button" aria-label="Área siguiente" className={`hidden md:grid ${arrowClasses}`}>
              <Icon name="ArrowRight" size={18} />
            </button>
            <Button to="/areas-de-practica" variant="secondary" icon="ArrowRight">
              Ver todas las áreas
            </Button>
          </Reveal>
        </div>

        <Swiper
          modules={[A11y, Keyboard, Navigation, Pagination]}
          spaceBetween={16}
          // El 1,15 de móvil deja asomar la tarjeta siguiente: es lo que
          // indica que la fila se desliza, sin necesidad de un texto extra.
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          grabCursor
          keyboard={{ enabled: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          a11y={{
            prevSlideMessage: 'Área anterior',
            nextSlideMessage: 'Área siguiente',
            paginationBulletMessage: 'Ir al área {{index}}',
          }}
          className="mt-14 !pb-12"
        >
          {practiceAreas.map((area, index) => (
            // `h-auto` deja que las tarjetas se estiren a la altura del slide
            // más alto en vez de quedar cada una con su propio alto.
            <SwiperSlide key={area.slug} className="h-auto">
              <PracticeAreaCard area={area} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default PracticeAreas;
