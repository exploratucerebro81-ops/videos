#!/usr/bin/env python3
"""Capi Video Builder: guion.json -> video.mp4 (9:16, voz en español, subtítulos, zoom).

Uso:  python3 capi/build.py capi/proyectos/<carpeta>/guion.json
Requisitos: ffmpeg, pip install edge-tts pillow
"""
import asyncio, json, subprocess, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
ROOT = Path(__file__).parent
POSES = ROOT / "assets" / "poses"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_ALT = ROOT / "assets" / "fuente.ttf"  # si pones tu fuente aquí (p.ej. Montserrat Bold), se usa


def font(size):
    for p in (FONT_ALT, FONT):
        try:
            return ImageFont.truetype(str(p), size)
        except OSError:
            pass
    return ImageFont.load_default()


def gradient(c1, c2):
    top = Image.new("RGB", (1, 2))
    top.putpixel((0, 0), tuple(int(c1[i:i+2], 16) for i in (1, 3, 5)))
    top.putpixel((0, 1), tuple(int(c2[i:i+2], 16) for i in (1, 3, 5)))
    return top.resize((W, H), Image.BILINEAR)


def pose_path(name):
    for ext in ("png", "webp", "jpg"):
        p = POSES / f"{name}.{ext}"
        if p.exists():
            return p
    print(f"  aviso: pose '{name}' no existe, uso 'saludo'")
    return pose_path("saludo")


def draw_text(img, text, y, size, fill="white", stroke=10, width=22):
    d = ImageDraw.Draw(img)
    f = font(size)
    lines = textwrap.wrap(text, width=width)
    lh = int(size * 1.2)
    for i, line in enumerate(lines):
        w = d.textlength(line, font=f)
        d.text(((W - w) / 2, y + i * lh), line, font=f, fill=fill,
               stroke_width=stroke, stroke_fill="black")
    return y + len(lines) * lh


def render_frame(scene, cfg, out):
    img = gradient(*cfg.get("fondo", ["#1b1f3b", "#4b2fa3"])).convert("RGBA")
    pose = Image.open(pose_path(scene.get("pose", "saludo"))).convert("RGBA")
    size = int(W * 0.95)
    pose = pose.resize((size, size), Image.LANCZOS)
    img.alpha_composite(pose, ((W - size) // 2, 420))
    if scene.get("titulo"):  # texto grande arriba (gancho, cifras)
        draw_text(img, scene["titulo"], 140, 96, fill="#FFD43B", width=16)
    # subtítulo abajo = lo que dice Capi
    draw_text(img, scene["texto"], 1450, 64, width=21, stroke=8)
    img.convert("RGB").save(out)


def tts(text, voice, rate, out):
    try:
        import edge_tts
        asyncio.run(edge_tts.Communicate(text, voice, rate=rate).save(str(out)))
    except Exception as e:  # sin red/voz: audio mudo con duración estimada (solo para probar)
        print(f"  aviso: sin voz ({type(e).__name__}); uso silencio estimado")
        secs = max(1.5, len(text.split()) / 2.7)
        sh("ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
           "-t", f"{secs:.2f}", "-c:a", "libmp3lame", str(out))


def dur(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", str(path)], capture_output=True, text=True)
    return float(r.stdout.strip())


def sh(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main(guion_path):
    gp = Path(guion_path)
    cfg = json.loads(gp.read_text(encoding="utf-8"))
    work = gp.parent / "_tmp"
    work.mkdir(exist_ok=True)
    voice = cfg.get("voz", "es-ES-AlvaroNeural")
    rate = cfg.get("velocidad", "+8%")
    clips = []
    for i, sc in enumerate(cfg["escenas"], 1):
        print(f"Escena {i}: {sc['texto'][:50]}")
        png, mp3, mp4 = work / f"{i}.png", work / f"{i}.mp3", work / f"{i}.mp4"
        render_frame(sc, cfg, png)
        tts(sc["texto"], voice, rate, mp3)
        d = dur(mp3) + 0.25
        frames = int(d * FPS)
        zoom = f"zoompan=z='min(1.0+0.0007*on,1.12)':d={frames}:s={W}x{H}:fps={FPS}"
        sh("ffmpeg", "-y", "-loop", "1", "-i", str(png), "-i", str(mp3),
           "-vf", zoom, "-t", f"{d:.2f}", "-c:v", "libx264", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-af", "apad", "-shortest", str(mp4))
        clips.append(mp4)
    lst = work / "lista.txt"
    lst.write_text("".join(f"file '{c.resolve()}'\n" for c in clips))
    out = gp.parent / "video.mp4"
    music = ROOT / "assets" / "musica.mp3"
    if music.exists():
        tmp = work / "sin_musica.mp4"
        sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(tmp))
        sh("ffmpeg", "-y", "-i", str(tmp), "-stream_loop", "-1", "-i", str(music),
           "-filter_complex", "[1:a]volume=0.08[m];[0:a][m]amix=inputs=2:duration=first[a]",
           "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", str(out))
    else:
        sh("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(out))
    print(f"\nListo: {out}  ({dur(out):.1f} s)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
