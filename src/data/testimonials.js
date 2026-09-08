/**
 * Testimonios de clientes.
 *
 * TODO: reemplazar con testimonios reales autorizados por escrito. Mientras
 * no exista esa autorización, la sección se puede vaciar dejando el array
 * en `[]`: el Home deja de renderizarla automáticamente.
 *
 * `image` es opcional; si falta se muestra la inicial del nombre sobre un
 * disco dorado, que es preferible a una foto de banco de imágenes.
 */

export const testimonials = [
  {
    id: 't1',
    name: 'Cliente de proceso penal', // TODO: nombre real autorizado
    role: 'Medellín',
    rating: 5,
    image: null,
    quote:
      'Llegué sin entender nada del proceso y con mi familia asustada. Me explicaron cada audiencia antes de que pasara y siempre supe en qué iba el caso. El resultado habla por sí solo.',
  },
  {
    id: 't2',
    name: 'Clienta de proceso laboral', // TODO
    role: 'Envigado',
    rating: 5,
    image: null,
    quote:
      'Me despidieron estando en tratamiento médico y creí que no había nada que hacer. Presentaron la demanda con todos los soportes y logramos el reintegro.',
  },
  {
    id: 't3',
    name: 'Gerente de empresa cliente', // TODO
    role: 'Sector construcción',
    rating: 5,
    image: null,
    quote:
      'Revisaron toda nuestra contratación laboral antes de que se convirtiera en un problema. Hoy son el área jurídica externa de la compañía.',
  },
  {
    id: 't4',
    name: 'Cliente de familia', // TODO
    role: 'Bello',
    rating: 5,
    image: null,
    quote:
      'Manejaron un tema muy personal con una discreción que agradezco. Nunca sentí que fuera un expediente más.',
  },
];
