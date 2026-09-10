/**
 * Único punto de integración de los formularios.
 *
 * Define `VITE_LEAD_ENDPOINT` en el archivo `.env` y todos los formularios
 * del sitio empiezan a enviar ahí (Web3Forms, Formspree, n8n, un CRM, una
 * función serverless…) sin tocar un solo componente. Si la variable no está
 * definida, el envío se simula para poder trabajar en local.
 *
 * `VITE_LEAD_ACCESS_KEY` es opcional: los servicios de formularios sin
 * backend (Web3Forms, por ejemplo) identifican la cuenta con una clave que
 * viaja en el cuerpo del envío. Si está definida se agrega; si no, el cuerpo
 * sale limpio y sirve igual para un webhook propio.
 */

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT;
const ACCESS_KEY = import.meta.env.VITE_LEAD_ACCESS_KEY;

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

  const source = meta.source || 'sitio-web';

  const body = {
    // La clave va primero para que un campo del formulario no pueda pisarla.
    ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
    ...payload,
    source,
    page: typeof window !== 'undefined' ? window.location.pathname : null,
    sentAt: new Date().toISOString(),
    // Asunto del correo que arma el servicio de formularios. Con el área y el
    // nombre a la vista, la consulta se puede clasificar sin abrirla.
    subject: payload.area
      ? `Nueva consulta (${payload.area}) — ${payload.name || 'sin nombre'}`
      : `Nuevo registro desde el sitio — ${source}`,
  };

  if (!ENDPOINT) {
    // Modo desarrollo: sin endpoint configurado se simula la latencia.
    // eslint-disable-next-line no-console
    console.info('[submitLead] VITE_LEAD_ENDPOINT no está definido. Envío simulado:', body);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { simulated: true };
  }

  /*
   * Con clave de acceso el envío va como `FormData`, no como JSON.
   *
   * No es un capricho: `Content-Type: application/json` convierte la petición
   * en «no simple» y el navegador manda antes un OPTIONS de comprobación.
   * Web3Forms responde 403 a ese OPTIONS, así que el envío nunca sale y el
   * visitante ve un error de conexión. `FormData` no dispara la comprobación
   * —es lo que enviaría un formulario HTML normal— y pasa sin problema.
   *
   * Sin clave se mantiene el JSON de siempre, que es lo que espera un webhook
   * propio, n8n o un CRM.
   */
  const asForm = Boolean(ACCESS_KEY);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      ...(asForm
        ? {
            // `Accept` no dispara la comprobación previa (es de la lista
            // segura) y hace que la respuesta llegue en JSON en vez de una
            // página HTML, que es lo que permite detectar un fallo real.
            headers: { Accept: 'application/json' },
            body: Object.entries(body).reduce((form, [key, value]) => {
              form.append(key, value == null ? '' : String(value));
              return form;
            }, new FormData()),
          }
        : {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }),
    });
  } catch {
    throw new LeadError('No pudimos conectar con el servidor. Revise su conexión e intente de nuevo.');
  }

  if (!response.ok) {
    throw new LeadError('No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.');
  }

  const result = await response.json().catch(() => ({ ok: true }));

  // Algunos servicios responden 200 con `success: false` cuando la clave es
  // incorrecta. Sin esto el visitante vería «enviado» y el mensaje se perdería.
  if (result && result.success === false) {
    throw new LeadError('No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.');
  }

  return result;
}
