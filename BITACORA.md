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

## 2026-10-27 · Investigación LTX-2.5 (generación de vídeo con IA)
- **Objetivo:** valorar LTX-2.5 (Lightricks) para generar los clips de los vídeos en lugar de Google Vids o junto a él.
- **Qué es:** modelo de vídeo con pesos abiertos (Hugging Face) que genera vídeo y audio sincronizados.
- **Vías de uso:**
  1. API alojada (fal, nodos de socio de ComfyUI): de pago por segundo, sin GPU propia. Es la opción más sencilla.
  2. Local / autoalojado (ComfyUI o Diffusers): requiere GPU potente y aceptar la licencia de Hugging Face.
- **Licencia:** LTX-2.x Community License. Uso comercial gratuito para empresas con menos de 10 M$ de ingresos anuales (verificar condiciones).
- **Pendiente:** confirmar precio oficial en la web de Lightricks, probar un clip de 10 s con el prompt del video 01 y comparar con Google Vids.
