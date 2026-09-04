#!/bin/bash
# Rebuilds the WebKit copies of the transparent service illustrations.
#
# Source of truth is the VP9 WebM (alpha in the BlockAdditions). ffmpeg's
# hevc_videotoolbox encoder writes the alpha layer into the HEVC bitstream but
# does not write the `almo` sample-entry box, so AVFoundation -- and every
# browser on iOS -- decodes only the colour layer and the artwork lands on an
# opaque block. Round-tripping through AVAssetWriter (encode-hevc-alpha.swift)
# produces the `almo` box Safari needs.
set -euo pipefail
cd "$(dirname "$0")/.."
dir=public/services
bin=$(mktemp -d)/encode-hevc-alpha
swiftc -O scripts/encode-hevc-alpha.swift -o "$bin"
for name in brand-strategy product-development ai-automation digital-marketing ecommerce content-creative; do
 src="$dir/$name.webm"
 fps=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$src" | awk -F/ '{printf "%.0f", $1/$2}')
 frames=$(mktemp -d)
 ffmpeg -hide_banner -loglevel error -c:v libvpx-vp9 -i "$src" -fps_mode passthrough "$frames/f%05d.png"
 "$bin" "$frames" "$dir/$name.mov" "$fps" 0.6
 rm -rf "$frames"
done
