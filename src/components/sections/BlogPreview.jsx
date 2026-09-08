import { Link } from 'react-router-dom';
import { posts } from '../../data/posts.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export const formatPostDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export function PostCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-gold">
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Photo
            base={post.image}
            alt={post.imageAlt}
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-5 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-2 text-sm text-muted">
            <Icon name="Calendar" size={14} className="text-gold" />
            {formatPostDate(post.date)}
          </p>
          <h3 className="mt-3 font-display text-h3 leading-snug text-text transition-colors group-hover:text-goldSoft">
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft">
            Leer el artículo
            <Icon
              name="ArrowRight"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

/**
 * Últimas entradas del blog.
 *
 * Solo se renderiza si `posts.js` tiene contenido: publicar una sección de
 * blog vacía perjudica el SEO y la credibilidad de la firma.
 */
export function BlogPreview() {
  if (!posts.length) return null;

  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Publicaciones"
            title="Novedades jurídicas"
            text="Análisis breves sobre cambios normativos y decisiones que pueden afectar su caso."
          />
          <Reveal delay={0.15}>
            <Button to="/blog" variant="secondary" icon="ArrowRight">
              Ver todas las entradas
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;
