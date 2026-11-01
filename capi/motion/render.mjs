// Uso: node render.mjs ../proyectos/<carpeta>/guion-motion.json
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const guionPath = path.resolve(process.argv[2] || '');
if (!fs.existsSync(guionPath)) { console.error('Uso: node render.mjs <guion-motion.json>'); process.exit(1); }
const dir = path.dirname(guionPath);
const guion = JSON.parse(fs.readFileSync(guionPath, 'utf8'));
const FPS = 30;
const pub = path.join(here, 'public');
fs.rmSync(pub, {recursive: true, force: true});
fs.mkdirSync(path.join(pub, 'poses'), {recursive: true});
fs.mkdirSync(path.join(pub, 'audio'), {recursive: true});

const posesDir = path.join(here, '..', 'assets', 'poses');
const poseFiles = {};
for (const f of fs.readdirSync(posesDir)) {
  const m = f.match(/^(.+)\.(png|webp|jpg|jpeg)$/i);
  if (m) { fs.copyFileSync(path.join(posesDir, f), path.join(pub, 'poses', f)); poseFiles[m[1]] = f; }
}
const audioDur = (p) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]).toString());

const escenas = guion.escenas.map((e, i) => {
  const poseFile = poseFiles[e.pose] || poseFiles['saludo'];
  if (!poseFiles[e.pose]) console.log(`  aviso: pose '${e.pose}' no existe, uso 'saludo'`);
  let secs = e.duracion || Math.max(2.4, e.texto.split(' ').length / 2.6 + 0.5);
  let audio = null;
  const a = path.join(dir, 'audio', `${i + 1}.mp3`);
  if (fs.existsSync(a)) { fs.copyFileSync(a, path.join(pub, 'audio', `${i + 1}.mp3`)); audio = `audio/${i + 1}.mp3`; secs = audioDur(a) + 0.3; }
  return {...e, poseFile, audio, frames: Math.ceil(secs * FPS)};
});

console.log('Empaquetando...');
const serveUrl = await bundle({entryPoint: path.join(here, 'src', 'index.ts'), publicDir: pub});
const inputProps = {escenas, proyecto: guion.titulo || ''};
const browserExecutable = process.env.CHROME_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const comp = await selectComposition({serveUrl, id: 'Capi', inputProps, browserExecutable});
const out = path.join(dir, 'video-motion.mp4');
let last = -1;
await renderMedia({composition: comp, serveUrl, codec: 'h264', outputLocation: out, inputProps, browserExecutable,
  logLevel: 'verbose', concurrency: 3,
  onProgress: ({progress}) => { const p = Math.floor(progress * 10); if (p !== last) { last = p; console.log(`  ${p * 10}%`); } }});
console.log(`\nListo: ${out}  (${(comp.durationInFrames / FPS).toFixed(1)} s)`);
