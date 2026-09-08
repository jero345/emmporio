/**
 * Contenido de las secciones del Home.
 *
 * TODO: reemplazar con contenido real del cliente, en especial las cifras
 * de la sección de estadísticas, que deben poder sustentarse.
 */
import { yearsOfExperience } from './siteConfig.js';

export const heroSlides = [
  {
    id: 'h1',
    eyebrow: 'Abogados · desde 2010',
    titleTop: 'Su mejor',
    titleBottom: 'defensa',
    // La frase de la firma («estamos hechos para lo difícil…») ya no va aquí:
    // vive completa en la franja de `manifiesto`, justo debajo del hero. Este
    // slide dice qué hace la firma para que no se lean dos veces lo mismo.
    text: 'Defendemos a personas y empresas en once áreas del derecho, de lo penal y lo civil a lo laboral y la seguridad social. Desde nuestras oficinas en el centro de Medellín.',
    image: '/assets/instalaciones/recepcion-logo',
    imageAlt: 'Recepción de Emmporio Jurídico con el logotipo iluminado',
    // Retrato opcional: se monta como figura en la columna derecha, sobre la
    // fotografía de fondo. Solo el primer slide lo lleva.
    portrait: '/assets/equipo/edward-becerra',
    portraitAlt: 'Edward Jeferson Becerra Cossio, socio fundador de Emmporio Jurídico',
  },
  {
    id: 'h2',
    eyebrow: 'Defensa penal',
    titleTop: 'Cuando está en juego',
    titleBottom: 'su libertad',
    text: 'Defensa técnica desde la primera audiencia hasta el recurso de casación. Sin improvisación y sin promesas que no podamos sostener ante un juez.',
    image: '/assets/instalaciones/socio-entrevista-despacho',
    imageAlt: 'Edward Jeferson Becerra Cossio, socio fundador de Emmporio Jurídico, durante una entrevista en su despacho',
    // La foto es vertical y la banda del hero es mucho más ancha, así que
    // `object-cover` se come casi toda la altura. Al 30 % el recorte deja
    // dentro la cabeza y las manos, que es donde está la acción.
    imagePosition: 'object-[50%_30%]',
  },
  {
    id: 'h3',
    eyebrow: 'Asesoría empresarial',
    titleTop: 'El área jurídica',
    titleBottom: 'de su empresa',
    text: 'Contratos, gobierno societario y prevención del conflicto laboral. Resolvemos el problema antes de que llegue a un juzgado.',
    image: '/assets/instalaciones/abogado-expediente',
    imageAlt: 'Abogado de Emmporio Jurídico atendiendo desde las oficinas de la firma en Medellín',
    // Arriba por la misma razón que el slide anterior; el 60 % horizontal
    // mantiene al abogado en cuadro cuando en móvil se recorta por los lados.
    imagePosition: 'object-[60%_top]',
  },
];

/**
 * Declaración de la firma, tal como la entregó el cliente. Va en una franja
 * propia justo debajo del hero, no dentro del slider: el slider rota cada
 * siete segundos y esta frase tiene que quedarse quieta.
 *
 * El cierre lleva la marca con las dos emes; el original del cliente traía
 * «Emporio» en esa última línea.
 */
export const manifiesto = {
  lead: 'En Emmporio Jurídico estamos hechos para lo difícil y preparados para lo imposible.',
  body: 'Asumimos los casos que otros no quieren enfrentar, con estrategia, experiencia y determinación. Cuando el desafío es mayor, nuestra defensa también lo es.',
  signature: 'Emmporio Jurídico: su mejor defensa',
};

export const aboutSection = {
  eyebrow: 'Sobre la firma',
  title: 'Una firma construida caso a caso',
  lead: 'Emmporio Jurídico nació en 2010 en Medellín y hoy acompaña a personas y empresas en once áreas del derecho, de lo penal y lo civil a lo administrativo, lo laboral y la seguridad social.',
  body: 'No trabajamos con expedientes anónimos. Cada caso tiene un abogado responsable con nombre propio, un plan de trabajo escrito y un cliente que sabe en todo momento en qué va su proceso. Esa es, en la práctica, nuestra manera de entender el "su mejor defensa" que acompaña al logo desde el primer día.',
  images: [
    {
      src: '/assets/instalaciones/sala-juntas-diplomas',
      alt: 'Sala de juntas de Emmporio Jurídico con los reconocimientos de la firma',
    },
    {
      src: '/assets/instalaciones/socio-despacho-lectura',
      alt: 'Socio de Emmporio Jurídico estudiando un expediente en su despacho',
    },
  ],
  badge: {
    top: `${yearsOfExperience} años`,
    bottom: 'de experiencia',
  },
  highlights: [
    {
      icon: 'Scale',
      title: 'Criterio jurídico',
      text: 'Le decimos con franqueza si tiene o no un caso, antes de cobrarle honorarios.',
    },
    {
      icon: 'MessagesSquare',
      title: 'Comunicación directa',
      text: 'Un abogado responsable identificado y un canal abierto durante todo el proceso.',
    },
    {
      icon: 'FileCheck2',
      title: 'Trabajo documentado',
      text: 'Cada actuación queda soportada y cada honorario pactado por escrito.',
    },
    {
      icon: 'Clock',
      title: 'Respuesta oportuna',
      text: 'Los términos judiciales no esperan; el seguimiento de los suyos tampoco.',
    },
  ],
};

export const whyChooseUs = {
  eyebrow: 'Por qué elegirnos',
  title: 'Lo que cambia cuando la defensa se prepara bien',
  image: {
    src: '/assets/instalaciones/despacho-mapa-mundi',
    alt: 'Despacho de Emmporio Jurídico donde se atiende a los clientes',
  },
  ribbon: `${yearsOfExperience} años de experiencia`,
  items: [
    {
      icon: 'Target',
      title: 'Estrategia antes que trámite',
      text: 'Definimos la teoría del caso desde la primera reunión y todas las actuaciones responden a ella.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Reserva absoluta',
      text: 'La información del cliente se maneja bajo secreto profesional y protocolos de protección de datos.',
    },
    {
      icon: 'Users',
      title: 'Equipo, no un abogado suelto',
      text: 'Penal, laboral, civil y familia trabajan juntos cuando un mismo asunto toca varias áreas.',
    },
    {
      icon: 'HandCoins',
      title: 'Honorarios transparentes',
      text: 'Alcance y valor acordados por escrito antes de empezar. Sin sorpresas a mitad del proceso.',
    },
  ],
};

// TODO: reemplazar por las cifras reales verificables de la firma.
export const stats = {
  background: {
    src: '/assets/instalaciones/recepcion-logo-lateral',
    alt: 'Recepción de las oficinas de Emmporio Jurídico',
  },
  // `max` es la escala de la barra de cada cifra: define hasta dónde se llena
  // (850 sobre 1000 = 85 %). No se muestra, solo da la proporción.
  items: [
    // `won` parte la barra en dos: lo atendido y, dentro, lo ganado.
    // TODO: confirmar cuántos de los casos atendidos terminaron a favor.
    { id: 's1', value: 850, max: 1000, suffix: '+', label: 'Casos atendidos', won: 780 },
    { id: 's2', value: 700, max: 1000, suffix: '+', label: 'Clientes acompañados' },
    { id: 's3', value: 5, max: 8, suffix: '', label: 'Profesionales en el equipo' },
    { id: 's4', value: yearsOfExperience, max: 35, suffix: '', label: 'Años de experiencia' },
  ],

  // Indicadores en porcentaje. Van arriba de las barras de cifras.
  // TODO: reemplazar por indicadores reales y verificables de la firma. No
  // publique porcentajes de exito que no pueda sustentar con expedientes:
  // en un sitio de abogados es una afirmacion comprobable, no un adorno.
  metrics: [
    {
      id: 'm1',
      value: 92,
      label: 'Resultados favorables',
      description:
        'Casos que terminaron en absolución, preclusión o acuerdo favorable al cliente.',
    },
    {
      id: 'm2',
      value: 87,
      label: 'Resueltos sin juicio',
      description:
        'Asuntos cerrados por conciliación o acuerdo, sin el desgaste de un proceso largo.',
    },
    {
      id: 'm3',
      value: 96,
      label: 'Clientes que recomiendan',
      description: 'Clientes que regresan con un nuevo asunto o refieren la firma a un tercero.',
    },
    {
      id: 'm4',
      value: 100,
      label: 'Respuesta en 24 horas',
      description: 'Toda solicitud que llega por el sitio se responde el mismo día hábil.',
    },
  ],
};

export const processSteps = {
  eyebrow: 'Cómo trabajamos',
  title: 'Cuatro pasos, sin letra menuda',
  steps: [
    {
      number: '01',
      icon: 'PhoneCall',
      title: 'Consulta inicial',
      text: 'Nos cuenta qué pasó. Escuchamos, revisamos los documentos que tenga y le decimos si hay caso.',
    },
    {
      number: '02',
      icon: 'FileSearch',
      title: 'Estudio del asunto',
      text: 'Analizamos la prueba, los términos y los riesgos, y le presentamos la estrategia por escrito.',
    },
    {
      number: '03',
      icon: 'Gavel',
      title: 'Representación',
      text: 'Asumimos el poder y llevamos el proceso: audiencias, memoriales, recursos y negociación.',
    },
    {
      number: '04',
      icon: 'CheckCircle2',
      title: 'Resultado y cierre',
      text: 'Le explicamos el fallo, los recursos disponibles y lo que sigue después de la decisión.',
    },
  ],
};

export const contactSection = {
  eyebrow: 'Agende su consulta',
  title: 'Cuéntenos su caso',
  text: 'Escríbanos con el mayor detalle posible. Un abogado del equipo revisa cada solicitud y le responde para agendar la primera valoración y confirmarle su valor.',
  image: {
    src: '/assets/instalaciones/abogada-area-atencion',
    alt: 'Abogada de Emmporio Jurídico en su despacho, con Medellín al fondo',
  },
};

export const faqSection = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que casi siempre nos preguntan',
  image: {
    src: '/assets/instalaciones/abogado-despacho',
    alt: 'Abogado de la firma atendiendo un caso en su despacho',
  },
};
