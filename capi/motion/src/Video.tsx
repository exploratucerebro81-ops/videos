import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig} from 'remotion';

const FONT = '"Arial Black","DejaVu Sans",Impact,sans-serif';
const YELLOW = '#FFD43B';
const PALETAS = [
  ['#2b1055', '#7597de', '#FFD43B'],
  ['#0f2027', '#2c7a5b', '#FFD43B'],
  ['#41295a', '#e5405e', '#FFE259'],
  ['#0b3d91', '#1fb6ff', '#FFD43B'],
  ['#1d0b3a', '#9d2fd0', '#7CFF6B'],
];
const stroke = (px: number): React.CSSProperties => ({
  WebkitTextStroke: `${px}px #111`, paintOrder: 'stroke fill', fontFamily: FONT, fontWeight: 900,
});

/* ---------- Iconos SVG ---------- */
const Coin: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FFC107" stroke="#B8860B" strokeWidth="6" />
    <circle cx="50" cy="50" r="33" fill="none" stroke="#FFE082" strokeWidth="4" />
    <text x="50" y="67" textAnchor="middle" fontSize="48" fontWeight="900" fill="#B8860B" fontFamily="Arial">$</text>
  </svg>
);
const Bill: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 200 110">
    <rect x="4" y="4" width="192" height="102" rx="12" fill="#66BB6A" stroke="#1B5E20" strokeWidth="6" />
    <circle cx="100" cy="55" r="30" fill="#A5D6A7" stroke="#1B5E20" strokeWidth="4" />
    <text x="100" y="71" textAnchor="middle" fontSize="46" fontWeight="900" fill="#1B5E20" fontFamily="Arial">$</text>
  </svg>
);
const Hucha: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <ellipse cx="100" cy="115" rx="78" ry="60" fill="#F8A5B0" stroke="#C2185B" strokeWidth="6" />
    <polygon points="62,62 72,28 98,56" fill="#EF7A8A" stroke="#C2185B" strokeWidth="5" />
    <rect x="70" y="160" width="22" height="30" rx="6" fill="#EF7A8A" stroke="#C2185B" strokeWidth="5" />
    <rect x="124" y="160" width="22" height="30" rx="6" fill="#EF7A8A" stroke="#C2185B" strokeWidth="5" />
    <ellipse cx="172" cy="118" rx="22" ry="17" fill="#EF7A8A" stroke="#C2185B" strokeWidth="5" />
    <circle cx="166" cy="118" r="4" fill="#C2185B" /><circle cx="180" cy="118" r="4" fill="#C2185B" />
    <circle cx="136" cy="92" r="7" fill="#222" />
    <rect x="80" y="62" width="50" height="9" rx="4" fill="#7B1038" />
  </svg>
);
const Cohete: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <path d="M100 10 C140 40 150 100 140 140 L60 140 C50 100 60 40 100 10Z" fill="#ECEFF1" stroke="#263238" strokeWidth="6" />
    <circle cx="100" cy="78" r="20" fill="#29B6F6" stroke="#263238" strokeWidth="6" />
    <path d="M60 110 L25 150 L62 140Z M140 110 L175 150 L138 140Z" fill="#E53935" stroke="#263238" strokeWidth="6" />
    <path d="M78 146 Q100 200 122 146Z" fill="#FF9800" stroke="#E65100" strokeWidth="5" />
  </svg>
);
const ICONOS: Record<string, React.FC<{size: number}>> = {hucha: Hucha, cohete: Cohete, moneda: Coin, billete: Bill};

/* ---------- Fondo siempre en movimiento ---------- */
const Fondo: React.FC<{p: number}> = ({p}) => {
  const f = useCurrentFrame();
  const [c1, c2] = PALETAS[p % PALETAS.length];
  return (
    <AbsoluteFill style={{background: `linear-gradient(${160 + Math.sin(f / 40) * 18}deg, ${c1}, ${c2})`}}>
      <AbsoluteFill style={{opacity: 0.13, transform: `rotate(${f * 0.7}deg) scale(2.2)`,
        background: 'repeating-conic-gradient(from 0deg at 50% 42%, #fff 0deg 7deg, transparent 7deg 22deg)'}} />
      {Array.from({length: 11}).map((_, i) => {
        const sp = 3 + (i % 4) * 1.6;
        const y = 2100 - ((f * sp + i * 260) % 2400);
        const x = (i * 197) % 1000 + Math.sin(f / 20 + i) * 30;
        const sx = Math.abs(Math.cos(f / 7 + i));
        return <div key={i} style={{position: 'absolute', left: x, top: y, opacity: 0.55,
          transform: `scaleX(${0.25 + sx * 0.75})`}}><Coin size={50 + (i % 3) * 22} /></div>;
      })}
    </AbsoluteFill>
  );
};

/* ---------- Transición de entrada + chispas ---------- */
const Barrido: React.FC<{accent: string}> = ({accent}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 11], [0, 125], {extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  const x2 = interpolate(f, [2, 13], [0, 125], {extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  if (f > 14) return null;
  return (<>
    <div style={{position: 'absolute', inset: 0, background: '#111', transform: `translateX(${x2}%) skewX(-12deg)`}} />
    <div style={{position: 'absolute', inset: 0, background: accent, transform: `translateX(${x}%) skewX(-12deg)`}} />
  </>);
};
const Chispas: React.FC<{accent: string}> = ({accent}) => {
  const f = useCurrentFrame() - 6;
  if (f < 0 || f > 26) return null;
  return (<>{Array.from({length: 16}).map((_, i) => {
    const a = (i / 16) * Math.PI * 2, d = f * (16 + (i % 3) * 7);
    return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * d, top: 760 + Math.sin(a) * d,
      width: 18, height: 18, borderRadius: 9, background: i % 2 ? accent : '#fff', opacity: 1 - f / 26}} />;
  })}</>);
};

/* ---------- Capi (aparece con rebote y nunca está quieto) ---------- */
const Capi: React.FC<{poseFile: string; size: number; x: number; y: number; flip?: boolean}> = ({poseFile, size, x, y, flip}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 5, fps, config: {damping: 8, stiffness: 150}});
  const bob = Math.sin(f / 5) * 16, rot = Math.sin(f / 8) * 4;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: size, height: size,
      transform: `translateY(${bob}px) rotate(${rot}deg) scale(${s * (flip ? -1 : 1)}, ${s})`,
      filter: 'drop-shadow(0 18px 0 rgba(0,0,0,.28))'}}>
      <Img src={staticFile(`poses/${poseFile}`)} style={{width: '100%', height: '100%'}} />
    </div>
  );
};

/* ---------- Títulos cinéticos y subtítulos palabra a palabra ---------- */
const Titulo: React.FC<{text: string; top?: number; size?: number; accent: string}> = ({text, top = 90, size = 112, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div style={{position: 'absolute', top, left: 40, right: 40, display: 'flex', flexWrap: 'wrap',
      justifyContent: 'center', gap: '0 26px'}}>
      {words.map((w, i) => {
        const s = spring({frame: f - 3 - i * 4, fps, config: {damping: 7, stiffness: 170}});
        const rot = (1 - Math.min(1, s)) * (i % 2 ? 14 : -14) + Math.sin(f / 7 + i) * 2;
        return <span key={i} style={{...stroke(16), fontSize: size, lineHeight: 1.05, color: i % 2 ? accent : '#fff',
          display: 'inline-block', transform: `scale(${s}) rotate(${rot}deg) translateY(${Math.sin(f / 6 + i) * 6}px)`}}>{w}</span>;
      })}
    </div>
  );
};
const Subtitulos: React.FC<{text: string; frames: number; accent: string}> = ({text, frames, accent}) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  const act = Math.min(words.length - 1, Math.floor((f / Math.max(1, frames - 10)) * words.length));
  return (
    <div style={{position: 'absolute', top: 1690, left: 50, right: 50, display: 'flex', flexWrap: 'wrap',
      justifyContent: 'center', gap: '0 22px'}}>
      {words.map((w, i) => (
        <span key={i} style={{...stroke(9), fontSize: 58, lineHeight: 1.15, display: 'inline-block',
          color: i === act ? accent : '#fff', transform: `translateY(${i === act ? -8 : 0}px) scale(${i === act ? 1.06 : 1})`,
          opacity: i <= act ? 1 : 0.35}}>{w}</span>
      ))}
    </div>
  );
};

/* ---------- Escenas visuales (zona central y: 420-1050) ---------- */
const ZONA: React.CSSProperties = {position: 'absolute', left: 0, right: 0, top: 420, height: 640,
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'};

const Gancho: React.FC<{e: any; accent: string}> = ({e, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 6, fps, config: {damping: 6, stiffness: 120}});
  return <div style={ZONA}><div style={{...stroke(22), fontSize: 560, color: accent, lineHeight: 1,
    transform: `scale(${s * (1 + Math.sin(f / 4) * 0.06)}) rotate(${Math.sin(f / 6) * 7}deg)`}}>{e.simbolo || '?'}</div></div>;
};
const Contador: React.FC<{e: any; accent: string; frames: number}> = ({e, accent, frames}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [8, Math.max(20, frames - 12)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const n = Math.round((e.desde ?? 0) + ((e.valor) - (e.desde ?? 0)) * t);
  const pulse = 1 + Math.sin(f / 3) * 0.04;
  return <div style={ZONA}>
    <div style={{...stroke(18), fontSize: 210, color: accent, transform: `scale(${pulse})`}}>
      {e.prefijo || ''}{n.toLocaleString('es-ES')}{e.sufijo || ''}</div>
    <div style={{...stroke(10), fontSize: 66, color: '#fff', marginTop: 10}}>{e.etiqueta}</div>
  </div>;
};
const Barras: React.FC<{e: any; accent: string}> = ({e, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = e.items || [];
  const max = Math.max(...items.map((i: any) => i.valor));
  return <div style={{...ZONA, flexDirection: 'row', alignItems: 'flex-end', gap: 70, paddingBottom: 20}}>
    {items.map((it: any, i: number) => {
      const s = spring({frame: f - 8 - i * 7, fps, config: {damping: 10, stiffness: 90}});
      const h = Math.max(30, (it.valor / max) * 430) * s;
      return <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{...stroke(10), fontSize: 70, color: '#fff', marginBottom: 8}}>{it.valor}{e.sufijo || ''}</div>
        <div style={{width: 230, height: h, background: it.color || (i ? accent : '#ff5252'), borderRadius: '20px 20px 0 0',
          border: '8px solid #111', borderBottom: 'none', transform: `translateY(${Math.sin(f / 5 + i) * 5}px)`}} />
        <div style={{...stroke(8), fontSize: 52, color: '#fff', marginTop: 10}}>{it.etiqueta}</div>
      </div>;
    })}
  </div>;
};
const Grafico: React.FC<{e: any; accent: string; frames: number}> = ({e, accent, frames}) => {
  const f = useCurrentFrame();
  const sube = e.tendencia !== 'baja';
  const pts = sube ? [[40, 400], [180, 360], [300, 380], [430, 270], [560, 290], [700, 150], [860, 60]]
                   : [[40, 60], [180, 100], [300, 80], [430, 220], [560, 200], [700, 330], [860, 400]];
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  const t = interpolate(f, [8, Math.max(20, frames - 15)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const col = sube ? '#7CFF6B' : '#ff5252';
  const L = 1200;
  const last = pts[pts.length - 1];
  return <div style={ZONA}>
    <svg width="960" height="470" viewBox="0 0 960 470">
      <path d="M20 440 H940 M20 440 V10" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".7" fill="none" />
      <path d={d} fill="none" stroke="#111" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L * (1 - t)} />
      <path d={d} fill="none" stroke={col} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L * (1 - t)} />
      <g opacity={t > 0.95 ? 1 : 0} transform={`translate(${last[0]} ${last[1]}) scale(${1 + Math.sin(f / 3) * 0.15})`}>
        <circle r="26" fill={accent} stroke="#111" strokeWidth="8" />
      </g>
    </svg>
    <div style={{...stroke(10), fontSize: 62, color: '#fff'}}>{e.etiqueta}</div>
  </div>;
};
const Lista: React.FC<{e: any; accent: string}> = ({e, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{...ZONA, gap: 26}}>
    {(e.items || []).map((it: string, i: number) => {
      const s = spring({frame: f - 8 - i * 9, fps, config: {damping: 9, stiffness: 130}});
      const x = (1 - Math.min(1, s)) * (i % 2 ? 900 : -900);
      return <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, background: '#fff', border: '8px solid #111',
        borderRadius: 30, padding: '16px 34px', minWidth: 760, transform: `translateX(${x}px) rotate(${Math.sin(f / 9 + i) * 1.2}deg)`}}>
        <div style={{...stroke(0), width: 76, height: 76, borderRadius: 38, background: accent, border: '6px solid #111', color: '#111',
          fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
        <div style={{...stroke(0), fontSize: 60, color: '#111'}}>{it}</div>
      </div>;
    })}
  </div>;
};
const Icono: React.FC<{e: any; accent: string}> = ({e, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const I = ICONOS[e.icono] || Coin;
  const s = spring({frame: f - 6, fps, config: {damping: 6, stiffness: 110}});
  return <div style={ZONA}>
    <div style={{transform: `scale(${s * (1 + Math.sin(f / 4) * 0.05)}) rotate(${Math.sin(f / 7) * 8}deg)`}}><I size={420} /></div>
    {e.etiqueta && <div style={{...stroke(10), fontSize: 64, color: accent, marginTop: 14}}>{e.etiqueta}</div>}
    {[0, 1, 2, 3, 4].map((i) => {
      const t = ((f + i * 12) % 60) / 60;
      return <div key={i} style={{position: 'absolute', left: 140 + i * 190, top: 120 + t * 420, opacity: 1 - t, transform: `scaleX(${Math.abs(Math.cos(f / 6 + i))})`}}><Coin size={70} /></div>;
    })}
  </div>;
};
const Cierre: React.FC<{e: any; accent: string}> = ({e, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 6, fps, config: {damping: 7, stiffness: 120}});
  return <div style={ZONA}>
    <div style={{fontSize: 220, transform: `translateY(${-Math.abs(Math.sin(f / 5)) * 60}px)`, color: accent, ...stroke(14)}}>▲</div>
    <div style={{...stroke(12), fontSize: 92, color: '#111', background: accent, border: '10px solid #111', borderRadius: 40,
      padding: '18px 50px', transform: `scale(${s * (1 + Math.sin(f / 3) * 0.05)})`, WebkitTextStroke: '0'}}>{e.boton || 'LINK EN LA BIO'}</div>
  </div>;
};

const VISUALES: Record<string, React.FC<any>> = {gancho: Gancho, contador: Contador, barras: Barras, grafico: Grafico, lista: Lista, icono: Icono, cierre: Cierre};

const Escena: React.FC<{e: any; idx: number; proyecto: string}> = ({e, idx, proyecto}) => {
  const f = useCurrentFrame();
  const [, , accent] = PALETAS[idx % PALETAS.length];
  const V = VISUALES[e.tipo] || Gancho;
  const punch = interpolate(f, [0, 10], [1.18, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const drift = 1 + f * 0.0008;
  const flip = idx % 2 === 1;
  const grande = e.tipo === 'gancho' || e.tipo === 'cierre';
  return (
    <AbsoluteFill>
      <Fondo p={idx} />
      <AbsoluteFill style={{transform: `scale(${punch * drift})`}}>
        {e.titulo && <Titulo text={e.titulo} accent={accent} />}
        <V e={e} accent={accent} frames={e.frames} />
        <Capi poseFile={e.poseFile} size={grande ? 760 : 640} x={flip ? 380 : 40} y={grande ? 1000 : 1060} flip={flip} />
        <Chispas accent={accent} />
      </AbsoluteFill>
      <Subtitulos text={e.texto} frames={e.frames} accent={accent} />
      <Barrido accent={accent} />
      {e.audio && <Audio src={staticFile(e.audio)} />}
    </AbsoluteFill>
  );
};

export const Video: React.FC<{escenas: any[]; proyecto: string}> = ({escenas, proyecto}) => {
  let start = 0;
  return <AbsoluteFill style={{background: '#000'}}>
    {escenas.map((e, i) => {
      const from = start; start += e.frames;
      return <Sequence key={i} from={from} durationInFrames={e.frames}><Escena e={e} idx={i} proyecto={proyecto} /></Sequence>;
    })}
  </AbsoluteFill>;
};
