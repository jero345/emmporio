import { useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { Photo } from './Photo.jsx';

/**
 * Reproductor de video con portada.
 *
 * El <video> se monta con `preload="none"` y solo aparece cuando el visitante
 * pulsa play, así que el peso del archivo no afecta la carga de la página:
 * hasta ese momento solo se descarga la imagen de portada.
 */
export function VideoPlayer({
  src,
  poster,
  posterAlt,
  title,
  duration,
  ratio = 16 / 9,
  className = '',
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div
      className={`relative w-full overflow-hidden bg-base ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster ? `${poster}-1600.webp` : undefined}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full bg-base"
        >
          Su navegador no puede reproducir este video.{' '}
          <a href={src} download>
            Descargarlo
          </a>
          .
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            <Photo
              base={poster}
              alt={posterAlt || ''}
              sizes="(min-width: 1024px) 60vw, 95vw"
              ratio={ratio}
              className="h-full w-full object-cover"
            />
          )}
          <span
            className="absolute inset-0 bg-base/45 transition-colors group-hover:bg-base/30"
            aria-hidden="true"
          />

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:scale-110"
          >
            <Icon name="Play" size={30} className="ml-1 fill-current" />
          </span>

          {duration && (
            <span className="absolute bottom-4 right-4 rounded-full bg-base/80 px-3 py-1 text-xs font-semibold text-text">
              {duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export default VideoPlayer;
