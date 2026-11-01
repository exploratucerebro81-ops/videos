# Capi Video Builder

Convierte un `guion.json` en un vídeo vertical 9:16 con la voz de Capi, subtítulos y zoom suave.

```bash
pip install edge-tts pillow        # ffmpeg también debe estar instalado
python3 capi/build.py capi/proyectos/video-03-ejemplo/guion.json
```

## Flujo para cada vídeo nuevo
1. Pedir a Claude el guion (tema → escenas) → se guarda en `capi/proyectos/<nombre>/guion.json`.
2. Generar las poses que falten con `PROMPTS-CAPI.md` y guardarlas en `capi/assets/poses/`.
3. Ejecutar `build.py` → sale `video.mp4` en la misma carpeta.

## Campos del guion
- `voz`: `es-ES-AlvaroNeural` (hombre), `es-ES-ElviraNeural` (mujer), `es-MX-JorgeNeural`, `es-AR-TomasNeural`...
- `velocidad`: `+8%` (más rápido = más retención en Shorts).
- `escenas[]`: `texto` (lo que dice y se subtitula), `titulo` (texto grande arriba, opcional), `pose` (nombre del archivo).

## Extras opcionales
- `assets/musica.mp3` → se mezcla automáticamente a volumen bajo.
- `assets/fuente.ttf` → tipografía propia (Montserrat Bold, Bangers...).
