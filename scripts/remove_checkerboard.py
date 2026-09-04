"""Remove a neutral checkerboard connected to the edges of animation frames."""

from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageDraw


def process(frame_path: Path) -> None:
    image = Image.open(frame_path).convert("RGBA")
    pixels = np.asarray(image).copy()
    rgb = pixels[:, :, :3].astype(np.int16)

    # The exported checkerboard is neutral and bright. Selecting both tones
    # makes its grid one connected region, while enclosed illustration whites
    # remain protected by their coloured/dark outlines.
    spread = rgb.max(axis=2) - rgb.min(axis=2)
    brightness = rgb.mean(axis=2)
    candidate = (spread < 22) & (brightness > 172)

    # Compression leaves one- or two-pixel seams between otherwise adjacent
    # checker tiles. Bridge those seams before finding the edge-connected area.
    padded = np.pad(candidate, 2, mode="constant")
    connected_candidate = np.zeros_like(candidate)
    height, width = candidate.shape
    for dy in range(5):
        for dx in range(5):
            connected_candidate |= padded[dy : dy + height, dx : dx + width]

    mask = Image.fromarray(np.where(connected_candidate, 255, 0).astype(np.uint8), "L")
    mask_pixels = np.asarray(mask).copy()
    edge = 18
    mask_pixels[:edge, :] = 255
    mask_pixels[-edge:, :] = 255
    mask_pixels[:, :edge] = 255
    mask_pixels[:, -edge:] = 255
    mask = Image.fromarray(mask_pixels, "L")
    ImageDraw.floodfill(mask, (0, 0), 128, thresh=0)
    connected_background = np.asarray(mask) == 128

    pixels[connected_background, 3] = 0
    pixels[:edge, :, 3] = 0
    pixels[-edge:, :, 3] = 0
    pixels[:, :edge, 3] = 0
    pixels[:, -edge:, 3] = 0
    Image.fromarray(pixels, "RGBA").save(frame_path)


for directory in map(Path, sys.argv[1:]):
    for frame in sorted(directory.glob("*.png")):
        process(frame)
