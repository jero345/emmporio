import { useState } from 'react';
import {
  isVideoItem,
  prensa,
  youtubeThumb,
  youtubeThumbFallback,
} from '../../data/prensa.js';
import { Icon } from '../ui/Icon.jsx';
import { Modal } from '../ui/Modal.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
import { VideoPlayer } from '../ui/VideoPlayer.jsx';

const formatDate = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString('es-CO', { year: 'numeric', month: 'long' })
    : null;

const CARD =
  'group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors duration-300 hover:border-gold';

/**
 * Miniatura con badge de reproducción, para los ítems que son video.
 *
 * Si el ítem trae `poster` propio se usa ese, aunque sea un video de YouTube:
 * la portada que sirve YouTube viene con su propio tratamiento y no siempre
 * es la que la firma quiere mostrar.
 */
function VideoThumb({ item }) {
  const thumbClasses =
    'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105';

  return (
    <div className="relative aspect-video overflow-hidden">
      {item.youtubeId && !item.poster ? (
        // La portada la sirve YouTube. Si el video no tiene versión en alta
        // resolución, se cae a `hqdefault`, que existe siempre.
        <img
          src={youtubeThumb(item.youtubeId)}
          alt={item.posterAlt}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            const fallback = youtubeThumbFallback(item.youtubeId);
            if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback;
          }}
          className={thumbClasses}
        />
      ) : (
        <Photo
          base={item.poster}
          alt={item.posterAlt}
          sizes="(min-width: 1024px) 40vw, 90vw"
          ratio={16 / 9}
          className={thumbClasses}
        />
      )}
      {/* Velo muy leve: solo lo justo para que el botón de play despegue de
          la fotografía sin apagarle el color a la portada. */}
      <span
        className="absolute inset-0 bg-base/15 transition-colors group-hover:bg-base/5"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:scale-110"
      >
        <Icon name="Play" size={24} className="ml-1 fill-current" />
      </span>
      {item.duration && (
        <span className="absolute bottom-3 right-3 rounded-full bg-base/80 px-2.5 py-1 text-xs font-semibold text-text">
          {item.duration}
        </span>
      )}
    </div>
  );
}

/** Cuerpo textual común a todas las tarjetas. */
function CardBody({ item, action }) {
  return (
    <div className="flex flex-1 flex-col p-6">
      <span className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
        {item.format && (
          <>
            <span className="rounded-full border border-gold/40 px-2.5 py-0.5">{item.format}</span>
            <span className="h-px w-4 bg-gold-gradient" aria-hidden="true" />
          </>
        )}
        {item.outlet}
      </span>

      {/*
        El `flex-1` se lo lleva el último bloque de texto de la tarjeta: así el
        enlace de abajo queda alineado entre tarjetas y no aparece un hueco
        entre el titular y el resumen.
      */}
      <span
        className={[
          'mt-3 block font-display text-lg leading-snug text-text transition-colors group-hover:text-goldSoft',
          item.summary ? '' : 'flex-1',
        ].join(' ')}
      >
        {item.headline}
      </span>

      {item.summary && (
        <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{item.summary}</span>
      )}

      {formatDate(item.date) && (
        <span className="mt-3 block text-sm text-muted">{formatDate(item.date)}</span>
      )}

      {action && (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft">
          {action.label}
          <Icon name={action.icon} size={15} />
        </span>
      )}
    </div>
  );
}

/**
 * "En los medios": el ítem abre el video en un modal, enlaza a la nota
 * original o muestra el recorte en un lightbox, según lo que traiga el dato.
 * Si no trae ninguno, queda como una ficha de texto, que se ve ordenada y
 * evita un logotipo pixelado.
 */
export function Prensa() {
  const [modalItem, setModalItem] = useState(null);

  if (!prensa.length) return null;

  const solo = prensa.length === 1;

  return (
    <section className="section border-y border-border bg-surface/40">
      <div className="container-site">
        <SectionHeading
          eyebrow="Medios y casos"
          title="La firma en la prensa"
          align="center"
          text="Entrevistas, cubrimientos y procesos de la firma que tuvieron repercusión pública, contados sin exponer la identidad de quienes confiaron su defensa."
        />

        {/*
          Con una sola aparición no hay rejilla que armar: se centra a un ancho
          cómodo en vez de dejar dos columnas vacías al lado.
        */}
        <ul
          className={
            solo ? 'mx-auto mt-14 max-w-3xl' : 'mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {prensa.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(index % 3) * 0.1}
              // El video es la pieza destacada: ocupa dos columnas.
              className={!solo && isVideoItem(item) ? 'sm:col-span-2' : ''}
            >
              {isVideoItem(item) ? (
                <button type="button" onClick={() => setModalItem(item)} className={CARD}>
                  <VideoThumb item={item} />
                  <CardBody item={item} action={{ label: 'Ver la entrevista', icon: 'Play' }} />
                </button>
              ) : item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={CARD}>
                  {item.image && (
                    <div className="aspect-video overflow-hidden">
                      <Photo
                        base={item.image}
                        alt={item.imageAlt || `Recorte de prensa: ${item.headline}`}
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardBody item={item} action={{ label: 'Ver el caso', icon: 'ExternalLink' }} />
                </a>
              ) : item.image ? (
                <button type="button" onClick={() => setModalItem(item)} className={CARD}>
                  <div className="relative aspect-video overflow-hidden">
                    <Photo
                      base={item.image}
                      alt={item.imageAlt || `Recorte de prensa: ${item.headline}`}
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.duration && (
                      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-base/85 px-3 py-1 text-xs font-semibold text-text">
                        <Icon name="Play" size={12} className="fill-current text-gold" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <CardBody
                    item={item}
                    action={{
                      label: item.body ? 'Ver el caso' : 'Ampliar',
                      icon: 'ArrowUpRight',
                    }}
                  />
                </button>
              ) : (
                <div className={CARD}>
                  <span className="px-6 pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/25 bg-gold/[0.07] text-gold">
                      <Icon name="FileText" size={22} />
                    </span>
                  </span>
                  <CardBody item={item} />
                </div>
              )}
            </Reveal>
          ))}
        </ul>
      </div>

      <Modal
        open={Boolean(modalItem)}
        onClose={() => setModalItem(null)}
        title={modalItem?.headline}
        size="lg"
      >
        {isVideoItem(modalItem) ? (
          <>
            {modalItem.youtubeId ? (
              <div className="aspect-video w-full bg-base">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${modalItem.youtubeId}?autoplay=1&rel=0`}
                  title={modalItem.headline}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <VideoPlayer
                src={modalItem.video}
                poster={modalItem.poster}
                posterAlt={modalItem.posterAlt}
                title={modalItem.headline}
                duration={modalItem.duration}
              />
            )}
            <div className="border-t border-border p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
                {modalItem.outlet}
              </p>
              <p className="mt-2 font-display text-lg text-text">{modalItem.headline}</p>
              {modalItem.href && (
                <a
                  href={modalItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft hover:underline"
                >
                  Ver en el medio original
                  <Icon name="ExternalLink" size={15} />
                </a>
              )}
            </div>
          </>
        ) : (
          modalItem && (
            /*
              La pieza gráfica va arriba pero con el alto acotado: sin ese
              tope se comía media pantalla y el relato quedaba fuera de
              cuadro. `contain` sobre el fondo del sitio porque lleva el
              titular incrustado y recortarla se lo comería.
            */
            <figure>
              <div className="flex items-center justify-center bg-base">
                <Photo
                  base={modalItem.image}
                  alt={modalItem.imageAlt || `Recorte de prensa: ${modalItem.headline}`}
                  sizes="(min-width: 768px) 55vw, 90vw"
                  ratio={16 / 10}
                  className="max-h-[30vh] w-full object-contain md:max-h-[34vh]"
                />
              </div>

              {/* `pr-14` en el titular: deja libre la esquina del botón de
                  cerrar, que flota sobre esta columna. */}
              <figcaption className="border-t border-border p-6 pr-14 md:p-8 md:pr-16">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
                  {modalItem.outlet}
                </p>
                <p className="mt-2 font-display text-h3 leading-snug text-text">
                  {modalItem.headline}
                </p>

                {modalItem.body?.length > 0 && (
                  <div className="mt-5 border-t border-border pt-5 md:columns-2 md:gap-8">
                    {modalItem.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mb-4 break-inside-avoid text-sm leading-relaxed text-muted last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </figcaption>
            </figure>
          )
        )}
      </Modal>
    </section>
  );
}

export default Prensa;
