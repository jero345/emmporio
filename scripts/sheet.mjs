import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
import convert from 'heic-convert';
const SC='C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Pictures-emporio-juridico/748e6742-b105-439f-bbd5-fbcd1f82c930/scratchpad';
async function load(p){
  if(/\.heic$/i.test(p)) return Buffer.from(await convert({buffer:fs.readFileSync(p),format:'JPEG',quality:0.9}));
  return fs.readFileSync(p);
}
async function sheet(files, outName, cols, cw, ch){
  const rows = Math.ceil(files.length/cols);
  const tiles = [];
  for (let i=0;i<files.length;i++){
    const b = await load(files[i]);
    const img = await sharp(b).rotate().resize(cw,ch,{fit:'cover'}).composite([{
      input: Buffer.from(`<svg width="${cw}" height="${ch}"><rect x="0" y="0" width="46" height="34" fill="#000"/><text x="10" y="25" font-size="24" fill="#fff" font-family="Arial">${i+1}</text></svg>`),
      top:0,left:0
    }]).jpeg({quality:72}).toBuffer();
    tiles.push({input:img, left:(i%cols)*cw, top:Math.floor(i/cols)*ch});
    console.log(`${i+1} = ${files[i]}`);
  }
  await sharp({create:{width:cols*cw,height:rows*ch,channels:3,background:'#222'}}).composite(tiles).jpeg({quality:75}).toFile(path.join(SC,outName));
  console.log('-> '+outName);
}
const inst = fs.readdirSync('FOTOGRAFIAS INSTALACIONES').filter(f=>/\.(jpe?g|png)$/i.test(f)).map(f=>'FOTOGRAFIAS INSTALACIONES/'+f);
const soc = fs.readdirSync('FOTOGRAFIAS SOCIOS').map(f=>'FOTOGRAFIAS SOCIOS/'+f);
await sheet(inst,'sheet-inst.jpg',4,380,253);
console.log('=====');
await sheet(soc,'sheet-soc.jpg',3,300,400);
