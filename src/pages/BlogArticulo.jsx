import { Link, Navigate, useParams } from 'react-router-dom';

import { Seo } from '../components/Seo.jsx';
import { PostCard, formatPostDate } from '../components/sections/BlogPreview.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Photo } from '../components/ui/Photo.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { getPost, posts } from '../data/posts.js';
import { getAttorney } from '../data/attorneys.js';
import { blogPostingSchema, breadcrumbSchema } from '../lib/seo.js';

export default function BlogArticulo() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/404" replace />;

  const author = post.author ? getAttorney(post.author) : null;
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Inicio', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.title, to: `/blog/${post.slug}` },
  ];

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        schemas={[blogPostingSchema(post, author), breadcrumbSchema(breadcrumbs)]}
      />

      <article className="pb-4 pt-12 md:pt-16">
        <div className="container-site">
          <nav aria-label="Ruta de navegación" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.to} className="flex items-center gap-2">
                  {index > 0 && <Icon name="ChevronRight" size={14} className="text-gold" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="line-clamp-1 text-goldSoft">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="transition-colors hover:text-goldSoft">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <header className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              {post.category}
            </p>
            <h1 className="mt-6 text-h1 text-balance">{post.title}</h1>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Icon name="Calendar" size={15} className="text-gold" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </li>
              {author && (
                <li className="flex items-center gap-2">
                  <Icon name="Users" size={15} className="text-gold" />
                  {author.name}
                </li>
              )}
              {post.readingTime && (
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={15} className="text-gold" />
                  {post.readingTime} min de lectura
                </li>
              )}
            </ul>
          </header>

          <Reveal className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl ring-1 ring-white/5">
            <Photo
              base={post.image}
              alt={post.imageAlt}
              priority
              sizes="(min-width: 1024px) 60vw, 90vw"
              ratio={16 / 9}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <div className="prose prose-invert mx-auto mt-12 max-w-3xl prose-headings:font-display">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="container-site">
            <h2 className="font-display text-h2 text-text">Siga leyendo</h2>
            <span className="mt-4 block h-px w-16 bg-gold-gradient" aria-hidden="true" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
