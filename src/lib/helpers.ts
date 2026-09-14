export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function fillGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: string[],
  angleDeg = 180,
) {
  const rad = (angleDeg * Math.PI) / 180
  const cx = w / 2
  const cy = h / 2
  const len = Math.sqrt(w * w + h * h) / 2
  const x0 = cx - Math.cos(rad) * len
  const y0 = cy - Math.sin(rad) * len
  const x1 = cx + Math.cos(rad) * len
  const y1 = cy + Math.sin(rad) * len
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

export function radialGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
  alpha = 0.55,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, color)
  g.addColorStop(1, 'transparent')
  ctx.globalAlpha = alpha
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
}

export function noiseDots(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number,
  rand: () => number,
  color = 'rgba(255,255,255,0.35)',
  size = 1.5,
) {
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const x = rand() * w
    const y = rand() * h
    const s = size * (0.4 + rand())
    ctx.globalAlpha = 0.15 + rand() * 0.55
    ctx.beginPath()
    ctx.arc(x, y, s, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

export type Renderer = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
) => void
