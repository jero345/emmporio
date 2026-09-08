/**
 * Equipo de la firma. Alimenta /abogados y /abogados/:slug.
 *
 * Las fotos salen de `FOTOGRAFIAS SOCIOS` procesadas por `npm run assets`
 * (retrato 3:4, dos anchos). La ruta se escribe SIN sufijo de ancho ni
 * extensión: el componente arma el `srcset` con `-600.webp` y `-1200.webp`.
 *
 * Los nombres y los cargos son los que confirmó el cliente.
 * TODO: faltan por confirmar las tarjetas profesionales, los correos
 * individuales, las líneas directas, la formación y el año de vinculación
 * de cada persona.
 */

export const attorneys = [
  {
    slug: 'edward-becerra',
    name: 'Edward Jeferson Becerra Cossio',
    role: 'Socio fundador',
    specialty: 'Derecho Penal',
    image: '/assets/equipo/edward-becerra',
    imageAlt: 'Edward Jeferson Becerra Cossio, socio fundador de Emmporio Jurídico',
    since: 2010,
    card: 'T.P. 000.000 C.S.J.', // TODO: tarjeta profesional real
    email: 'direccion@emmporiojuridico.com', // TODO: confirmar el correo
    phone: '+57 604 322 2136', // TODO: extensión directa, si la tiene
    areas: ['derecho-penal', 'extincion-de-dominio'],
    bio: [
      'Fundó Emmporio Jurídico en 2010 con una idea simple: que una defensa seria no puede depender del tamaño del bolsillo del cliente. Desde entonces dirige la estrategia de los procesos penales de la firma.',
      'Ha llevado casos de libertad por vencimiento de términos, absoluciones en juicio oral y representación de víctimas en incidentes de reparación integral.',
    ],
    education: [
      'Abogado', // TODO: universidad y posgrados reales
      'Especialista en Derecho Penal y Criminología',
    ],
    // TODO: agregar el LinkedIn personal si lo tiene:
    // { name: 'LinkedIn', href: 'https://www.linkedin.com/in/…', icon: 'Linkedin' }
    social: [{ name: 'Correo', href: 'mailto:direccion@emmporiojuridico.com', icon: 'Mail' }],
  },
  {
    slug: 'diana-eusse',
    name: 'Diana Patricia Eusse Arenas',
    role: 'Socia fundadora',
    specialty: 'Derecho de Familia',
    image: '/assets/equipo/diana-eusse',
    imageAlt: 'Diana Patricia Eusse Arenas, socia fundadora de Emmporio Jurídico',
    since: 2010,
    card: 'T.P. 000.000 C.S.J.', // TODO
    email: 'diana.eusse@emmporiojuridico.com', // TODO: confirmar el correo
    phone: '+57 604 322 2136', // TODO: extensión directa, si la tiene
    areas: ['derecho-de-familia', 'derecho-civil'],
    bio: [
      'Cofundadora de la firma y responsable del área de familia. Ha construido su práctica alrededor de los procesos que exigen más prudencia que ruido: custodias, alimentos y sucesiones.',
      'Lidera además la relación con los clientes corporativos que requieren acompañamiento permanente.',
    ],
    education: [
      'Abogada', // TODO: universidad y posgrados reales
      'Especialista en Derecho de Familia',
    ],
    // TODO: agregar el LinkedIn personal si lo tiene.
    social: [{ name: 'Correo', href: 'mailto:diana.eusse@emmporiojuridico.com', icon: 'Mail' }],
  },
  {
    slug: 'karen-becerra',
    name: 'Karen Becerra Viana',
    role: 'Abogada senior',
    specialty: 'Derecho Laboral',
    image: '/assets/equipo/karen-becerra',
    imageAlt: 'Karen Becerra Viana, abogada senior de Emmporio Jurídico',
    since: 2019, // TODO: confirmar el año de vinculación
    card: 'T.P. 000.000 C.S.J.', // TODO
    email: 'contacto@emmporiojuridico.com', // TODO: correo individual, si lo tiene
    phone: '+57 604 322 2136', // TODO: extensión directa, si la tiene
    areas: ['derecho-laboral', 'seguridad-social'],
    bio: [
      'Atiende las reclamaciones laborales de la firma, desde liquidaciones mal calculadas hasta procesos de estabilidad laboral reforzada.',
    ],
    education: ['Abogada'], // TODO
    // TODO: agregar el LinkedIn personal si lo tiene.
    social: [{ name: 'Correo', href: 'mailto:contacto@emmporiojuridico.com', icon: 'Mail' }],
  },
  {
    slug: 'diego-paniagua',
    name: 'Diego Alejandro Paniagua Ospina',
    role: 'Abogado junior',
    specialty: 'Derecho Civil',
    image: '/assets/equipo/diego-paniagua',
    imageAlt: 'Diego Alejandro Paniagua Ospina, abogado junior de Emmporio Jurídico',
    since: 2022, // TODO: confirmar el año de vinculación
    card: 'T.P. 000.000 C.S.J.', // TODO
    email: 'contacto@emmporiojuridico.com', // TODO: correo individual, si lo tiene
    phone: '+57 604 322 2136', // TODO: extensión directa, si la tiene
    areas: ['derecho-civil', 'derecho-corporativo'],
    bio: [
      'Apoya los procesos civiles y ejecutivos de la firma y se encarga del estudio de títulos en las operaciones inmobiliarias.',
    ],
    education: ['Abogado'], // TODO
    // TODO: agregar el LinkedIn personal si lo tiene.
    social: [{ name: 'Correo', href: 'mailto:contacto@emmporiojuridico.com', icon: 'Mail' }],
  },
  {
    slug: 'veronica-carvajal',
    name: 'Verónica Carvajal Carvajal',
    role: 'Abogada junior',
    specialty: 'Derecho Policivo', // TODO: confirmar el área en la que se enfoca
    image: '/assets/equipo/veronica-carvajal',
    imageAlt: 'Verónica Carvajal Carvajal, abogada junior de Emmporio Jurídico',
    since: 2021, // TODO: confirmar el año de vinculación
    card: 'T.P. 000.000 C.S.J.', // TODO
    email: 'contacto@emmporiojuridico.com', // TODO: correo individual, si lo tiene
    phone: '+57 604 322 2136', // TODO: extensión directa, si la tiene
    areas: ['derecho-policivo', 'derecho-de-transito'],
    bio: [
      'Acompaña los procesos policivos y de tránsito de la firma y hace el seguimiento de términos y actuaciones en cada expediente.',
    ],
    education: ['Abogada'], // TODO
    // TODO: agregar el LinkedIn personal si lo tiene.
    social: [{ name: 'Correo', href: 'mailto:contacto@emmporiojuridico.com', icon: 'Mail' }],
  },
];

export const getAttorney = (slug) => attorneys.find((attorney) => attorney.slug === slug);
