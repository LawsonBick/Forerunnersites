#!/usr/bin/env python3
"""
Crop a headshot to a square framed on the head and shoulders, ready to be
displayed as a circle by the About page (CSS handles the rounding).

Usage:
    python3 scripts/make-portrait.py <input-image> [--focus 0.34] [--zoom 1.0]

  --focus  vertical center of the crop as a fraction of image height.
           Lower = higher up the body. 0.34 puts the face slightly above
           center, which is what reads well inside a circle.
  --zoom   >1 tightens the crop (more face), <1 widens it (more shoulders).

Writes public/about/portrait.jpg at 880x880.
"""
import argparse
import pathlib
import sys

from PIL import Image, ImageOps

SIZE = 880
OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "about" / "portrait.jpg"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--focus", type=float, default=0.34)
    ap.add_argument("--zoom", type=float, default=1.0)
    args = ap.parse_args()

    src = pathlib.Path(args.input).expanduser()
    if not src.exists():
        print(f"error: no such file: {src}", file=sys.stderr)
        return 1

    img = Image.open(src)
    img = ImageOps.exif_transpose(img)

    # Flatten any transparency onto white so the circle reads clean.
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[-1])
        img = bg
    else:
        img = img.convert("RGB")

    w, h = img.size
    side = int(min(w, h) / max(args.zoom, 0.1))
    side = min(side, w, h)

    cx = w // 2
    cy = int(h * args.focus)

    left = max(0, min(cx - side // 2, w - side))
    top = max(0, min(cy - side // 2, h - side))

    img = img.crop((left, top, left + side, top + side))
    img = img.resize((SIZE, SIZE), Image.LANCZOS)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB) from a {side}px crop at focus={args.focus}, zoom={args.zoom}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
