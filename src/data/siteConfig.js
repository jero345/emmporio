/**
 * Configuracion central de la firma.
 *
 * Todo lo que el cliente puede querer cambiar (telefono, correo, direccion,
 * horarios, redes) vive aqui y en los demas archivos de `src/data/`.
 * Ningun componente debe tener estos datos escritos por dentro.
 */

export const siteConfig = {
  name: 'Emmporio Jurídico',
  legalName: 'Emmporio Jurídico S.A.S.', // TODO: reemplazar con la razón social real
  tagline: 'Su mejor defensa',
  kicker: 'Abogados · desde 2010',
  foundedYear: 2010,
  // Año en que el socio fundador empezó a ejercer. Es anterior a la firma:
  // los años de experiencia son suyos, no de Emmporio Jurídico.
  practiceSinceYear: 1996,

  description:
    'Firma de abogados en Medellín con más de una década defendiendo a personas y empresas en materia penal, civil, laboral, de familia, administrativa, de seguridad social y corporativa.',

  // Línea principal de la oficina (PBX). Es la que se muestra como
  // teléfono de la firma en la barra superior, el pie y la página de contacto.
  // TODO: confirmar el indicativo. 604 es el de Antioquia; el cliente entregó
  // el número a siete dígitos (3222136), como se marca dentro de Medellín.
  phone: '+57 604 322 2136',
  phoneHref: 'tel:+576043222136',
  // Celular de la firma. Es el mismo para llamadas y WhatsApp.
  mobile: '+57 312 567 6064',
  whatsapp: '573125676064',
  whatsappMessage: 'Hola, quiero agendar una consulta con Emmporio Jurídico.',
  email: 'contacto@emmporiojuridico.com',

  address: {
    street: 'Carrera 51 # 50-21, edificio Banco de Londres, piso 18, oficina 1806',
    city: 'Medellín',
    state: 'Antioquia',
    country: 'Colombia',
    postalCode: '050012', // TODO: confirmar el código postal exacto
    // Búsqueda por dirección. TODO: si la firma tiene ficha en Google Business,
    // poner aquí ese enlace: lleva a la ficha con reseñas y horario, no a un pin.
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Edificio+Banco+de+Londres%2C+Carrera+51+%2350-21%2C+Medell%C3%ADn',
  },

  schedule: [
    { days: 'Lunes a viernes', hours: '8:00 a. m. – 6:00 p. m.' },
    { days: 'Sábados', hours: '9:00 a. m. – 1:00 p. m.' },
    { days: 'Domingos y festivos', hours: 'Atención de urgencias' },
  ],

  // Perfiles reales de la firma. Las URL van limpias, sin los parámetros de
  // seguimiento (`?igsi=`, `?_t=`) que agregan las apps al compartir: esos
  // caducan y además ensucian el `sameAs` del JSON-LD.
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/emmporiojuridicosumejordefensa',
      icon: 'Facebook',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/emmporiojuridicosumejordefensa',
      icon: 'Instagram',
    },
    { name: 'TikTok', href: 'https://www.tiktok.com/@emmporiojuridico', icon: 'TikTok' },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@emmporiojuridicosumejordef7478',
      icon: 'Youtube',
    },
  ],

  // Video del hero. Por defecto usa la pieza destacada de `prensa.js` (la
  // entrevista del socio en el pódcast). Para poner otro basta con cambiar
  // `heroVideo` en este archivo; si algún día hay un video institucional en
  // YouTube, defina `youtubeId` y se usará ese en su lugar.
  heroVideo: {
    label: 'Ver la entrevista',
    youtubeId: null, // TODO: id de YouTube si el video se publica allí
  },

  siteUrl: import.meta.env?.VITE_SITE_URL || 'https://emmporiojuridico.com',
};

/**
 * Años de ejercicio del socio fundador, calculados para que no queden
 * desactualizados. No son los años de la firma: para eso está `foundedYear`.
 */
export const yearsOfExperience = new Date().getFullYear() - siteConfig.practiceSinceYear;

/** Años de la firma, desde su fundación. */
export const yearsOfFirm = new Date().getFullYear() - siteConfig.foundedYear;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;

export const mainNav = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Áreas de práctica', to: '/areas-de-practica', hasDropdown: true },
  { label: 'Abogados', to: '/abogados' },
  { label: 'Casos', to: '/casos' },
  { label: 'Blog', to: '/blog', onlyIfPosts: true },
  { label: 'Contacto', to: '/contacto' },
];

export const legalLinks = [
  { label: 'Política de tratamiento de datos', to: '/politica-de-datos' },
  { label: 'Aviso legal', to: '/aviso-legal' },
];
