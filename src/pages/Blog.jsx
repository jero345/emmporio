import { useMemo, useState } from 'react';

import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { PostCard } from '../components/sections/BlogPreview.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Icon } from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

import { posts } from '../data/posts.js';
import { breadcrumbSchema } from '../lib/seo.js';

export default function Blog() {
  const categories = useMemo(
    () => ['Todas', ...new Set(posts.map((post) => post.category))],
    []
  );
  const [filter, setFilter] = useState('Todas');

  const visible = (filter === 'Todas' ? posts : posts.filter((post) => post.category === filter))
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Seo
        title="Blog"
        description="Análisis breves sobre cambios normativos y decisiones judiciales, escritos por el equipo de Emmporio Jurídico."
        path="/blog"
        noIndex={posts.length === 0}
        schemas={[
          breadcrumbSchema([
            { label: 'Inicio', to: '/' },
            { label: 'Blog', to: '/blog' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Publicaciones"
        title="Novedades jurídicas"
        text="Cambios normativos y decisiones que pueden afectar su caso, explicados sin tecnicismos innecesarios."
        image="/assets/instalaciones/sala-juntas-diplomas"
        imageAlt="Biblioteca jurídica de Emmporio Jurídico"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Blog', to: '/blog' },
        ]}
      />

      {posts.length === 0 ? (
        <section className="section">
          <div className="container-site">
            <Reveal className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-10 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/30 bg-gold/[0.07] text-gold">
                <Icon name="FileText" size={28} />
              </span>
              <h2 className="mt-6 font-display text-h3 text-text">Aún no hay artículos publicados</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Estamos preparando los primeros contenidos. Mientras tanto, si tiene una duda
                concreta sobre su caso, escríbanos y le respondemos directamente.
              </p>
              <Button to="/contacto" className="mt-8" icon="ArrowRight">
                Hacer una consulta
              </Button>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container-site">
            {categories.length > 2 && (
              <ul className="mb-12 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => setFilter(category)}
                      aria-pressed={filter === category}
                      className={[
                        'rounded-full border px-5 py-2.5 text-sm transition-colors',
                        filter === category
                          ? 'border-gold bg-gold text-ink'
                          : 'border-border text-muted hover:border-gold hover:text-goldSoft',
                      ].join(' ')}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post, index) => (
                <Reveal key={post.slug} delay={(index % 3) * 0.1}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
