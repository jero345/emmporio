# PROMPT PARA CLAUDE CODE — SITIO WEB FIRMA DE ABOGADOS (React + Tailwind)

> Copia todo lo que está debajo de la línea y pégalo en Claude Code.

---

## ROL Y OBJETIVO

Actúa como un desarrollador frontend senior especializado en sitios corporativos de alta conversión.

Vas a construir desde cero el sitio web de la firma de abogados **Emmporio Jurídico** (Colombia), en **React + Vite + TailwindCSS**, replicando la estructura, jerarquía visual y sensación premium de la plantilla de referencia "Judges — Dark", pero con código propio, limpio y componentizado (NO copies código de la plantilla; reconstruye el diseño).

Referencia visual: `https://judges-laravel.mnsithub.com/index-dark`

---

## 1. STACK OBLIGATORIO

- **React 18 + Vite** (JavaScript, no TypeScript, salvo que yo indique lo contrario)
- **TailwindCSS 3** + `@tailwindcss/typography`
- **react-router-dom v6** para ruteo
- **framer-motion** para animaciones de entrada (fade/slide on scroll)
- **swiper** para sliders (hero, testimonios, equipo)
- **react-hook-form** + **zod** para validación de formularios
- **lucide-react** para iconografía
- **react-helmet-async** para meta tags por página (SEO)
- **vite-plugin-sitemap** o equivalente para sitemap.xml
- Sin librerías de UI pesadas (no MUI, no Bootstrap, no Chakra). Todo con Tailwind.

Instala y configura todo tú mismo. Deja el proyecto corriendo con `npm run dev` sin errores ni warnings de consola.

---

## 2. MARCA

- **Nombre:** Emmporio Jurídico
- **Tagline:** "Su mejor defensa"
- **Bajada:** Abogados · desde 2010
- **Símbolo:** águila geométrica facetada en dorado (isotipo), integrada entre las dos palabras del logotipo.
- **Logo:** archivo entregado por el cliente. El wordmark original es **negro sobre crema**, así que:
  - En el navbar y el footer (fondo oscuro) usa la **versión clara/invertida** en `src/assets/logo-light.svg`. Si no existe todavía, deja un placeholder con el texto en blanco + el isotipo dorado y marca `// TODO: reemplazar por SVG oficial invertido`.
  - Nunca coloques el logo negro sobre fondo oscuro.
  - El favicon y el OG image se generan a partir del isotipo del águila sobre fondo `base`.

---

## 3. SISTEMA DE DISEÑO (tokens en `tailwind.config.js`)

Tema **oscuro premium legal**, sobrio, con acento dorado tomado de la identidad:

```
colors:
  base:      #0B0F14   (fondo principal, casi negro con leve calidez)
  surface:   #141A20   (cards / secciones alternas)
  surface2:  #1E252C   (hover, estados activos)
  gold:      #B08048   (DORADO PRINCIPAL — CTAs, isotipo, subrayados, bordes de acento)
  goldSoft:  #C99F67   (DORADO SECUNDARIO — hover, textos pequeños de acento, enlaces)
  bone:      #E9EDE1   (crema del logo — secciones claras puntuales y texto sobre dorado)
  text:      #F2F3F0
  muted:     #97A0A8
  border:    rgba(233,237,225,0.10)
```

Reglas de uso del color (no negociables, son de contraste):
- `gold` (#B08048) sobre `base` da ~5.5:1 → úsalo solo en **títulos, iconos, botones y elementos grandes**.
- `goldSoft` (#C99F67) da ~7.9:1 → úsalo para **texto pequeño de acento, enlaces y eyebrows**.
- Botón primario: fondo `gold`, texto `#0B0F14` (nunca blanco sobre dorado). Hover: fondo `goldSoft`.
- Botón secundario: borde `gold`, texto `goldSoft`, fondo transparente.
- Degradado de acento permitido: `linear-gradient(135deg, #B08048, #C99F67)` para líneas divisorias, badges y el borde superior de cards destacadas.
- `bone` se usa para una o dos secciones claras de contraste (ej. FAQ o proceso), con texto en `base`.

Tipografía (alineada al logo, que es una serif alta con remates marcados y letterspacing amplio):
- Títulos: **`Playfair Display`** (alternativa: `Cormorant Garamond`) — vía Google Fonts
- Eyebrows y microtextos: sans en mayúsculas con `tracking-[0.25em]`, imitando el "S U  M E J O R  D E F E N S A" del logo
- Cuerpo y UI: `Inter`
- Escala tipográfica clara: h1 clamp(2.5rem, 5vw, 4.25rem), h2 clamp(2rem, 3.5vw, 3rem)

Reglas visuales:
- Espaciado vertical generoso entre secciones: `py-20 md:py-28`
- Contenedor: `max-w-[1280px] mx-auto px-5 md:px-8`
- Bordes sutiles `border-border`, radios `rounded-xl`/`rounded-2xl`
- Sin sombras exageradas; usa `ring-1 ring-white/5` y gradientes suaves
- Cada sección lleva un **eyebrow** (texto corto en dorado con una línea corta al lado) sobre el H2, igual que la referencia
- Animaciones de entrada discretas al hacer scroll (opacity + translateY 20px, duración 0.5s)
- Contadores animados en la sección de cifras (usar IntersectionObserver, sin librería extra)

Accesibilidad: contraste AA mínimo, `focus-visible` visible en dorado, `alt` en todas las imágenes, navegación por teclado funcional en el menú y el acordeón de FAQ.

---

## 4. ARQUITECTURA DE CARPETAS

```
src/
  assets/
  components/
    layout/       Navbar, Footer, TopBar, MobileMenu, ScrollToTop
    ui/           Button, SectionHeading, Card, Accordion, Counter, Input, Textarea, Select
    sections/     Hero, About, PracticeAreas, WhyChooseUs, Process, Testimonials,
                  CaseResults, Stats, Attorneys, FAQ, ContactCTA, BlogPreview
  pages/
  data/           practiceAreas.js, attorneys.js, testimonials.js, faqs.js, posts.js, siteConfig.js
  hooks/          useScrollReveal.js, useCounter.js
  lib/            seo.js, validators.js
  routes.jsx
  main.jsx
```

**Regla crítica:** ningún texto, teléfono, correo o nombre va hardcodeado dentro de un componente. **Todo el contenido vive en `src/data/`**, para que el cliente pueda cambiarlo sin tocar JSX. `siteConfig.js` centraliza nombre de la firma (Emmporio Jurídico), tagline, teléfono, WhatsApp, email, dirección, horarios y redes.

---

## 5. PÁGINAS A CONSTRUIR

1. `/` — Home
2. `/nosotros` — Sobre la firma
3. `/areas-de-practica` — Listado de áreas
4. `/areas-de-practica/:slug` — Detalle de área (plantilla única alimentada por data)
5. `/abogados` — Equipo
6. `/abogados/:slug` — Perfil de abogado
7. `/casos` — Casos de éxito
8. `/blog` y `/blog/:slug`
9. `/contacto`
10. `/404`

**NO construyas** shop, carrito, checkout, wishlist, login ni planes de precios. No aplican a una firma de abogados y contaminan la propuesta de valor.

---

## 6. ESTRUCTURA DEL HOME (en este orden)

1. **TopBar**: horario de atención, teléfono, email, redes. Se oculta al hacer scroll en desktop; no se muestra en móvil.
2. **Navbar** sticky con fondo translúcido + blur al hacer scroll. Logo a la izquierda, menú centrado con dropdowns (Áreas de práctica), a la derecha teléfono + botón dorado "Agendar consulta". Menú móvil off-canvas full screen.
3. **Hero slider** (Swiper, 3 slides, fade + Ken Burns sutil en la imagen de fondo): eyebrow, H1 en dos líneas con la segunda en dorado, párrafo corto, botón primario "Consulta gratuita" + botón secundario tipo play que abre modal de video de YouTube. Overlay oscuro con gradiente diagonal.
4. **Sobre la firma**: dos imágenes superpuestas (fotografías reales de las instalaciones) + badge circular giratorio "15 años de experiencia" (firma fundada en 2010), a la derecha eyebrow + H2 + párrafo + grid 2x2 de diferenciadores con ícono, y botón.
5. **Áreas de práctica**: grid de 6 cards (3 col desktop / 2 tablet / 1 móvil). Cada card: imagen, número grande translúcido, título, descripción corta, enlace. Hover: la imagen hace zoom, el borde se vuelve dorado y el número se ilumina.
6. **Por qué elegirnos**: split con imagen a la derecha (incluye cinta vertical con "XX años de experiencia") y a la izquierda 4 bloques con ícono.
7. **Cifras animadas**: 4 contadores (casos exitosos, clientes satisfechos, abogados, reconocimientos) sobre imagen de fondo con overlay.
8. **Proceso de trabajo**: 4 pasos numerados conectados por una línea horizontal punteada en desktop, vertical en móvil.
9. **Marquee** con las áreas de práctica en scroll infinito horizontal (CSS puro, sin librería).
9b. **En los medios**: franja con los logos/recortes de los medios donde ha aparecido la firma (reemplaza el bloque de "brands worldwide" de la plantilla). Cada ítem enlaza a la nota original o abre un lightbox con el recorte. Data en `data/prensa.js`.
10. **Testimonios**: slider de 3 visibles con foto, nombre, cargo, estrellas y comilla decorativa en dorado.
11. **Resultados y fallos**: grid de 6 cards alimentado por `data/resultados.js`. Cada card: área del derecho, tipo de proceso, resultado en una línea (ej. "Nulidad de despido — fallo favorable, reintegro ordenado"), año y juzgado. Al hacer clic abre un modal con el resumen del caso y, si existe, un enlace al documento en PDF. **Las imágenes de fondo son fotos de las instalaciones o texturas, NO los documentos**; los autos y sentencias solo se enlazan como PDF. Incluye al pie de la sección el aviso: "Los documentos publicados se encuentran anonimizados conforme a la normativa de protección de datos personales."
12. **Equipo de abogados**: slider de cards con foto recortada, nombre, especialidad y redes que aparecen al hover.
13. **CTA de contacto**: split — a la izquierda video/imagen, a la derecha formulario compacto (nombre, teléfono, email, select de área de práctica, mensaje) + datos de contacto.
14. **FAQ**: acordeón accesible de 5–6 preguntas junto a una imagen.
15. **Blog**: 3 últimas entradas con imagen, badge de categoría, fecha, título y extracto. Si el cliente todavía no tiene artículos, esta sección se renderiza **solo si `posts.js` tiene contenido** (condicional), para no publicar un blog vacío.
16. **Footer**: 4 columnas (logo + descripción + horarios, enlaces rápidos, áreas, datos de contacto) + newsletter + barra inferior de copyright y legales. Formas decorativas sutiles de fondo.
17. **Botón flotante de WhatsApp** y **botón de volver arriba**.

---

## 7. FORMULARIOS

- Validación con `react-hook-form` + `zod`: nombre (mín. 3), teléfono (formato internacional válido), email válido, área de práctica requerida, mensaje (mín. 20).
- Estados visuales: idle / enviando (spinner en el botón) / éxito / error.
- El envío se abstrae en `src/lib/submitLead.js` con un único punto de integración configurable por `.env` (`VITE_LEAD_ENDPOINT`). Por defecto hace un `POST` JSON a ese endpoint y, si no está definido, simula el envío. Así se conecta después a n8n / CRM sin tocar componentes.
- Incluye honeypot anti-spam y bloqueo de doble envío.
- Añade aviso de tratamiento de datos con checkbox obligatorio (requisito legal para captación de datos).

---

## 8. SEO Y RENDIMIENTO

- `react-helmet-async` con title, description, canonical, Open Graph y Twitter Card por página, alimentados desde `data/`.
- JSON-LD `LegalService` en el Home y `Attorney` en los perfiles, `BlogPosting` en artículos.
- Imágenes en `.webp`, `loading="lazy"`, `width`/`height` explícitos para evitar CLS.
- Code splitting por ruta con `React.lazy` + `Suspense`.
- Objetivo Lighthouse: ≥ 90 en Performance, Accessibility, Best Practices y SEO.
- Genera `sitemap.xml` y `robots.txt`.

---

## 9. ASSETS REALES DEL CLIENTE Y CONTENIDO

El cliente entrega material propio. Estructura `public/assets/` así y usa estas fuentes en lugar de stock siempre que sea posible:

| Carpeta del cliente | Destino en el sitio | Ruta |
|---|---|---|
| LOGOS EMMPORIO | Navbar, footer, favicon, OG image | `src/assets/brand/` |
| FOTOGRAFIAS SOCIOS | Sección Equipo + perfiles individuales | `public/assets/equipo/` |
| FOTOGRAFIAS INSTALACIONES | Hero, Sobre la firma, fondos de sección, página Contacto | `public/assets/instalaciones/` |
| AUTOS Y SENTENCIAS | PDFs enlazados desde la sección Resultados | `public/documentos/` |
| PRENSA | Sección "En los medios" | `public/assets/prensa/` |

Reglas de assets:
- Nomenclatura en kebab-case y sin tildes: `socio-nombre-apellido.webp`, `instalaciones-recepcion.webp`.
- Convierte todo a `.webp` y genera dos anchos (`-800.webp`, `-1600.webp`) con `srcset`.
- Las fotos de socios se muestran en formato retrato 3:4 con tratamiento uniforme (duotono suave hacia `base` + `gold` al hover) para que fotos tomadas en condiciones distintas se vean coherentes.
- **Los autos y sentencias nunca se muestran como imagen ni se indexan.** Van en `public/documentos/` con `robots.txt` bloqueando esa ruta, y el `data/resultados.js` es el que decide cuáles se enlazan.
- Solo si falta material para alguna sección usa placeholders de Unsplash, marcados con `// TODO: reemplazar por foto del cliente`.

Copy **en español (Colombia)**, sin Lorem Ipsum, girando alrededor del tagline "Su mejor defensa" y de la trayectoria desde 2010. Áreas de práctica sugeridas: Derecho Corporativo, Derecho de Familia, Derecho Laboral, Derecho Penal, Derecho Civil e Inmobiliario, Responsabilidad Civil y Seguros. Marca claramente con el comentario `// TODO: reemplazar con contenido real del cliente` cada bloque de datos.


---

## 10. FORMA DE TRABAJAR

1. Primero muéstrame el **plan de ejecución y el árbol de archivos** que vas a crear, y espera mi OK.
2. Luego construye por fases, en este orden, y avísame al terminar cada una:
   - Fase 1: setup, Tailwind config, tokens, layout (Navbar, TopBar, Footer, router)
   - Fase 2: componentes UI base + hooks
   - Fase 3: secciones del Home
   - Fase 4: páginas internas y plantillas dinámicas
   - Fase 5: formularios, SEO, optimización y build de producción
3. Al final de cada fase ejecuta `npm run build` y confirma que compila sin errores.
4. Escribe un `README.md` explicando cómo cambiar contenido, colores, logo y conectar el endpoint de formularios.

Si algo del brief es ambiguo, hazme las preguntas necesarias **antes** de escribir código, no asumas.
