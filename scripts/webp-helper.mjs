// WebP lossless 1x1 transparent atau solid
// RIFF Header: 'RIFF', size, 'WEBP', 'VP8L', size, 0x2f...
// Mari kita tes pembuatan buffer WebP valid

export function createMinimalWebP(width = 1, height = 1) {
  // WebP 1x1 Lossless pixel transparan valid standar:
  // RIFF (4) + Size (4) + WEBP (4) + VP8L (4) + Size (4) + 1 byte signature + 4 bytes header ...
  // Base64 WebP 1x1 transparent:
  // UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==
  // Base64 WebP 1x1 solid orange (#FF4513):
  const b64 = "UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vsP/wAAAAD+0v4A/vAA/wAAAAAAAAAAAAAAAAAAAAAA";
  return Buffer.from(b64, 'base64');
}
