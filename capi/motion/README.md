# Capi Motion (motion graphics con Remotion)

Estilo: movimiento constante, cortes rápidos, elementos que ilustran lo que se dice.

```bash
cd capi/motion && npm install            # una vez
python3 voz.py ../proyectos/<x>/guion-motion.json   # genera la voz (pip install edge-tts, necesita internet)
node render.mjs ../proyectos/<x>/guion-motion.json   # genera video-motion.mp4
npm run studio                            # opcional: vista previa en el navegador
```

Si no hay `audio/N.mp3`, la duración de cada escena se calcula por nº de palabras (o `duracion` en segundos).

## Tipos de escena (`tipo`)
| tipo | Qué muestra | Campos extra |
|---|---|---|
| `gancho` | símbolo gigante que pulsa | `simbolo` ("?", "!", "$") |
| `contador` | cifra que sube animada | `desde`, `valor`, `prefijo`, `sufijo`, `etiqueta` |
| `barras` | barras que crecen | `items[{etiqueta,valor,color}]`, `sufijo` |
| `grafico` | línea que se dibuja | `tendencia` ("sube"/"baja"), `etiqueta` |
| `lista` | tarjetas que entran de los lados | `items[]` |
| `icono` | icono con monedas cayendo | `icono` (hucha, cohete, moneda, billete), `etiqueta` |
| `cierre` | botón pulsante + flecha | `boton` |

Todas llevan: título cinético, subtítulo palabra a palabra, fondo con rayos y monedas, barrido de transición, chispas y Capi rebotando (`pose`).
