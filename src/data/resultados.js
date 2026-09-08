/**
 * Resultados y fallos favorables.
 *
 * Regla de la sección: los autos y sentencias NUNCA se muestran como imagen
 * ni se indexan. Viven en `public/documentos/` (bloqueado en robots.txt) y
 * solo se enlazan desde aquí, cuando el campo `document` está presente.
 *
 * Las imágenes de las tarjetas son ilustraciones de cada tipo de proceso. No
 * son documentos del expediente: los papeles que aparecen en ellas son parte
 * de la ilustración y no reproducen ninguna actuación judicial real.
 *
 * TODO: reemplazar con contenido real del cliente. Los tres documentos
 * enlazados provienen de la carpeta `AUTOS Y SENTENCIAS`; hay que confirmar
 * juzgado, año y redacción del resumen antes de publicar.
 */

export const resultados = [
  {
    id: 'absolucion-proceso-penal',
    area: 'Derecho Penal',
    process: 'Proceso penal ordinario',
    result: 'Sentencia absolutoria — se declara la inocencia del procesado',
    year: 2023,
    court: 'Juzgado Penal del Circuito', // TODO: juzgado exacto
    image: '/assets/resultados/sentencia-absolutoria',
    imageAlt:
      'Ilustración de una sala de audiencias: un procesado celebra tras conocer una sentencia absolutoria',
    summary:
      'La Fiscalía sostuvo la acusación durante todo el juicio oral. La defensa concentró su trabajo en la contradicción de la prueba testimonial y en demostrar la ausencia de elementos materiales que vincularan a nuestro cliente con los hechos. El juzgado absolvió y ordenó la libertad inmediata.',
    document: '/documentos/sentencia-absolutoria-2023.pdf',
  },
  {
    id: 'libertad-vencimiento-terminos',
    area: 'Derecho Penal',
    process: 'Solicitud de libertad',
    result: 'Libertad por vencimiento de términos concedida',
    year: 2026,
    court: 'Juzgado de Control de Garantías', // TODO
    image: '/assets/resultados/libertad-por-vencimiento',
    imageAlt:
      'Ilustración de una persona que recupera su libertad acompañada por su abogado, junto a un auto de libertad concedida',
    summary:
      'Se acreditó ante el juez de control de garantías que la audiencia de juicio oral no se había iniciado dentro del término legal, sin que la demora fuera atribuible a la defensa. El juzgado concedió la libertad de nuestro representado.',
    document: '/documentos/libertad-por-vencimiento-de-terminos.pdf',
  },
  {
    id: 'sentencia-favorable-penal',
    area: 'Derecho Penal',
    process: 'Juicio oral',
    result: 'Fallo favorable a la defensa',
    year: 2024, // TODO: confirmar año
    court: 'Juzgado Penal del Circuito', // TODO
    image: '/assets/resultados/fallo-favorable',
    imageAlt:
      'Ilustración de un abogado y su clienta celebrando un fallo favorable ante el juez',
    summary:
      'Defensa técnica sostenida durante todas las etapas del proceso, con resultado favorable para el procesado.',
    document: '/documentos/sentencia-favorable-proceso-penal.pdf',
  },
  {
    id: 'reintegro-laboral',
    area: 'Derecho Laboral',
    process: 'Ordinario laboral de primera instancia',
    result: 'Nulidad del despido — reintegro ordenado y salarios dejados de percibir',
    year: 2024,
    court: 'Juzgado Laboral del Circuito', // TODO
    image: '/assets/resultados/reintegro-laboral',
    imageAlt:
      'Ilustración de la entrega de una carta de terminación del contrato sobre el escritorio de un abogado laboralista',
    summary:
      'La empresa terminó el contrato de una trabajadora amparada por estabilidad laboral reforzada sin autorización del inspector de trabajo. Se obtuvo la declaratoria de ineficacia del despido, el reintegro y el pago de los salarios y prestaciones dejados de percibir.',
    document: null, // TODO: adjuntar el fallo anonimizado
  },
  {
    id: 'restitucion-inmueble',
    area: 'Derecho Civil',
    process: 'Restitución de inmueble arrendado',
    result: 'Restitución decretada y condena en costas al arrendatario',
    year: 2023,
    court: 'Juzgado Civil Municipal', // TODO
    image: '/assets/resultados/restitucion-inmueble',
    imageAlt:
      'Ilustración de la entrega de las llaves de un inmueble junto al acta de entrega y el código civil',
    summary:
      'Tras más de un año de mora, se logró la entrega del inmueble en la primera audiencia y la condena en costas, evitando al propietario un proceso ejecutivo paralelo.',
    document: null, // TODO
  },
  {
    id: 'custodia-alimentos',
    area: 'Derecho de Familia',
    process: 'Custodia y cuota alimentaria',
    result: 'Custodia otorgada a nuestra representada y cuota fijada en su favor',
    year: 2025,
    court: 'Juzgado de Familia', // TODO
    image: '/assets/resultados/custodia-y-alimentos',
    imageAlt:
      'Ilustración de una madre abrazando a su hija junto a una sentencia de custodia',
    summary:
      'Se acreditó ante el juzgado que el entorno propuesto por nuestra representada garantizaba mejor el interés superior de los menores. Se fijó además una cuota alimentaria acorde con la capacidad económica real del alimentante.',
    document: null, // TODO
  },
];

export const anonymizationNotice =
  'Los documentos publicados se encuentran anonimizados conforme a la normativa de protección de datos personales.';
