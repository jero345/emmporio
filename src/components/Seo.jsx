import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/siteConfig.js';
import { canonical, ogImage, pageTitle } from '../lib/seo.js';

/**
 * Meta tags por página: title, description, canonical, Open Graph,
 * Twitter Card y los bloques JSON-LD que reciba en `schemas`.
 */
export function Seo({
  title,
  description = siteConfig.description,
  path = '/',
  image = ogImage,
  type = 'website',
  noIndex = false,
  withSuffix = true,
  schemas = [],
}) {
  const url = canonical(path);
  const fullTitle = pageTitle(title, { withSuffix });

  return (
    <Helmet>
      <html lang="es-CO" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.filter(Boolean).map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
