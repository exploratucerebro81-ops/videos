#!/usr/bin/env python3
"""Genera la voz de cada escena: python3 capi/motion/voz.py capi/proyectos/<x>/guion-motion.json  (requiere edge-tts y red)"""
import asyncio, json, sys
from pathlib import Path
import edge_tts
gp = Path(sys.argv[1]); cfg = json.loads(gp.read_text(encoding="utf-8"))
(gp.parent / "audio").mkdir(exist_ok=True)
async def main():
    for i, e in enumerate(cfg["escenas"], 1):
        await edge_tts.Communicate(e["texto"], cfg.get("voz", "es-ES-AlvaroNeural"), rate=cfg.get("velocidad", "+8%")).save(str(gp.parent / "audio" / f"{i}.mp3"))
        print("voz", i)
asyncio.run(main())
