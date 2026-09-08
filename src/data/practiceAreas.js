/**
 * Áreas de práctica. El slug alimenta la ruta /areas-de-practica/:slug
 * y la plantilla de detalle se construye entera con estos campos.
 *
 * El orden de este array es el orden en que aparecen en el menú, en el
 * carrusel del Home, en /areas-de-practica y en el sitemap.
 *
 * TODO: el listado de áreas es el que entregó el cliente. Falta que confirme
 * los servicios y el alcance de cada una tal como los presta la firma.
 */

export const practiceAreas = [
  {
    slug: 'derecho-penal',
    title: 'Derecho Penal',
    icon: 'Scale',
    excerpt:
      'Defensa técnica en todas las etapas del proceso penal, desde la captura hasta el recurso de casación.',
    image: '/assets/instalaciones/sala-juntas-ventanal',
    imageAlt: 'Sala de juntas de Emmporio Jurídico con vista a la ciudad',
    intro:
      'Cuando está en juego la libertad, la defensa no admite improvisación. Asumimos la representación desde la primera audiencia y construimos una estrategia probatoria sólida, documentada y sostenida en el tiempo.',
    body: [
      'Acompañamos al procesado y a su familia en cada etapa: audiencias preliminares, imputación, acusación, juicio oral y recursos. Nuestro trabajo empieza por entender los hechos con precisión y por revisar la legalidad de cada actuación de la Fiscalía.',
      'También representamos a las víctimas que buscan que el proceso avance y que el daño sufrido sea reparado.',
    ],
    services: [
      'Defensa en audiencias preliminares y de control de garantías',
      'Solicitudes de libertad por vencimiento de términos',
      'Preacuerdos y negociaciones con la Fiscalía',
      'Representación de víctimas e incidente de reparación integral',
      'Delitos económicos y contra la administración pública',
      'Recursos de apelación y casación',
    ],
  },
  {
    slug: 'derecho-civil',
    title: 'Derecho Civil',
    icon: 'Home',
    excerpt:
      'Contratos, arrendamientos, procesos ejecutivos y saneamiento de títulos con revisión documental exhaustiva.',
    image: '/assets/instalaciones/sala-juntas-mapa-mundi',
    imageAlt: 'Sala de juntas con mapamundi y biblioteca jurídica',
    intro:
      'La mayoría de los pleitos civiles se ganan —o se pierden— en el documento. Por eso empezamos por auditar títulos, contratos y soportes antes de definir la estrategia.',
    body: [
      'Atendemos procesos declarativos y ejecutivos, restitución de inmueble arrendado, pertenencia, servidumbres, responsabilidad contractual y estudio de títulos para compraventas.',
    ],
    services: [
      'Estudio de títulos y compraventa de inmuebles',
      'Restitución de inmueble arrendado',
      'Procesos ejecutivos y cobro de obligaciones',
      'Prescripción adquisitiva de dominio',
      'Propiedad horizontal y conflictos entre copropietarios',
      'Redacción y revisión de contratos civiles',
    ],
  },
  {
    slug: 'derecho-de-familia',
    title: 'Derecho de Familia',
    icon: 'Users',
    excerpt:
      'Divorcios, custodia, alimentos y sucesiones tratados con la reserva y el cuidado que exige un asunto familiar.',
    image: '/assets/instalaciones/despacho-ventanal',
    imageAlt: 'Despacho privado para atención de clientes',
    intro:
      'Los asuntos de familia se litigan con criterio jurídico, pero se manejan con prudencia. Buscamos primero el acuerdo; si no es posible, litigamos con firmeza.',
    body: [
      'Trabajamos divorcios de mutuo acuerdo y contenciosos, liquidación de sociedad conyugal, custodia y régimen de visitas, cuota alimentaria y procesos de sucesión.',
      'En todos los casos priorizamos el interés superior de los niños, niñas y adolescentes involucrados.',
    ],
    services: [
      'Divorcio y cesación de efectos civiles',
      'Liquidación de sociedad conyugal y patrimonial',
      'Custodia, visitas y cuota alimentaria',
      'Procesos de sucesión y partición de bienes',
      'Uniones maritales de hecho',
      'Medidas de protección por violencia intrafamiliar',
    ],
  },
  {
    slug: 'derecho-administrativo',
    title: 'Derecho Administrativo',
    icon: 'Landmark',
    excerpt:
      'Demandas contra el Estado, contratación estatal y defensa en procesos disciplinarios y de responsabilidad fiscal.',
    image: '/assets/instalaciones/abogado-despacho',
    imageAlt: 'Abogado de la firma trabajando en su despacho',
    intro:
      'Litigar contra una entidad pública tiene reglas propias: términos de caducidad cortos, requisitos de procedibilidad que no se pueden saltar y una carga probatoria que hay que preparar desde el primer día.',
    body: [
      'Representamos a ciudadanos y empresas ante la jurisdicción de lo contencioso administrativo: reparación directa por daños causados por el Estado, nulidad y restablecimiento del derecho frente a actos administrativos y controversias contractuales.',
      'También asumimos la defensa de servidores públicos en procesos disciplinarios y de responsabilidad fiscal.',
    ],
    services: [
      'Reparación directa contra el Estado',
      'Nulidad y restablecimiento del derecho',
      'Conciliación prejudicial ante la Procuraduría',
      'Controversias contractuales y contratación estatal',
      'Defensa en procesos disciplinarios y de responsabilidad fiscal',
      'Acciones de tutela y de cumplimiento',
    ],
  },
  {
    slug: 'extincion-de-dominio',
    title: 'Extinción de Dominio',
    icon: 'KeyRound',
    excerpt:
      'Defensa de bienes vinculados a un proceso de extinción de dominio, desde la fase inicial hasta la sentencia.',
    image: '/assets/instalaciones/recepcion-area-trabajo',
    imageAlt: 'Área de trabajo de las oficinas de Emmporio Jurídico',
    intro:
      'La extinción de dominio es un proceso autónomo del penal: se dirige contra el bien y no contra la persona, y exige demostrar el origen lícito del patrimonio con documentos, no con explicaciones.',
    body: [
      'Intervenimos como apoderados de afectados y de terceros de buena fe exenta de culpa, tanto en la fase inicial ante la Fiscalía como en el juicio ante los jueces especializados.',
      'El trabajo empieza por reconstruir la trazabilidad del bien: títulos, declaraciones de renta, movimientos bancarios y contratos que acrediten cómo se adquirió y con qué recursos.',
    ],
    services: [
      'Oposición en la fase inicial ante la Fiscalía',
      'Acreditación del origen lícito de los bienes',
      'Defensa del tercero de buena fe exenta de culpa',
      'Levantamiento de medidas cautelares',
      'Recursos contra la resolución de procedencia',
      'Reclamación de bienes administrados por la SAE',
    ],
  },
  {
    slug: 'derecho-de-transito',
    title: 'Derecho de Tránsito',
    icon: 'Car',
    excerpt:
      'Accidentes de tránsito, comparendos y reclamación de perjuicios ante el SOAT y las aseguradoras.',
    image: '/assets/instalaciones/pasillo-vidrio',
    imageAlt: 'Pasillo de las oficinas de Emmporio Jurídico',
    intro:
      'Un accidente de tránsito abre tres frentes al mismo tiempo —contravencional, penal y de responsabilidad civil— y lo que se declare en el primero condiciona los otros dos.',
    body: [
      'Asumimos la defensa en audiencias de tránsito y en procesos por lesiones u homicidio culposo, y la reclamación de los perjuicios sufridos por la víctima o por sus familiares.',
      'También impugnamos comparendos y sanciones impuestas sin el lleno de los requisitos legales.',
    ],
    services: [
      'Defensa en audiencias por accidente de tránsito',
      'Lesiones y homicidio culposo en accidente',
      'Impugnación de comparendos y fotomultas',
      'Procesos por conducir en estado de embriaguez',
      'Reclamación al SOAT y a la aseguradora',
      'Indemnización de perjuicios a la víctima',
    ],
  },
  {
    slug: 'seguros',
    title: 'Seguros',
    icon: 'ShieldCheck',
    excerpt:
      'Siniestros objetados, incumplimiento de pólizas y responsabilidad civil frente a las aseguradoras.',
    image: '/assets/instalaciones/sala-juntas-diplomas',
    imageAlt: 'Sala de juntas de Emmporio Jurídico con los reconocimientos de la firma',
    intro:
      'Cuantificar bien el daño es la mitad del caso. Documentamos el perjuicio material y moral con soporte pericial antes de presentar la reclamación a la aseguradora.',
    body: [
      'Representamos a asegurados y beneficiarios cuando la compañía objeta el siniestro, lo paga por debajo de lo pactado o dilata la respuesta más allá de los términos legales.',
      'Atendemos también la responsabilidad civil contractual y extracontractual, incluida la responsabilidad médica.',
    ],
    services: [
      'Objeción de siniestros y reclamación de pólizas',
      'Incumplimiento del contrato de seguro',
      'Pólizas de vida, salud y exequiales',
      'Seguros de cumplimiento y de responsabilidad civil',
      'Responsabilidad médica y mala praxis',
      'Cuantificación de perjuicios materiales y morales',
    ],
  },
  {
    slug: 'derecho-laboral',
    title: 'Derecho Laboral',
    icon: 'Briefcase',
    excerpt:
      'Reclamaciones de trabajadores y asesoría preventiva a empleadores, con foco en el resultado y no en el litigio eterno.',
    image: '/assets/instalaciones/mural-areas-practica',
    imageAlt: 'Mural con las áreas de práctica en las oficinas de la firma',
    intro:
      'El conflicto laboral se resuelve mejor cuando se entiende la relación completa: contrato, cargas prestacionales, seguridad social y prueba del vínculo.',
    body: [
      'Representamos a trabajadores en despidos sin justa causa, acoso laboral, liquidaciones mal calculadas y estabilidad laboral reforzada. Del lado del empleador, revisamos contratos, reglamentos y procesos disciplinarios para que las decisiones resistan una demanda.',
    ],
    services: [
      'Despido sin justa causa e indemnizaciones',
      'Estabilidad laboral reforzada y reintegro',
      'Acoso laboral y procesos disciplinarios',
      'Liquidación de prestaciones sociales',
      'Contrato realidad y solidaridad laboral',
      'Auditoría laboral preventiva para empresas',
    ],
  },
  {
    slug: 'seguridad-social',
    title: 'Seguridad Social',
    icon: 'HeartPulse',
    excerpt:
      'Pensiones, calificación de invalidez y controversias con EPS, fondos de pensiones y ARL.',
    image: '/assets/instalaciones/abogada-trabajando',
    imageAlt: 'Abogada de la firma revisando un expediente',
    intro:
      'Las negativas de las administradoras rara vez se resuelven en la ventanilla: se resuelven demostrando semanas cotizadas, historia laboral y origen de la enfermedad con la prueba correcta.',
    body: [
      'Tramitamos pensiones de vejez, invalidez y sobrevivientes, reliquidaciones mal calculadas, indemnizaciones sustitutivas y traslados de régimen.',
      'Litigamos frente a Colpensiones, fondos privados, EPS y ARL cuando niegan una prestación o califican mal la pérdida de capacidad laboral.',
    ],
    services: [
      'Pensión de vejez, invalidez y de sobrevivientes',
      'Reliquidación de la mesada pensional',
      'Traslado de régimen pensional',
      'Calificación de pérdida de capacidad laboral',
      'Negativa de servicios por parte de la EPS',
      'Incapacidades y prestaciones a cargo de la ARL',
    ],
  },
  {
    slug: 'derecho-policivo',
    title: 'Derecho Policivo',
    icon: 'Siren',
    excerpt:
      'Querellas por perturbación de la posesión, restitución de bienes y actuaciones ante inspecciones de policía.',
    image: '/assets/instalaciones/asesoria-clientes',
    imageAlt: 'Abogado de la firma atendiendo a dos clientes',
    intro:
      'Los procesos policivos son rápidos y tienen trámite propio: quien llega sin la prueba lista a la primera audiencia normalmente ya perdió.',
    body: [
      'Representamos a querellantes y querellados ante inspecciones de policía y corregidurías: perturbación de la posesión o la tenencia, amparo al domicilio, restitución de bienes de uso público y conflictos de propiedad horizontal.',
      'También impugnamos las medidas correctivas del Código Nacional de Seguridad y Convivencia impuestas sin fundamento.',
    ],
    services: [
      'Querellas por perturbación de la posesión',
      'Amparo al domicilio y a la tenencia',
      'Restitución de bienes de uso público',
      'Conflictos de propiedad horizontal',
      'Impugnación de medidas correctivas (Ley 1801)',
      'Representación ante inspecciones de policía',
    ],
  },
  {
    slug: 'derecho-corporativo',
    title: 'Derecho Corporativo',
    icon: 'Building2',
    excerpt:
      'Constitución, gobierno societario y contratación mercantil para empresas que quieren crecer sin contingencias.',
    image: '/assets/instalaciones/sala-juntas-mural',
    imageAlt: 'Sala de juntas de la firma preparada para reuniones corporativas',
    intro:
      'Acompañamos a la empresa desde su constitución hasta las decisiones que definen su futuro: reformas estatutarias, entrada de socios, contratos con proveedores y clientes.',
    body: [
      'Trabajamos como área jurídica externa: revisamos la contratación recurrente, estructuramos los órganos sociales y prevenimos los conflictos que después terminan en tribunales.',
    ],
    services: [
      'Constitución de sociedades y S.A.S.',
      'Reformas estatutarias y actas de asamblea',
      'Contratos mercantiles y de distribución',
      'Debida diligencia legal',
      'Acuerdos de accionistas',
      'Asesoría jurídica externa permanente',
    ],
  },
];

export const getPracticeArea = (slug) => practiceAreas.find((area) => area.slug === slug);
