/**
 * Recortes del apartado resolutivo de las providencias.
 *
 * El sitio ya no publica el PDF completo de ningun proceso: de cada decision
 * se muestra unicamente la imagen del "RESUELVE", y sobre esa imagen se tapan
 * los datos que permiten identificar a las personas del proceso.
 *
 * Por eso el recorte se hace aqui y no a mano: el pipeline vuelve a generar
 * las mismas barras cada vez, y si manana cambia un documento no hay riesgo de
 * publicar una version sin censurar por olvido.
 *
 * Los PDFs originales viven en `AUTOS Y SENTENCIAS/` (fuera del repo). Nunca
 * se copian a `public/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { createCanvas } from '@napi-rs/canvas';

const SRC = 'AUTOS Y SENTENCIAS';
const OUT = 'public/assets/resuelve';

// Escala de render. 2.6x sobre una pagina carta da ~1590 px de ancho: alcanza
// para el ancho mayor del sitio (1600) sin ampliar despues.
const SCALE = 2.6;

/**
 * Que se recorta de cada documento y que se tapa.
 *
 * - `page`   : pagina donde esta la parte resolutiva.
 * - `from`   : texto que marca el inicio del recorte (normalmente "RESUELVE").
 * - `to`     : texto que marca el final; si falta, se recorta hasta el pie.
 * - `redact` : patrones de los datos personales que se tapan con una barra.
 *
 * Los patrones se prueban contra cada fragmento de texto del PDF, que a veces
 * viene partido ("G UILLERMO A LONSO"), de ahi que se busquen tambien trozos
 * sueltos de los nombres y no solo el nombre completo.
 */
export const RESUELVE = {
  // Estas dos se publican integras por decision expresa del cliente: son
  // sentencias, y quiso que se leyeran completas. `redact` vacio = sin barras.
  'SENTENCIA GUILLERMO GARZON.pdf': {
    slug: 'sentencia-favorable-penal',
    page: 215,
    from: 'RESUELVE',
    redact: [],
  },
  '20230627 SENTENCIA INOCENCIA YOLBER.pdf': {
    slug: 'absolucion-proceso-penal',
    page: 24,
    from: 'RESUELVE',
    redact: [],
  },
  // El auto de libertad es un acta de audiencia de una sola pagina: no trae un
  // "RESUELVE" con ese nombre, la decision esta en la casilla 4. Se recorta
  // solo esa franja —no el acta entera, que va llena de datos del proceso— y
  // encima se tapan los del procesado, que es lo que pidio el cliente.
  '20260727 LIBERTAD POR VENCIMIENTO DE TERMINOS.pdf': {
    slug: 'libertad-vencimiento-terminos',
    page: 1,
    // El parrafo en el que el despacho resuelve, que es donde se lee la
    // decision de fondo. La casilla resumida de mas arriba decia solo «se
    // revoca la decision revisada», sin explicar que se revoco ni por que.
    from: 'El Despacho resuelve',
    to: 'Contra la presente decisión no procede recurso alguno',
    redact: [
      /ANDERSON/i, /ABAD/i, /DUQUE/i, /LOPEZ/i, /L[ÓO]PEZ/i,
      /1\.?017\.?204\.?114/, /1017204114/,
      /@inpec\.gov\.co/i, /virtuales/i,
      /0\s*5\s*0\s*0\s*1\s*6/,
    ],
  },
};

const ensure = (d) => fs.mkdirSync(d, { recursive: true });

/** Coordenadas del fragmento en el canvas ya escalado (origen arriba-izq). */
function itemBox(pdfjs, item, viewport) {
  const t = pdfjs.Util.transform(viewport.transform, item.transform);
  const height = Math.hypot(t[2], t[3]) || item.height * SCALE;
  const width = item.width * SCALE;
  return { x: t[4], y: t[5] - height, w: width, h: height };
}

/**
 * Peso aproximado de cada caracter para repartir el ancho de un fragmento.
 *
 * El PDF da la caja del fragmento entero, no la de cada letra, y en un
 * parrafo largo el dato a tapar va en mitad de la linea. Repartir el ancho
 * por numero de caracteres se desvia mucho con fuentes proporcionales, asi
 * que las letras estrechas y las anchas se ponderan distinto. Sigue siendo
 * una estimacion: por eso el recuadro se dibuja con un colchon a los lados.
 */
const NARROW = new Set([...".,;:'`|!ijlt()[]{}/\ ifr"]);
const WIDE = new Set([...'MWmw@%']);
const charWeight = (c) => (NARROW.has(c) ? 0.45 : WIDE.has(c) ? 1.6 : 1);

const weightOf = (text) => [...text].reduce((sum, c) => sum + charWeight(c), 0);

/**
 * Recuadros a tapar dentro de un fragmento.
 *
 * Si el patron cubre practicamente todo el texto se tapa el fragmento entero;
 * si cae en mitad de una linea larga se tapa solo ese tramo, estimado por
 * peso de caracteres y ensanchado un 12 % a cada lado.
 */
function redactionBoxes(box, text, patterns) {
  const full = weightOf(text);
  const boxes = [];

  for (const re of patterns) {
    const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
    let match;
    while ((match = global.exec(text)) !== null) {
      if (match[0].length === 0) break;

      // Patron que abarca casi todo el fragmento: se tapa completo.
      if (match[0].trim().length >= text.trim().length - 2) {
        boxes.push({ x: box.x, y: box.y, w: box.w, h: box.h });
        break;
      }

      const before = weightOf(text.slice(0, match.index));
      const inside = weightOf(match[0]);
      const pad = (inside / full) * box.w * 0.12 + 4;
      const x = box.x + (before / full) * box.w - pad;
      const w = (inside / full) * box.w + pad * 2;
      boxes.push({ x, y: box.y, w, h: box.h });
    }
  }
  return boxes;
}

export async function buildResuelve() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  ensure(OUT);

  for (const [file, config] of Object.entries(RESUELVE)) {
    const full = path.join(SRC, file);
    if (!fs.existsSync(full)) {
      console.warn(`  ! No se encontro ${file}`);
      continue;
    }

    const doc = await pdfjs.getDocument({
      data: new Uint8Array(fs.readFileSync(full)),
      useSystemFonts: true,
    }).promise;

    const page = await doc.getPage(config.page);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const items = (await page.getTextContent()).items.filter((i) => i.str.trim());

    // Barras negras sobre los datos personales. Se pintan con un margen para
    // que no asome ni un trozo de letra por los bordes.
    let redacted = 0;
    ctx.fillStyle = '#000';
    for (const item of items) {
      const box = itemBox(pdfjs, item, viewport);
      for (const b of redactionBoxes(box, item.str, config.redact)) {
        ctx.fillRect(b.x - 3, b.y - 3, b.w + 6, b.h + 6);
        redacted += 1;
      }
    }

    // Franja vertical que se conserva: del ancla de inicio a la de fin.
    const findY = (needle) => {
      const norm = (s) => s.replace(/\s+/g, ' ').trim().toUpperCase();
      const target = norm(needle);
      const hit = items.find((i) => norm(i.str).includes(target));
      return hit ? itemBox(pdfjs, hit, viewport) : null;
    };

    const start = findY(config.from);
    if (!start) {
      console.warn(`  ! ${file}: no se encontro «${config.from}» en la pagina ${config.page}`);
      continue;
    }
    const end = config.to ? findY(config.to) : null;

    const top = Math.max(0, Math.round(start.y - start.h * 1.6));
    const bottom = end
      ? Math.min(canvas.height, Math.round(end.y + end.h * 1.6))
      : canvas.height - Math.round(40 * SCALE);

    const crop = {
      left: 0,
      top,
      width: canvas.width,
      height: Math.max(120, bottom - top),
    };

    const png = canvas.toBuffer('image/png');
    const cropped = await sharp(png).extract(crop).toBuffer();
    const meta = await sharp(cropped).metadata();

    for (const width of [800, 1600]) {
      await sharp(cropped)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(path.join(OUT, `${config.slug}-${width}.webp`));
    }
    console.log(
      `  ${config.slug} — pag ${config.page}, recorte ${meta.width}x${meta.height}, ${redacted} datos tapados`
    );
  }
}

export default buildResuelve;
