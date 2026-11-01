# Bitácora del proyecto (memoria para graphify)

## 2026-10-01 · Inicio + refinamiento
- **Proyecto:** vídeos ultracortos (10 s) con Google Vids para llevar tráfico a FinanzAcademy.
- **Iteración 1:** 50-55 s, con plantilla gratuita.
- **Iteración 2:** 15-20 s, puro gancho de curiosidad, sin revelar el secreto.
- **Iteración 3 (final):** 10 s máximo, contraste visual (dos flujos de dinero), CTA a bio.

## Decisiones clave
- **Duración:** 10 segundos (máximo engagement en TikTok/Reels/Shorts).
- **Formato:** 9:16 vertical.
- **Gancho:** pregunta + contraste visual (lo que hace la mayoría vs. lo que hace quien ahorra).
- **Sin resolver:** el secreto completo está en la web (engacha al click).
- **CTA:** "Click link in bio" (directo, sin ambigüedad).
- **Idioma de prompts:** inglés (Google Vids lo recomienda).

## Archivos generados
- `guiones/video-01-por-que-no-te-llega-a-fin-de-mes.md` → guion final (10 s, inglés).
- `prompts/google-vids-video-01-english.md` → prompts detallados con notas.
- `prompts/google-vids-copypaste.txt` → prompts listos para copiar/pegar en Google Vids.
- `ideas/banco-de-ideas.md` → 10 ideas para siguientes vídeos.

## Siguiente paso
- Entrar a Google Vids, copiar los 4 prompts, generar las escenas.
- Probar voiceover (texto-a-voz o grabar propio).
- Exportar, revisar timing (debe ser exactamente 10 s).
- Publicar en Instagram Reels, TikTok, YouTube Shorts.

## 2026-11-01 · Nuevo: Capi Video Builder (automatización)
- **Mascota:** Capi, cerdito con traje, gafas pixeladas y cadena de $. Protagonista de todos los vídeos.
- **Decisiones:** temática finanzas, formato vertical corto (Shorts/TikTok), español, casi 100% automático.
- **Imágenes:** las genera Justin con IA usando `capi/PROMPTS-CAPI.md` (bloque base + 13 poses).
- **Motor:** `capi/build.py` (guion.json → voz edge-tts → fotogramas Pillow → montaje ffmpeg → video.mp4).
- **Probado:** vídeo de ejemplo `capi/proyectos/video-03-ejemplo` (18 s) con la pose `saludo`.
- **Nota:** edge-tts no tiene red en el entorno cloud; en local sí. Sin red usa silencio estimado.
- **Siguiente paso:** Justin genera las 13 poses → Claude escribe guiones en lote → mejoras (fondos, cambio de pose animado, música).

## 2026-11-01 · Capi Motion (cambio de estilo)
- **Justin pide:** casi todo el vídeo en motion graphics, movimiento constante, muy llamativo, elementos que ilustran el tema (no solo fotos con zoom).
- **Motor nuevo:** `capi/motion/` (Remotion + React). Escenas: gancho, contador, barras, gráfico, lista, icono, cierre.
- **Probado:** `capi/proyectos/video-04-motion/guion-motion.json` → 34 s, ~3 min de render en el entorno cloud.
- **Pendiente:** el estilo exacto de los canales de referencia (no he podido verlos; esperar capturas de Justin) y las 13 poses de Capi (ahora todo usa `saludo`).
- **Aviso:** el motor antiguo `capi/build.py` (foto + zoom) queda como plan B simple.
