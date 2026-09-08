# Emmporio Jurídico — sitio web

Sitio corporativo de la firma de abogados **Emmporio Jurídico** (Medellín, Colombia).
Tema oscuro premium con acento dorado tomado de la identidad de la marca.

React 18 · Vite · TailwindCSS 3 · React Router 6 · Framer Motion · Swiper · React Hook Form + Zod

---

## Puesta en marcha

```bash
npm install
npm run assets   # procesa el material del cliente (ver más abajo)
npm run dev      # http://localhost:5173
npm run build    # genera dist/ con sitemap.xml y robots.txt
npm run preview  # sirve dist/ para revisar el build
```

---

## Cómo cambiar el contenido

**Ningún texto, teléfono, correo o nombre está escrito dentro de un componente.**
Todo vive en `src/data/`. Para actualizar el sitio no hace falta tocar JSX.

| Archivo | Qué controla |
|---|---|
| `src/data/siteConfig.js` | Nombre, tagline, teléfono, WhatsApp, correo, dirección, horarios, redes, menú principal |
| `src/data/home.js` | Slides del hero, sección «Sobre la firma», «Por qué elegirnos», cifras, proceso, textos de contacto y FAQ |
| `src/data/practiceAreas.js` | Las 6 áreas de práctica y sus páginas de detalle |
| `src/data/attorneys.js` | Equipo y perfiles individuales |
| `src/data/resultados.js` | Casos y fallos favorables, y qué PDF se enlaza en cada uno |
| `src/data/testimonials.js` | Testimonios |
| `src/data/faqs.js` | Preguntas frecuentes (alimentan también el JSON-LD `FAQPage`) |
| `src/data/prensa.js` | Sección «En los medios» y video destacado del hero |
| `src/data/posts.js` | Artículos del blog |

Reglas que conviene conocer:

- **Agregar un área, un abogado o un artículo basta con agregar un objeto al array.**
  El menú, el footer, las páginas de detalle y el `sitemap.xml` se actualizan solos.
- **El blog solo aparece si hay artículos.** Con `posts = []`, la sección del Home no se
  renderiza, el enlace desaparece del menú y `/blog` queda fuera del sitemap. El archivo trae
  la forma exacta que debe tener un artículo, comentada.
- **Los testimonios y la prensa se ocultan igual** si su array queda vacío.
- **El botón de video del hero** reproduce el primer ítem de `prensa.js` que tenga `video`. Si no
  hay ninguno, el botón desaparece solo. Para usar un video institucional de YouTube en su lugar,
  ponga su id en `siteConfig.heroVideo.youtubeId`.
- Los bloques pendientes de contenido real están marcados con
  `// TODO: reemplazar con contenido real del cliente`. Busque `TODO` en `src/data/` para ver
  todo lo que falta confirmar.

---

## Assets del cliente

Las carpetas originales (`LOGOS EMMPORIO`, `FOTOGRAFIAS SOCIOS`, `FOTOGRAFIAS INSTALACIONES`,
`AUTOS Y SENTENCIAS`, `PRENSA`) **no se publican ni se versionan**: están en `.gitignore`.
`npm run assets` las lee y genera lo que sí va al sitio:

| Origen | Destino | Formato |
|---|---|---|
| LOGOS EMMPORIO | `src/assets/brand/`, `public/favicon-*.png`, `public/og-image.jpg` | PNG / JPG |
| FOTOGRAFIAS INSTALACIONES | `public/assets/instalaciones/` | `.webp` en 800 y 1600 px |
| FOTOGRAFIAS SOCIOS | `public/assets/equipo/` | `.webp` 3:4 en 600 y 1200 px |
| PRENSA | `public/assets/prensa/` | `.mp4` H.264 720p + portada `.webp` |
| AUTOS Y SENTENCIAS | `public/documentos/` | PDF |

El script convierte HEIC, extrae de los `.NEF` (RAW de la cámara) el JPEG a resolución completa
que llevan incrustado, corrige la orientación y renombra todo a kebab-case sin tildes.
Para agregar o cambiar una foto, edite los mapas `INSTALACIONES`, `EQUIPO` y `DOCUMENTOS` en
[scripts/prepare-assets.mjs](scripts/prepare-assets.mjs) y vuelva a ejecutar `npm run assets`.
Si un original no da la resolución necesaria, el script lo avisa por consola.

**En los datos la ruta de una foto se escribe sin sufijo ni extensión**
(`/assets/equipo/diana-eusse`); el componente `Photo` arma el `srcset` con los dos anchos.

### Videos

Las grabaciones que entrega el cliente pesan varios GB y no se pueden publicar tal cual. El
script las recodifica a H.264 720p 30 fps con `faststart` y extrae la portada. La entrevista del
socio en el pódcast *Conducta Delictiva*, por ejemplo, pasó de **2,15 GB a unos 60 MB**.

Recodificar tarda varios minutos, así que el paso **se omite si el `.mp4` ya está al día**
respecto del original. Para forzarlo, borre el archivo de `public/assets/prensa/` y vuelva a
ejecutar `npm run assets`. El momento del que se toma la portada se define en el mapa `VIDEOS`
de [scripts/prepare-assets.mjs](scripts/prepare-assets.mjs).

El reproductor usa `preload="none"`: mientras nadie pulse play solo se descarga la portada, así
que el peso del video **no afecta la velocidad de carga de la página**.

> Si el episodio está publicado en YouTube o Spotify, conviene poner ese enlace en el campo
> `href` del ítem en `src/data/prensa.js`. Servir 60 MB desde el propio hosting funciona, pero
> una plataforma de video ajusta la calidad a la conexión de cada visitante y no consume el
> ancho de banda contratado.

### Documentos judiciales

Los autos y sentencias **nunca se muestran como imagen ni se indexan**: van en
`public/documentos/`, bloqueado en `robots.txt`, y solo se enlazan desde el campo `document` de
`src/data/resultados.js`. Súbalos ya anonimizados; el aviso legal al pie de la sección se
gestiona desde `anonymizationNotice`, en ese mismo archivo.

---

## Logo

El logotipo original es **negro sobre crema**, así que no puede ir sobre el fondo oscuro del
sitio. `npm run assets` genera la versión invertida:

- `src/assets/brand/logo-light.png` — wordmark en crema + águila dorada. **Es el que usan el
  navbar y el footer.**
- `src/assets/brand/logo-dark.png` — el original, para fondos claros.
- `src/assets/brand/isotipo.png` — solo el águila; de él salen el favicon y el OG image.

Si el cliente entrega un SVG oficial invertido, reemplace `logo-light.png` por él y ajuste el
`import` en [src/components/layout/Logo.jsx](src/components/layout/Logo.jsx).

---

## Colores y tipografía

Los tokens están en [tailwind.config.js](tailwind.config.js) y son los únicos colores del sitio:

| Token | Valor | Uso |
|---|---|---|
| `base` | `#0B0F14` | Fondo principal |
| `surface` / `surface2` | `#141A20` / `#1E252C` | Tarjetas, secciones alternas, hover |
| `gold` | `#B08048` | Dorado principal: botones, iconos, títulos y elementos grandes |
| `goldSoft` | `#C99F67` | Dorado secundario: texto pequeño de acento, enlaces, eyebrows |
| `bone` | `#E9EDE1` | Crema del logo, para las secciones claras de contraste |
| `text` / `muted` | `#F2F3F0` / `#97A0A8` | Texto |
| `ink` | `#0B0F14` | Mismo valor que `base`, pero para color de texto sobre fondos claros |

Reglas de contraste que no conviene romper:

- El botón primario es fondo `gold` con texto `ink`. **Nunca blanco sobre dorado.**
- `gold` solo en elementos grandes; para texto pequeño use `goldSoft`, que da mejor contraste.
- `text-base` en Tailwind es un tamaño de fuente, no un color. Para el color use **`text-ink`**.

Tipografía: `Playfair Display` para títulos e `Inter` para cuerpo e interfaz, cargadas desde
Google Fonts en [index.html](index.html). Para cambiarlas, ajuste ese `<link>` y
`theme.extend.fontFamily`.

---

## Formularios

Los tres formularios del sitio (contacto, CTA del Home y newsletter del footer) envían a través
de un único punto: [src/lib/submitLead.js](src/lib/submitLead.js).

Para conectarlos a n8n, un CRM o una función serverless, defina la variable en `.env`:

```
VITE_LEAD_ENDPOINT=https://su-endpoint/webhook/leads
```

Hace un `POST` JSON con los campos del formulario más `source` (qué formulario lo originó),
`page` y `sentAt`. **Si la variable está vacía, el envío se simula** y el payload se imprime en
la consola del navegador, lo que permite trabajar en local sin backend.

Incluyen validación con Zod ([src/lib/validators.js](src/lib/validators.js)), campo honeypot
anti-spam, bloqueo de doble envío, estados de carga/éxito/error y checkbox obligatorio de
autorización de tratamiento de datos, enlazado a `/politica-de-datos`.

---

## SEO

- `react-helmet-async` pone title, description, canonical, Open Graph y Twitter Card por página,
  alimentados desde `src/data/`.
- JSON-LD: `LegalService` en Home y Contacto, `Attorney` en los perfiles, `BlogPosting` en los
  artículos, `FAQPage` en el Home y `BreadcrumbList` en las páginas internas
  ([src/lib/seo.js](src/lib/seo.js)).
- `sitemap.xml` y `robots.txt` se generan en cada build a partir de
  [src/data/routePaths.js](src/data/routePaths.js).
- Antes de publicar, defina `VITE_SITE_URL` en `.env` con el dominio real: de ahí salen las URL
  canónicas y el sitemap.
- Code splitting por ruta con `React.lazy`, imágenes en `.webp` con `loading="lazy"` y
  `width`/`height` explícitos para evitar CLS.

---

## Páginas legales

`/politica-de-datos` y `/aviso-legal` ([src/pages/Legal.jsx](src/pages/Legal.jsx)) traen un texto
base que cumple la estructura exigida por la Ley 1581 de 2012 para captar datos personales.
**Debe revisarlo y completarlo el responsable de tratamiento de datos de la firma antes de
publicar el sitio.**

---

## Estructura

```
scripts/prepare-assets.mjs   Pipeline de assets del cliente
src/
  assets/brand/              Logo invertido, logo original, isotipo
  components/
    layout/                  Navbar, TopBar, MobileMenu, Footer, flotantes, Layout
    sections/                Secciones del Home y bloques reutilizables
    ui/                      Button, SectionHeading, Accordion, Modal, Field, Photo, Icon…
  data/                      TODO el contenido editable
  hooks/                     useScrollReveal, useCounter, useDomId
  lib/                       seo.js, validators.js, submitLead.js, images.js
  pages/                     Una por ruta
  routes.jsx                 Router con code splitting
```
