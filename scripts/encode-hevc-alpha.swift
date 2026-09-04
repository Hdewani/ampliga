// Encodes a directory of RGBA PNG frames into an Apple "HEVC with Alpha" MP4.
//
// ffmpeg's hevc_videotoolbox writes the alpha layer into the elementary stream
// but tags the sample entry `hvc1`, which AVFoundation (and therefore every
// browser on iOS) reads as a plain opaque HEVC track -- the artwork ends up on
// a solid block. AVAssetWriter with .hevcWithAlpha writes the `muxa` sample
// entry Safari actually looks for.
//
// usage: encode-hevc-alpha <frames-dir> <out.mov> <fps> [quality 0..1]

import AVFoundation
import VideoToolbox
import CoreGraphics
import ImageIO
import Foundation

let args = CommandLine.arguments
guard args.count >= 4 else { FileHandle.standardError.write("usage: encode-hevc-alpha <frames-dir> <out.mov> <fps> [quality]\n".data(using: .utf8)!); exit(2) }
let dir = args[1], outPath = args[2]
guard let fps = Double(args[3]), fps > 0 else { fatalError("bad fps") }
let quality = args.count > 4 ? Double(args[4])! : 0.65

let frames = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".png") }.sorted()
guard !frames.isEmpty else { fatalError("no frames in \(dir)") }

func load(_ name: String) -> CGImage {
    let url = URL(fileURLWithPath: dir).appendingPathComponent(name) as CFURL
    guard let src = CGImageSourceCreateWithURL(url, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("cannot read \(name)") }
    return img
}

let first = load(frames[0])
let w = first.width, h = first.height

try? FileManager.default.removeItem(atPath: outPath)
let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: outPath), fileType: .mov)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.hevcWithAlpha,
    AVVideoWidthKey: w,
    AVVideoHeightKey: h,
    AVVideoCompressionPropertiesKey: [
        kVTCompressionPropertyKey_TargetQualityForAlpha as String: quality,
        kVTCompressionPropertyKey_AlphaChannelMode as String: kVTAlphaChannelMode_PremultipliedAlpha,
    ],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: w,
    kCVPixelBufferHeightKey as String: h,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let space = CGColorSpaceCreateDeviceRGB()
var index = 0
let queue = DispatchQueue(label: "encode")
let done = DispatchSemaphore(value: 0)

input.requestMediaDataWhenReady(on: queue) {
    while input.isReadyForMoreMediaData {
        if index >= frames.count { input.markAsFinished(); done.signal(); return }
        guard let pool = adaptor.pixelBufferPool else { fatalError("no pixel buffer pool") }
        var pb: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, pool, &pb)
        guard let buffer = pb else { fatalError("no pixel buffer") }
        CVPixelBufferLockBaseAddress(buffer, [])
        // Straight (un-premultiplied) alpha, matching kVTAlphaChannelMode_PremultipliedAlpha.
        guard let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: w, height: h,
                                  bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
                                  space: space,
                                  bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
        else { fatalError("no context") }
        ctx.clear(CGRect(x: 0, y: 0, width: w, height: h))
        ctx.draw(load(frames[index]), in: CGRect(x: 0, y: 0, width: w, height: h))
        CVPixelBufferUnlockBaseAddress(buffer, [])
        adaptor.append(buffer, withPresentationTime: CMTime(value: CMTimeValue(index), timescale: CMTimeScale(fps.rounded())))
        index += 1
    }
}
done.wait()
writer.finishWriting { done.signal() }
done.wait()
if writer.status != .completed { fatalError("writer failed: \(String(describing: writer.error))") }
print("\(outPath): \(frames.count) frames \(w)x\(h)")
