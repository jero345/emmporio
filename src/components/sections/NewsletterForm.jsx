import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { newsletterSchema } from '../../lib/validators.js';
import { submitLead } from '../../lib/submitLead.js';
import { Icon } from '../ui/Icon.jsx';

/** Suscripción del footer. Usa el mismo punto de integración que el resto. */
export function NewsletterForm({ className = '' }) {
  const [status, setStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', website: '' },
  });

  const onSubmit = async (values) => {
    setStatus('sending');
    try {
      await submitLead(values, { source: 'newsletter' });
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={className}>
      <h3 className="font-display text-lg text-text">Novedades jurídicas</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Cambios normativos y decisiones que pueden afectarlo, sin spam.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-4">
        <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        <div className="flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Su correo electrónico"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'newsletter-error' : undefined}
            className="min-w-0 flex-1 rounded-xl border border-border bg-base px-4 py-3 text-sm text-text placeholder:text-muted/70 focus:border-gold focus:outline-none"
            {...register('email')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label="Suscribirme"
            className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl bg-gold text-ink transition-colors hover:bg-goldSoft disabled:opacity-60"
          >
            <Icon name={isSubmitting ? 'Loader2' : 'Send'} size={18} className={isSubmitting ? 'animate-spin' : ''} />
          </button>
        </div>

        {errors.email && (
          <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">
            {errors.email.message}
          </p>
        )}
        {status === 'success' && (
          <p role="status" className="mt-2 text-sm text-goldSoft">
            Listo, quedó suscrito.
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="mt-2 text-sm text-red-300">
            No pudimos completar la suscripción. Intente de nuevo.
          </p>
        )}
      </form>
    </div>
  );
}

export default NewsletterForm;
