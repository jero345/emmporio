import { siteConfig } from '../data/siteConfig.js';

const absolute = (path = '/') =>
  `${siteConfig.siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

export const canonical = absolute;

export const ogImage = absolute('/og-image.jpg');

/** Título con el sufijo de la firma, salvo en el Home. */
export const pageTitle = (title, { withSuffix = true } = {}) =>
  withSuffix && title ? `${title} | ${siteConfig.name}` : title || siteConfig.name;

const address = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.state,
  postalCode: siteConfig.address.postalCode,
  addressCountry: 'CO',
};

/** JSON-LD LegalService para el Home. */
export const legalServiceSchema = (practiceAreas = []) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: absolute('/'),
  image: ogImage,
  logo: absolute('/favicon-512.png'),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  foundingDate: String(siteConfig.foundedYear),
  address,
  areaServed: { '@type': 'Country', name: 'Colombia' },
  priceRange: '$$',
  sameAs: siteConfig.social.map((item) => item.href),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Áreas de práctica',
    itemListElement: practiceAreas.map((area) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: area.title, description: area.excerpt },
      url: absolute(`/areas-de-practica/${area.slug}`),
    })),
  },
});

/** JSON-LD Attorney para los perfiles del equipo. */
export const attorneySchema = (attorney) => ({
  '@context': 'https://schema.org',
  '@type': 'Attorney',
  name: attorney.name,
  jobTitle: attorney.role,
  knowsAbout: attorney.specialty,
  url: absolute(`/abogados/${attorney.slug}`),
  image: absolute(`${attorney.image}-1200.webp`),
  email: attorney.email,
  telephone: attorney.phone,
  worksFor: {
    '@type': 'LegalService',
    name: siteConfig.name,
    url: absolute('/'),
  },
  address,
});

/** JSON-LD BlogPosting para los artículos. */
export const blogPostingSchema = (post, author) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.updatedAt || post.date,
  image: absolute(`${post.image}-1600.webp`),
  url: absolute(`/blog/${post.slug}`),
  articleSection: post.category,
  author: {
    '@type': author ? 'Person' : 'Organization',
    name: author ? author.name : siteConfig.name,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: { '@type': 'ImageObject', url: absolute('/favicon-512.png') },
  },
});

/** JSON-LD FAQPage para el acordeón del Home. */
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

/** JSON-LD BreadcrumbList para las páginas internas. */
export const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    item: absolute(crumb.to),
  })),
});
