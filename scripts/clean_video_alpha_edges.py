"""Clean export marks and neutral checker remnants from alpha video frames."""

from pathlib import Path
import sys

import numpy as np
from PIL import Image


for directory in map(Path, sys.argv[1:]):
    for frame_path in sorted(directory.glob("*.png")):
        image = Image.open(frame_path).convert("RGBA")
        pixels = np.asarray(image).copy()
        rgb = pixels[:, :, :3].astype(np.int16)
        height, width = pixels.shape[:2]

        # Remove the encoded crop/registration outline around the source.
        edge = max(8, round(min(width, height) * 0.012))
        pixels[:edge, :, 3] = 0
        pixels[-edge:, :, 3] = 0
        pixels[:, :edge, 3] = 0
        pixels[:, -edge:, 3] = 0

        # Remove the neutral checker/shadow fragments baked into the bottom
        # margin while retaining the coloured artwork and the black backdrop.
        spread = rgb.max(axis=2) - rgb.min(axis=2)
        brightness = rgb.mean(axis=2)
        rows = np.arange(height)[:, None]
        bottom_remnant = (rows > height * 0.86) & (spread < 24) & (brightness > 72)
        pixels[bottom_remnant, 3] = 0

        Image.fromarray(pixels, "RGBA").save(frame_path)
