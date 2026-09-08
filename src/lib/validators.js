import { z } from 'zod';

/** Formato internacional E.164 tolerante a espacios, guiones y paréntesis. */
const phonePattern = /^\+?[0-9\s()-]{7,20}$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Escriba su nombre completo (mínimo 3 caracteres).')
    .max(80, 'El nombre es demasiado largo.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Ingrese un teléfono de contacto.')
    .regex(phonePattern, 'Ingrese un teléfono válido, por ejemplo +57 300 000 0000.')
    .refine((value) => value.replace(/\D/g, '').length >= 7, {
      message: 'Ingrese un teléfono válido, por ejemplo +57 300 000 0000.',
    }),
  email: z.string().trim().min(1, 'Ingrese su correo.').email('Ingrese un correo válido.'),
  area: z.string().min(1, 'Seleccione el área de su caso.'),
  message: z
    .string()
    .trim()
    .min(20, 'Cuéntenos su caso con un poco más de detalle (mínimo 20 caracteres).')
    .max(2000, 'El mensaje es demasiado largo.'),
  // `refine` en lugar de `z.literal(true)`: el mensaje personalizado funciona
  // igual en zod 3 y 4, y `literal` cambio de API entre versiones.
  consent: z.boolean().refine((value) => value === true, {
    message: 'Debe autorizar el tratamiento de sus datos para continuar.',
  }),
  // Honeypot: los humanos nunca ven este campo, los bots sí lo llenan.
  website: z.string().max(0, 'Envío rechazado.').optional().or(z.literal('')),
});

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'Ingrese su correo.').email('Ingrese un correo válido.'),
  website: z.string().max(0).optional().or(z.literal('')),
});

export const leadDefaults = {
  name: '',
  phone: '',
  email: '',
  area: '',
  message: '',
  consent: false,
  website: '',
};
