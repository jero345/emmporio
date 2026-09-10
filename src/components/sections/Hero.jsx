import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { heroSlides } from '../../data/home.js';
import { siteConfig } from '../../data/siteConfig.js';
import { featuredVideo } from '../../data/prensa.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Modal } from '../ui/Modal.jsx';
import { Photo } from '../ui/Photo.jsx';
import { VideoPlayer } from '../ui/VideoPlayer.jsx';

/**
 * Slider principal: fade entre slides y Ken Burns sutil sobre la fotografía.
 * El botón secundario abre el video institucional en un modal.
 */
export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [active, setActive] = useState(0);

  // El boton de video solo aparece si hay algo que reproducir. Por orden: el
  // video institucional de `siteConfig`, si se configura, y si no la pieza
  // destacada de `prensa.js`, sea un archivo propio o un video de YouTube.
  const { label } = siteConfig.heroVideo;
  const youtubeId = siteConfig.heroVideo.youtubeId || featuredVideo?.youtubeId || null;
  const hasVideo = Boolean(youtubeId || featuredVideo?.video);

  return (
    <section aria-label="Presentación de la firma" className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-[min(88vh,760px)] min-h-[560px] w-full"
      >
        {heroSlides.map((slide, index) => {
          // Solo el primer slide lleva el <h1> de la pagina: los demas repiten
          // el mismo tratamiento visual con una etiqueta neutra.
          const Title = index === 0 ? 'h1' : 'p';

          return (
            <SwiperSlide key={slide.id} className="relative overflow-hidden">
              <div className="absolute inset-0">
                <Photo
                  base={slide.image}
                  alt={slide.imageAlt}
                  priority={index === 0}
                  sizes="100vw"
                  className={[
                    'h-full w-full object-cover',
                    // Encuadre del recorte: por defecto centrado, salvo que el
                    // slide indique dónde está el motivo de la foto.
                    slide.imagePosition ?? '',
                    active === index ? 'animate-ken-burns [animation-duration:9s]' : '',
                  ].join(' ')}
                />
                <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />
              </div>

              {/*
                Retrato del slide, si lo hay: ocupa la mitad derecha y se funde
                con el fondo por la izquierda y por abajo, para que no se lea
                como una foto pegada encima. Se oculta en móvil, donde el texto
                necesita todo el ancho.
              */}
              {slide.portrait && (
                <div className="absolute inset-y-0 right-0 hidden w-[54%] md:block lg:w-[48%]">
                  <Photo
                    base={slide.portrait}
                    alt={slide.portraitAlt}
                    variant="portrait"
                    priority={index === 0}
                    sizes="(min-width: 1024px) 48vw, 54vw"
                    // La foto se difumina con una máscara sobre sí misma, no con
                    // un degradado opaco encima: así no queda un canto visible
                    // contra la fotografía de fondo.
                    className="h-full w-full object-cover object-top [mask-image:linear-gradient(to_right,transparent_0%,black_38%)] [filter:grayscale(0.3)_contrast(1.05)_brightness(0.9)]"
                  />
                </div>
              )}

              {/* Sombra inferior a todo el ancho: asienta el slide sobre la
                  siguiente sección y no genera canto con la capa del retrato. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base to-transparent"
              />

              <div className="container-site relative flex h-full items-center">
                <div className={slide.wide ? 'max-w-4xl py-20' : 'max-w-2xl py-20'}>
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-goldSoft">
                    <span className="h-px w-10 bg-gold-gradient" aria-hidden="true" />
                    {slide.eyebrow}
                  </p>

                  <Title
                    className={[
                      'mt-6 font-display text-balance',
                      slide.titleClassName || 'text-h1',
                    ].join(' ')}
                  >
                    <span className="block">{slide.titleTop}</span>
                    <span className="block text-goldSoft">{slide.titleBottom}</span>
                  </Title>

                  {slide.text && (
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{slide.text}</p>
                  )}

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Button to="/contacto" size="lg" icon="ArrowRight">
                      Agendar consulta
                    </Button>

                    {hasVideo && (
                      <button
                        type="button"
                        onClick={() => setVideoOpen(true)}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-text transition-colors hover:text-goldSoft"
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                          <Icon name="Play" size={20} className="ml-0.5 fill-current" />
                        </span>
                        {label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={youtubeId ? 'Video institucional' : featuredVideo?.headline}
        size="lg"
      >
        {youtubeId ? (
          <div className="aspect-video w-full bg-base">
            {videoOpen && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={`Video institucional de ${siteConfig.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </div>
        ) : (
          featuredVideo && (
            <VideoPlayer
              src={featuredVideo.video}
              poster={featuredVideo.poster}
              posterAlt={featuredVideo.posterAlt}
              title={featuredVideo.headline}
              duration={featuredVideo.duration}
            />
          )
        )}
      </Modal>
    </section>
  );
}

export default Hero;
