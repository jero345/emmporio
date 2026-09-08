/**
 * Pipeline de assets del cliente -> assets optimizados del sitio.
 *
 *   npm run assets
 *
 * Lee las carpetas originales entregadas por el cliente (que no se publican)
 * y genera:
 *   - src/assets/brand/            logo invertido, isotipo, favicons, og-image
 *   - public/assets/instalaciones/ fotos .webp en 800 y 1600 px
 *   - public/assets/areas/         fotos de cada area de practica en 800 y 1600 px
 *   - public/assets/equipo/        retratos .webp 3:4 en 600 y 1200 px
 *   - public/assets/prensa/        videos .mp4 optimizados y sus portadas
 *   - public/documentos/           PDFs de autos y sentencias (no indexados)
 *
 * Es idempotente: se puede volver a ejecutar cuando el cliente entregue
 * material nuevo.
 */
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import ffmpegPath from 'ffmpeg-static';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const SRC = {
  logos: 'LOGOS EMMPORIO',
  instalaciones: 'FOTOGRAFIAS INSTALACIONES',
  socios: 'FOTOGRAFIAS SOCIOS',
  documentos: 'AUTOS Y SENTENCIAS',
  prensa: 'PRENSA',
  casos: 'CASOS NOTABLES',
  resultados: 'IMAGENES RESULTADOS',
  areas: 'IMAGENES AREAS',
};

const OUT = {
  brand: 'src/assets/brand',
  instalaciones: 'public/assets/instalaciones',
  equipo: 'public/assets/equipo',
  prensa: 'public/assets/prensa',
  casos: 'public/assets/casos',
  resultados: 'public/assets/resultados',
  areas: 'public/assets/areas',
  documentos: 'public/documentos',
};

const BASE = '#0B0F14';

const ensure = (d) => fs.mkdirSync(d, { recursive: true });
const exists = (p) => fs.existsSync(p);

/**
 * Los RAW de la camara (.NEF) llevan dentro un JPEG a resolucion completa.
 * Se extrae el mayor de los JPEG embebidos buscando los marcadores SOI/EOI,
 * asi no hay que sumar un revelador RAW a las dependencias del proyecto.
 */
function extractEmbeddedJpeg(buf, file) {
  const EOI = Buffer.from([0xff, 0xd9]);
  let best = null;
  for (let i = 0; i < buf.length - 2; i += 1) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
      const end = buf.indexOf(EOI, i + 2);
      if (end === -1) break;
      const length = end + 2 - i;
      if (!best || length > best.length) best = { start: i, length };
      i = end;
    }
  }
  if (!best) throw new Error(`${file}: el RAW no trae vista previa JPEG.`);
  return buf.subarray(best.start, best.start + best.length);
}

/** Lee cualquier formato del cliente y devuelve un buffer que sharp entiende. */
async function readImage(file) {
  const buf = fs.readFileSync(file);
  if (/\.heic$/i.test(file)) {
    return Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.95 }));
  }
  if (/\.nef$/i.test(file)) {
    return extractEmbeddedJpeg(buf, path.basename(file));
  }
  return buf;
}

/* ------------------------------------------------------------------ marca */

/**
 * El wordmark original es negro sobre crema. Para el navbar y el footer
 * (fondo oscuro) hay que invertir solo el texto y conservar el aguila dorada,
 * asi que se recolorean los pixeles oscuros y poco saturados a `bone`.
 */
async function buildLogoLight(source, dest) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const bone = [0xe9, 0xed, 0xe1];
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (data[i + 3] === 0) continue;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    // Negro y grises del wordmark: baja saturacion + baja luminancia.
    if (saturation < 0.28 && max < 150) {
      const lift = 1 - max / 150; // conserva el antialias de los remates
      data[i] = Math.round(r + (bone[0] - r) * lift);
      data[i + 1] = Math.round(g + (bone[1] - g) * lift);
      data[i + 2] = Math.round(b + (bone[2] - b) * lift);
    }
  }

  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(dest);
}

/** Recorta el sobrante transparente y normaliza el isotipo del aguila. */
async function buildIsotipo(source, dest) {
  await sharp(source)
    .ensureAlpha()
    .trim({ threshold: 10 })
    .resize({ width: 1024, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(dest);
}

async function buildBrand() {
  ensure(OUT.brand);
  const wordmark = path.join(SRC.logos, 'LOGO DEFINITIVO EMMPORIO JURIDICO curvas-01 (1).png');
  const isotipoSrc = path.join(SRC.logos, 'Logo fondo .PNG');

  if (!exists(wordmark) || !exists(isotipoSrc)) {
    console.warn('  ! Faltan los logos originales, se omite la marca.');
    return;
  }

  await buildLogoLight(wordmark, path.join(OUT.brand, 'logo-light.png'));
  // Version original (negra) para fondos claros y documentos impresos.
  await sharp(wordmark).png({ compressionLevel: 9 }).toFile(path.join(OUT.brand, 'logo-dark.png'));
  await buildIsotipo(isotipoSrc, path.join(OUT.brand, 'isotipo.png'));
  console.log('  logo-light.png / logo-dark.png / isotipo.png');

  const isotipo = fs.readFileSync(path.join(OUT.brand, 'isotipo.png'));

  // Favicons: isotipo dorado centrado sobre `base`.
  for (const size of [32, 180, 512]) {
    const pad = Math.round(size * 0.12);
    const icon = await sharp(isotipo)
      .resize(size - pad * 2, size - pad * 2, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();
    const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`;
    await sharp({ create: { width: size, height: size, channels: 4, background: BASE } })
      .composite([{ input: icon, gravity: 'center' }])
      .png()
      .toFile(path.join('public', name));
  }
  fs.copyFileSync('public/favicon-32.png', 'public/favicon.png');
  console.log('  favicon-32.png / favicon-512.png / apple-touch-icon.png');

  // Open Graph 1200x630 con el wordmark invertido sobre `base`.
  const og = await sharp(path.join(OUT.brand, 'logo-light.png'))
    .resize({ width: 820, fit: 'inside' })
    .toBuffer();
  const rule = Buffer.from(
    '<svg width="1200" height="630"><rect x="0" y="612" width="1200" height="18" fill="#B08048"/></svg>'
  );
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: BASE } })
    .composite([
      { input: og, gravity: 'center' },
      { input: rule, top: 0, left: 0 },
    ])
    .jpeg({ quality: 88 })
    .toFile('public/og-image.jpg');
  console.log('  og-image.jpg');
}

/* ------------------------------------------------------------------ fotos */

/**
 * Nombres de camara -> nombres kebab-case sin tildes, para que las rutas del
 * sitio describan la foto y no dependan del archivo original.
 */
const INSTALACIONES = {
  '555.jpg': 'recepcion-logo',
  'DSC_0061.JPG': 'recepcion-logo-lateral',
  '11.JPG': 'sala-juntas-ventanal',
  '2.png': 'sala-juntas-mural',
  '22.JPG': 'despacho-mapa-mundi',
  '33.jpg': 'pasillo-vidrio',
  '44.jpg': 'mural-areas-practica',
  'DSC_0004.jpg': 'despacho-ventanal',
  'DSC_0021.jpg': 'sala-juntas-mapa-mundi',
  'DSC_0022.jpg': 'sala-juntas-diplomas',
  'DSC_0049.JPG': 'recepcion-area-trabajo',
  '56GG.jpeg': 'abogada-area-atencion',
  'PHOTO-2026-09-05-14-12-40.jpg': 'abogados-con-expedientes',
  'PHOTO-2026-09-05-14-12-49.jpg': 'abogado-expediente',
  'DSC_0051.JPG': 'abogada-trabajando',
  'DSC_0059.JPG': 'abogado-despacho',
  'DSC_0058.NEF': 'socio-despacho-lectura',
  'DSC_0017.NEF': 'asesoria-clientes',
  // Fotograma de la entrevista al socio fundador. Llego por WhatsApp y es
  // vertical: en el hero se recorta a la banda con `imagePosition`.
  'WhatsApp Image 2026-09-05 at 2.10.52 PM.jpeg': 'socio-entrevista-despacho',
};

// TODO: confirmar con el cliente el nombre real de cada persona.
const EQUIPO = {
  'Edwarddd.jpg': 'edward-becerra',
  'DIANA EUSSE ABOGADA SENIOR COFUNDADORA.jpeg': 'diana-eusse',
  'Dirgooo.jpg': 'diego-paniagua',
  'DIEGO ABOGADO JUNIOR.HEIC': 'diego-paniagua-alt',
  '1.jpg': 'karen-becerra',
  'Veronicaa.jpg': 'veronica-carvajal',
};

/**
 * @param {number} [aspect]        alto / ancho del recorte final.
 * @param {object} [options]
 * @param {'cover'|'contain'} [options.fit]  'cover' recorta hasta llenar;
 *   'contain' encaja la imagen entera y rellena el resto con el color de fondo del sitio.
 *   Las piezas graficas con el titulo dentro van con 'contain': recortarlas
 *   les corta el texto.
 */
async function buildPhotos(srcDir, outDir, mapping, widths, aspect, options = {}) {
  const { fit = 'cover', position = 'top', background = BASE } = options;
  ensure(outDir);
  for (const [original, slug] of Object.entries(mapping)) {
    const file = path.join(srcDir, original);
    if (!exists(file)) {
      console.warn(`  ! No se encontro ${original}`);
      continue;
    }
    const buf = await readImage(file);

    // Avisa cuando el original no da para el ancho mayor: la foto se
    // ampliaria y se veria blanda. Hay que pedirle al cliente el original.
    const source = await sharp(buf).metadata();
    const largest = widths[widths.length - 1];
    if (source.width < largest) {
      console.warn(
        `  ! ${original}: el original mide ${source.width}px y se amplia a ${largest}px. Pedir una version de mayor resolucion.`
      );
    }

    for (const width of widths) {
      const pipeline = sharp(buf).rotate();
      if (aspect) {
        pipeline.resize(width, Math.round(width * aspect), { fit, position, background });
      } else {
        pipeline.resize({ width, withoutEnlargement: true });
      }
      await pipeline.webp({ quality: 78 }).toFile(path.join(outDir, `${slug}-${width}.webp`));
    }
    console.log(`  ${slug} (${widths.join(', ')})`);
  }
}

/* ----------------------------------------------------------- casos notables */

// Piezas graficas de los casos con repercusion publica. Llevan el titulo
// incrustado, asi que se encajan enteras (16:10) en vez de recortarse.
const CASOS = {
  'frg.jpg': 'defensa-penal-homicidio',
  'gghh.jpg': 'condena-37-anos',
  'rhfh.jpg': 'caso-metro-de-medellin',
};

/* ------------------------------------------------------- tarjetas de casos */

// Ilustraciones de cada tipo de proceso para las tarjetas de resultados.
// Se recortan a 16:10, que es la proporcion de la tarjeta.
const RESULTADOS = {
  'Derecho penal sentencia abslutoria.png': 'sentencia-absolutoria',
  'Libertad por vencimiento.png': 'libertad-por-vencimiento',
  'fallo favvorable.png': 'fallo-favorable',
  'Derecho Laboral.png': 'reintegro-laboral',
  'Derecho civil.png': 'restitucion-inmueble',
  'Derecho Familoiar.png': 'custodia-y-alimentos',
};

/* --------------------------------------------------- areas de practica */

// Foto de cabecera de cada area. La clave es el nombre tal como llego del
// cliente y el valor es el slug del area en `src/data/practiceAreas.js`, asi
// que la ruta que se guarda en los datos sale sola: /assets/areas/<slug>.
// Se recortan a 3:2 centrado, que es el punto medio entre el 4:3 de la
// tarjeta, el 16:9 del detalle y la banda ancha del PageHero.
const AREAS = {
  'penal.jpg': 'derecho-penal',
  'Maestria en derecho civil 2022.jpg': 'derecho-civil',
  'derecho-familiar.jpg': 'derecho-de-familia',
  'derecho_administrativo.width-640.webp': 'derecho-administrativo',
  'exticiondedominio.jpeg': 'extincion-de-dominio',
  'transito.avif': 'derecho-de-transito',
  'seguros.webp': 'seguros',
  'derecho-laboral-1-e1551651916418.jpg': 'derecho-laboral',
  'seguridad social.webp': 'seguridad-social',
  'derecho policivo.jpeg': 'derecho-policivo',
  'derechoempresarialcorporativocolombia2.jpg': 'derecho-corporativo',
};

/* -------------------------------------------------------------- documentos */

const DOCUMENTOS = {
  '20230627 SENTENCIA INOCENCIA YOLBER.pdf': 'sentencia-absolutoria-2023.pdf',
  '20260727 LIBERTAD POR VENCIMIENTO DE TERMINOS.pdf': 'libertad-por-vencimiento-de-terminos.pdf',
  'SENTENCIA GUILLERMO GARZON.pdf': 'sentencia-favorable-proceso-penal.pdf',
};

function buildDocumentos() {
  ensure(OUT.documentos);
  for (const [original, slug] of Object.entries(DOCUMENTOS)) {
    const file = path.join(SRC.documentos, original);
    if (!exists(file)) {
      console.warn(`  ! No se encontro ${original}`);
      continue;
    }
    fs.copyFileSync(file, path.join(OUT.documentos, slug));
    console.log(`  ${slug}`);
  }
}

/* ------------------------------------------------------------------ videos */

/**
 * Los videos del cliente vienen como grabaciones de pantalla de varios GB, que
 * no se pueden publicar tal cual. Se recodifican a H.264 720p a 30 fps con
 * `faststart` (para que empiecen a reproducirse sin descargar el archivo
 * entero) y se extrae un fotograma de portada.
 *
 * El reproductor usa `preload="none"`, asi que el peso del video no afecta la
 * carga de la pagina: solo se descarga si el visitante le da play.
 */
const VIDEOS = {
  'ScreenRecording_08-31-2026 22-56-31_1.mov': {
    slug: 'entrevista-conducta-delictiva',
    // Momento del que se toma la portada: el socio hablando en plano medio.
    poster: '00:08:30',
  },
};

function runFfmpeg(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (result.status !== 0) {
    throw new Error(result.stderr?.toString().split('\n').slice(-6).join('\n') || 'ffmpeg falló');
  }
}

async function buildVideos() {
  ensure(OUT.prensa);

  for (const [original, config] of Object.entries(VIDEOS)) {
    const file = path.join(SRC.prensa, original);
    if (!exists(file)) {
      console.warn(`  ! No se encontro ${original}`);
      continue;
    }

    const mp4 = path.join(OUT.prensa, `${config.slug}.mp4`);
    const partial = path.join(OUT.prensa, `${config.slug}.parcial.mp4`);
    const posterJpg = path.join(OUT.prensa, `${config.slug}-poster.jpg`);

    // Recodificar es lento, asi que se omite si la salida ya esta al dia.
    const upToDate =
      exists(mp4) && fs.statSync(mp4).mtimeMs >= fs.statSync(file).mtimeMs;

    if (upToDate) {
      console.log(`  ${config.slug}.mp4 (ya estaba al dia)`);
    } else {
      console.log(`  ${config.slug}.mp4 — recodificando, puede tardar varios minutos…`);
      // Se codifica a un archivo aparte y solo al terminar se renombra: si el
      // proceso se corta a mitad, no queda un .mp4 truncado (sin el atomo
      // `moov`) que ademas seria mas nuevo que el original y por tanto se daria
      // por bueno en la siguiente pasada.
      runFfmpeg([
        '-hide_banner',
        '-loglevel', 'error',
        '-i', file,
        '-vf', 'scale=1280:-2,fps=30',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '27',
        '-profile:v', 'high',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '96k',
        '-movflags', '+faststart',
        partial,
        '-y',
      ]);
      fs.renameSync(partial, mp4);
      const mb = (fs.statSync(mp4).size / 1024 / 1024).toFixed(1);
      const original_mb = (fs.statSync(file).size / 1024 / 1024).toFixed(0);
      console.log(`  ${config.slug}.mp4 — ${original_mb} MB -> ${mb} MB`);
    }

    // Portada: se genera siempre porque es instantanea.
    runFfmpeg([
      '-hide_banner',
      '-loglevel', 'error',
      '-ss', config.poster,
      '-i', mp4,
      '-frames:v', '1',
      '-q:v', '2',
      posterJpg,
      '-y',
    ]);

    for (const width of [800, 1600]) {
      await sharp(posterJpg)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(path.join(OUT.prensa, `${config.slug}-${width}.webp`));
    }
    fs.rmSync(posterJpg);
    console.log(`  ${config.slug} portada (800, 1600)`);
  }
}

/* -------------------------------------------------------------------- main */

console.log('\nMarca');
await buildBrand();
console.log('\nInstalaciones');
await buildPhotos(SRC.instalaciones, OUT.instalaciones, INSTALACIONES, [800, 1600]);
console.log('\nEquipo');
await buildPhotos(SRC.socios, OUT.equipo, EQUIPO, [600, 1200], 4 / 3);
await buildPhotos(SRC.casos, OUT.casos, CASOS, [800, 1600], 10 / 16, { fit: 'contain' });
await buildPhotos(SRC.resultados, OUT.resultados, RESULTADOS, [800, 1600], 10 / 16, {
  position: 'centre',
});
console.log('\nAreas de practica');
await buildPhotos(SRC.areas, OUT.areas, AREAS, [800, 1600], 2 / 3, { position: 'centre' });
console.log('\nDocumentos');
buildDocumentos();
console.log('\nPrensa');
await buildVideos();
console.log('\nListo.\n');
