import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const out = process.argv[2]; fs.mkdirSync(out,{recursive:true});
const jobs = [
  ...fs.readdirSync('FOTOGRAFIAS INSTALACIONES').filter(f=>/\.(jpe?g|png)$/i.test(f)).map(f=>['FOTOGRAFIAS INSTALACIONES',f,'inst']),
  ...fs.readdirSync('FOTOGRAFIAS SOCIOS').map(f=>['FOTOGRAFIAS SOCIOS',f,'socio']),
];
for (const [d,f,tag] of jobs) {
  const dest = path.join(out, `${tag}__${f.replace(/[^a-z0-9._-]/gi,'_')}.jpg`);
  try { await sharp(path.join(d,f)).rotate().resize({width:420}).jpeg({quality:70}).toFile(dest); console.log('OK '+dest); }
  catch(e){ console.log('FAIL '+f+' :: '+e.message.slice(0,80)); }
}
