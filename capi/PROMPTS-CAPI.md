# Capi · Ficha de personaje y prompts de imágenes

Imagen de referencia: `assets/poses/saludo.webp` (cerdito rosa, traje gris, camisa lila, corbata morada,
gafas pixeladas negras "thug life", cadena dorada con medalla $, reloj dorado, billetes en el bolsillo).

## Reglas para que Capi se vea SIEMPRE igual
1. Sube SIEMPRE la imagen de referencia al generador (ChatGPT/Gemini/Midjourney `--cref`/Leonardo).
2. Pega primero el **BLOQUE BASE**, luego añade la línea de **POSE**.
3. Fondo transparente o blanco liso (si es blanco, quítalo con remove.bg / Canva "Quitar fondo").
4. Cuadrado 1:1, mínimo 1600x1600, guardar como PNG con el nombre de la pose (ej. `sorpresa.png`) en `capi/assets/poses/`.

## BLOQUE BASE (copiar siempre)
```
Using the attached reference image, draw the SAME character: Capi, a cute chubby pink pig cartoon mascot
wearing pixelated black pixel sunglasses, a dark grey suit, a lilac shirt, a purple tie, a thick gold chain
with a gold dollar coin medallion, a gold wristwatch and dollar bills in the suit pocket.
Style: flat vector sticker illustration, clean thick-free outlines, soft pastel pink, same colors and
proportions as the reference, full body, centered, plain pure white background, no shadow, no text.
Square 1:1.
```

## POSES (añadir después del bloque base)
| Archivo | Cuándo se usa | Línea a añadir |
|---|---|---|
| `saludo` | Intro / cierre | Pose: waving with one hand, big smile. |
| `sorpresa` | Dato impactante | Pose: shocked, hands on cheeks, sunglasses pushed up, mouth wide open. |
| `pensando` | Pregunta / duda | Pose: hand on chin, thinking, looking up, one eyebrow raised. |
| `señalando` | Explicar / "mira esto" | Pose: pointing with index finger to the side, confident smirk. |
| `dinero` | Ganar / ingresos | Pose: throwing a handful of dollar bills in the air, laughing. |
| `triste` | Problema / deudas | Pose: sad, head down, empty pockets turned out, sunglasses slipping. |
| `enfadado` | Errores / estafas | Pose: angry, fists clenched, frowning, steam from ears. |
| `pulgar` | Consejo / aprobación | Pose: thumbs up with a wink, proud smile. |
| `corriendo` | Urgencia / prisa | Pose: running fast, side view, coins flying behind. |
| `contando` | Cálculos / cifras | Pose: holding a calculator in one hand and a coin in the other. |
| `ahorrando` | Ahorro / hucha | Pose: dropping a coin into a golden piggy bank held in both hands. |
| `rico` | Libertad financiera | Pose: lying on a pile of gold coins and cash, arms behind head, relaxed. |
| `llamada` | CTA / "link en la bio" | Pose: pointing upward with both hands, big excited smile. |

## Objetos sueltos (opcional, para decorar escenas)
Mismo estilo, fondo blanco: `hucha dorada`, `pila de monedas`, `gráfico subiendo con flecha verde`,
`calculadora`, `cartera vacía`, `tarjeta de crédito rota`, `reloj de arena con monedas`, `cohete con símbolo $`.

## Fondos (opcional)
Vertical 9:16, estilo plano degradado, sin personajes: oficina moderna / ciudad de noche / playa con palmeras /
cámara acorazada del banco. Se pueden guardar en `capi/assets/fondos/` (siguiente mejora del motor).
