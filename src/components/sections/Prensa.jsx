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

/** Miniatura con badge de reproducción, para los ítems que son video. */
function VideoThumb({ item }) {
  const thumbClasses =
    'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105';

  return (
    <div className="relative aspect-video overflow-hidden">
      {item.youtubeId ? (
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
      <span
        className="absolute inset-0 bg-base/40 transition-colors group-hover:bg-base/25"
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

      <span className="mt-3 block flex-1 font-display text-lg leading-snug text-text transition-colors group-hover:text-goldSoft">
        {item.headline}
      </span>

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
          eyebrow="En los medios"
          title="La firma en la prensa"
          align="center"
          text="Entrevistas y cubrimientos en los que ha participado el equipo de la firma."
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
                        alt={`Recorte de prensa: ${item.headline}`}
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardBody item={item} action={{ label: 'Leer la nota', icon: 'ExternalLink' }} />
                </a>
              ) : item.image ? (
                <button type="button" onClick={() => setModalItem(item)} className={CARD}>
                  <div className="aspect-video overflow-hidden">
                    <Photo
                      base={item.image}
                      alt={`Recorte de prensa: ${item.headline}`}
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardBody
                    item={item}
                    action={{ label: 'Ver el recorte', icon: 'ArrowUpRight' }}
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
            <figure>
              <Photo
                base={modalItem.image}
                alt={`Recorte de prensa: ${modalItem.headline}`}
                sizes="90vw"
                className="w-full"
              />
              <figcaption className="border-t border-border p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">
                  {modalItem.outlet}
                </p>
                <p className="mt-2 font-display text-lg text-text">{modalItem.headline}</p>
              </figcaption>
            </figure>
          )
        )}
      </Modal>
    </section>
  );
}

export default Prensa;
