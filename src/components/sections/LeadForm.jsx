import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { leadDefaults, leadSchema } from '../../lib/validators.js';
import { submitLead } from '../../lib/submitLead.js';
import { practiceAreas } from '../../data/practiceAreas.js';
import { whatsappUrl } from '../../data/siteConfig.js';
import { Button } from '../ui/Button.jsx';
import { Checkbox, Honeypot, Input, Select, Textarea } from '../ui/Field.jsx';
import { Icon } from '../ui/Icon.jsx';

const areaOptions = [
  ...practiceAreas.map((area) => ({ value: area.slug, label: area.title })),
  { value: 'otra', label: 'Otra / no estoy seguro' },
];

/**
 * Formulario de captación de casos.
 *
 * Estados: idle → enviando → éxito | error. El envío pasa siempre por
 * `submitLead`, que es el único punto de integración configurable por `.env`.
 */
export function LeadForm({ source = 'formulario-contacto', compact = false, defaultArea = '' }) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: { ...leadDefaults, area: defaultArea },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    // `isSubmitting` de react-hook-form ya bloquea el doble envío.
    setStatus('sending');
    setErrorMessage('');
    try {
      await submitLead(values, { source });
      setStatus('success');
      reset({ ...leadDefaults, area: defaultArea });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'No pudimos enviar su mensaje.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gold/30 bg-surface p-8 text-center md:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-ink">
          <Icon name="Check" size={30} />
        </span>
        <h3 className="mt-6 font-display text-h3 text-text">Mensaje enviado</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Un abogado del equipo revisará su caso y se comunicará con usted. Si su asunto es urgente,
          escríbanos por WhatsApp y lo atendemos de inmediato.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon="MessageCircle"
            iconPosition="left"
          >
            Escribir por WhatsApp
          </Button>
          <Button as="button" type="button" variant="ghost" onClick={() => setStatus('idle')}>
            Enviar otro mensaje
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
      <Honeypot {...register('website')} />

      <div className={compact ? 'space-y-4' : 'grid gap-5 sm:grid-cols-2'}>
        <Input
          label="Nombre completo"
          required
          autoComplete="name"
          placeholder="Su nombre"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Teléfono"
          required
          type="tel"
          autoComplete="tel"
          placeholder="+57 300 000 0000"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Correo electrónico"
          required
          type="email"
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Select
          label="Área de su caso"
          required
          options={areaOptions}
          placeholder="Seleccione un área"
          error={errors.area?.message}
          {...register('area')}
        />
        <Textarea
          label="Cuéntenos su caso"
          required
          rows={compact ? 4 : 5}
          placeholder="Describa brevemente qué ocurrió, cuándo y qué necesita."
          error={errors.message?.message}
          className={compact ? '' : 'sm:col-span-2'}
          {...register('message')}
        />
      </div>

      <Checkbox
        className="mt-6"
        error={errors.consent?.message}
        label={
          <>
            Autorizo el tratamiento de mis datos personales conforme a la{' '}
            <Link to="/politica-de-datos" className="text-goldSoft underline underline-offset-4">
              política de tratamiento de datos
            </Link>
            .
          </>
        }
        {...register('consent')}
      />

      {status === 'error' && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/5 p-4 text-sm text-red-200">
          <Icon name="AlertCircle" size={16} className="mt-0.5 shrink-0" />
          {errorMessage}
        </p>
      )}

      <Button as="button" type="submit" size="lg" disabled={isSubmitting} className="mt-7 w-full sm:w-auto">
        {isSubmitting ? (
          <span className="flex items-center gap-2.5">
            <Icon name="Loader2" size={18} className="animate-spin" />
            Enviando…
          </span>
        ) : (
          <span className="flex items-center gap-2.5">
            <Icon name="Send" size={18} />
            Solicitar consulta
          </span>
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Sus datos se usan únicamente para atender su solicitud. Le confirmamos el valor de la
        consulta antes de agendarla.
      </p>
    </form>
  );
}

export default LeadForm;
