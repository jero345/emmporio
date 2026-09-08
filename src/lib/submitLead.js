/**
 * Único punto de integración de los formularios.
 *
 * Define `VITE_LEAD_ENDPOINT` en el archivo `.env` y todos los formularios
 * del sitio empiezan a enviar ahí (n8n, un CRM, una función serverless…)
 * sin tocar un solo componente. Si la variable no está definida, el envío se
 * simula para poder trabajar en local.
 */

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT;

export class LeadError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LeadError';
  }
}

/**
 * @param {object} data   Campos validados del formulario.
 * @param {object} [meta] Origen del envío, para poder segmentar en el CRM.
 */
export async function submitLead(data, meta = {}) {
  // El honeypot no viaja al CRM: si viene lleno, se descarta el envío.
  const { website, ...payload } = data;
  if (website) {
    throw new LeadError('No fue posible enviar el formulario.');
  }

  const body = {
    ...payload,
    source: meta.source || 'sitio-web',
    page: typeof window !== 'undefined' ? window.location.pathname : null,
    sentAt: new Date().toISOString(),
  };

  if (!ENDPOINT) {
    // Modo desarrollo: sin endpoint configurado se simula la latencia.
    // eslint-disable-next-line no-console
    console.info('[submitLead] VITE_LEAD_ENDPOINT no está definido. Envío simulado:', body);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { simulated: true };
  }

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new LeadError('No pudimos conectar con el servidor. Revise su conexión e intente de nuevo.');
  }

  if (!response.ok) {
    throw new LeadError('No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.');
  }

  return response.json().catch(() => ({ ok: true }));
}
