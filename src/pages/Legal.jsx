import { Seo } from '../components/Seo.jsx';
import { PageHero } from '../components/sections/PageHero.jsx';
import { siteConfig } from '../data/siteConfig.js';

/**
 * Páginas legales.
 *
 * Son un requisito de la Ley 1581 de 2012 para captar datos personales
 * mediante formularios. El texto es una base: TODO: debe revisarlo y
 * completarlo el responsable del tratamiento de datos de la firma antes
 * de publicar el sitio.
 */

const documents = {
  datos: {
    title: 'Política de tratamiento de datos personales',
    eyebrow: 'Protección de datos',
    description:
      'Política de tratamiento de datos personales de Emmporio Jurídico conforme a la Ley 1581 de 2012.',
    path: '/politica-de-datos',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: [
          `${siteConfig.legalName}, con domicilio en ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}, correo electrónico ${siteConfig.email} y teléfono ${siteConfig.phone}, es el responsable del tratamiento de los datos personales recolectados a través de este sitio web.`,
        ],
      },
      {
        heading: 'Finalidad de la recolección',
        body: [
          'Los datos que usted suministra en los formularios del sitio se utilizan exclusivamente para: (i) atender su solicitud de consulta o información; (ii) contactarlo por los medios que nos indique; (iii) evaluar la viabilidad de asumir su asunto; y (iv) enviarle información jurídica de interés, cuando lo haya autorizado expresamente.',
          'Los datos no se comercializan ni se transfieren a terceros con fines publicitarios.',
        ],
      },
      {
        heading: 'Datos que se recolectan',
        body: [
          'Nombre, teléfono, correo electrónico, área jurídica de interés y la descripción del asunto que usted decida compartir. No solicitamos datos sensibles a través del sitio; si en la descripción de su caso los incluye, se tratarán bajo reserva profesional y con las medidas de seguridad correspondientes.',
        ],
      },
      {
        heading: 'Derechos del titular',
        body: [
          'Como titular de los datos usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales, a solicitar prueba de la autorización otorgada, a ser informado sobre el uso que se les ha dado, a presentar quejas ante la Superintendencia de Industria y Comercio y a revocar la autorización.',
          `Para ejercer estos derechos puede escribir a ${siteConfig.email} indicando su nombre, el derecho que desea ejercer y los datos de contacto para responderle.`,
        ],
      },
      {
        heading: 'Vigencia y conservación',
        body: [
          'Los datos se conservarán mientras subsista la finalidad que motivó su recolección y por el término que exijan las obligaciones legales y contables aplicables a la firma.',
        ],
      },
      {
        heading: 'Seguridad de la información',
        body: [
          'La firma aplica medidas técnicas, humanas y administrativas razonables para proteger la información contra pérdida, uso indebido, acceso no autorizado o alteración.',
        ],
      },
    ],
  },
  aviso: {
    title: 'Aviso legal',
    eyebrow: 'Términos de uso',
    description: 'Condiciones de uso del sitio web de Emmporio Jurídico.',
    path: '/aviso-legal',
    sections: [
      {
        heading: 'Titularidad del sitio',
        body: [
          `Este sitio web es propiedad de ${siteConfig.legalName}, firma de abogados con domicilio en ${siteConfig.address.city}, ${siteConfig.address.country}.`,
        ],
      },
      {
        heading: 'La información no constituye asesoría jurídica',
        body: [
          'El contenido publicado en este sitio tiene carácter informativo general y no constituye asesoría jurídica para un caso concreto. Ningún contenido de este sitio crea una relación abogado-cliente, la cual solo surge con la suscripción del respectivo contrato de prestación de servicios profesionales.',
          'Antes de tomar cualquier decisión con efectos jurídicos, consulte a un abogado sobre su situación particular.',
        ],
      },
      {
        heading: 'Resultados de casos anteriores',
        body: [
          'Los resultados y fallos publicados corresponden a procesos efectivamente llevados por la firma y se presentan de forma anonimizada conforme a la normativa de protección de datos personales. Los resultados obtenidos en un caso no garantizan un resultado equivalente en otro: cada proceso depende de sus propios hechos, pruebas y del criterio del despacho judicial que lo conoce.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        body: [
          'El logotipo, los textos, las fotografías y demás elementos de este sitio son propiedad de la firma o se usan con autorización. Su reproducción total o parcial sin autorización previa y escrita está prohibida.',
        ],
      },
      {
        heading: 'Enlaces externos',
        body: [
          'El sitio puede contener enlaces a páginas de terceros. La firma no controla ni responde por el contenido de esos sitios.',
        ],
      },
    ],
  },
};

export function LegalPage({ document: key }) {
  const doc = documents[key];

  return (
    <>
      <Seo title={doc.title} description={doc.description} path={doc.path} />

      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title}
        image="/assets/instalaciones/pasillo-vidrio"
        imageAlt=""
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: doc.title, to: doc.path },
        ]}
      />

      <section className="section">
        <div className="container-site">
          <div className="prose prose-invert max-w-3xl prose-headings:font-display">
            <p className="lead text-muted">
              Última actualización: {new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}.
            </p>
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function PoliticaDeDatos() {
  return <LegalPage document="datos" />;
}

export function AvisoLegal() {
  return <LegalPage document="aviso" />;
}

export default PoliticaDeDatos;
