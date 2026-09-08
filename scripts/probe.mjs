import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const dirs = ['LOGOS EMMPORIO','FOTOGRAFIAS INSTALACIONES','FOTOGRAFIAS SOCIOS'];
for (const d of dirs) {
  console.log('==='+d+'===');
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d,f);
    try {
      const m = await sharp(p).metadata();
      console.log(`${f} :: ${m.width}x${m.height} ${m.format} alpha=${m.hasAlpha} orient=${m.orientation||'-'}`);
    } catch (e) { console.log(`${f} :: UNREADABLE (${e.message.slice(0,60)})`); }
  }
}
