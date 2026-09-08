import convert from 'heic-convert';
import fs from 'node:fs';
import sharp from 'sharp';
const f='FOTOGRAFIAS SOCIOS/DIEGO ABOGADO JUNIOR.HEIC';
const buf = await convert({ buffer: fs.readFileSync(f), format:'JPEG', quality:0.9 });
const m = await sharp(Buffer.from(buf)).metadata();
console.log('decoded', m.width, m.height, m.format);
