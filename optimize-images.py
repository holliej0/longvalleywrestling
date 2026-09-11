#!/usr/bin/env python3
"""Downscale assets/img to sensible display sizes.

The WordPress site served these through an image CDN that resized them on
request. Static hosting has no such layer, so we do it once, here. Run after
download-assets.sh; it is safe to re-run (already-small files are skipped).
"""
import os, sys
from PIL import Image

# max width in px -- roughly 2x the largest size each image is ever displayed at
LIMITS = {
    "logo.png": 400, "icon.png": 256,
    "registration-2026.png": 1600, "estebuilt.png": 1600,
    "program-1.jpg": 1200, "program-3.jpg": 1200, "program-cta.jpg": 300,
    "store.png": 1200,
    "wrestling-team3.png": 1000, "wrestling-team.png": 500,
    "wrestlers.png": 400, "team-huddle.jpg": 400,
}
DEFAULT_IMG = 1200   # carousel photos
DEFAULT_COACH = 600  # headshots, shown ~300px square

# Photographic PNGs with no transparency -- far smaller as JPEG. The .png is
# removed and every reference points at the .jpg.
TO_JPEG = {"registration-2026.png", "estebuilt.png",
           "wrestling-team3.png", "wrestling-team.png"}

d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "img")
before = after = 0
changed = []

for name in sorted(os.listdir(d)):
    if not name.lower().endswith((".jpg", ".jpeg", ".png")):
        continue
    path = os.path.join(d, name)
    start = os.path.getsize(path)
    before += start

    cap = LIMITS.get(name, DEFAULT_COACH if name.startswith("coach-") else DEFAULT_IMG)
    im = Image.open(path)
    w, h = im.size

    if w > cap:
        im = im.resize((cap, round(h * cap / w)), Image.LANCZOS)

    if name in TO_JPEG:
        im = im.convert("RGB")
        newpath = path[:-4] + ".jpg"
        im.save(newpath, "JPEG", quality=82, optimize=True, progressive=True)
        os.remove(path)
        end = os.path.getsize(newpath)
        after += end
        changed.append("  %-24s %5dKB -> %4dKB  (png -> jpg, %d -> %dpx)" %
                       (name, start // 1024, end // 1024, w, min(w, cap)))
        continue

    if name.lower().endswith(".png"):
        if im.mode not in ("RGBA", "P", "L"):
            im = im.convert("RGBA")
        im.save(path, "PNG", optimize=True)
    else:
        if im.mode != "RGB":
            im = im.convert("RGB")
        im.save(path, "JPEG", quality=82, optimize=True, progressive=True)

    end = os.path.getsize(path)
    after += end
    if end < start * 0.95:
        changed.append("  %-24s %5dKB -> %4dKB  (%d -> %dpx)" %
                       (name, start // 1024, end // 1024, w, min(w, cap)))

print("\n".join(changed))
print("\nTotal: %.1fMB -> %.1fMB" % (before / 1e6, after / 1e6))
