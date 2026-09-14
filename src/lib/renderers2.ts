import {
  fillGradient,
  radialGlow,
  noiseDots,
  type Renderer,
} from './helpers'

export const renderers2: Record<string, Renderer> = {
  'cyber-pulse': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#050510', '#0a0a1a', '#080812'], 180)
    const cx = w / 2
    const cy = h * 0.48
    for (let i = 12; i >= 1; i--) {
      const r = (Math.min(w, h) * 0.04) * i
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = i % 2 === 0 ? '#22d3ee' : '#a855f7'
      ctx.lineWidth = Math.max(1, w / 500)
      ctx.globalAlpha = 0.15 + (12 - i) * 0.04
      ctx.shadowColor = ctx.strokeStyle
      ctx.shadowBlur = w / 60
      ctx.stroke()
    }
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    radialGlow(ctx, cx, cy, Math.min(w, h) * 0.15, '#e0e7ff', 0.5)
  },

  'geo-shards': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#0f0f18', '#1a1528', '#12101c'], 200)
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#3b82f6', '#a78bfa']
    for (let i = 0; i < 28; i++) {
      const x = rand() * w
      const y = rand() * h
      const s = (40 + rand() * 120) * (w / 400)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + s * (0.5 + rand()), y + s * (rand() - 0.3))
      ctx.lineTo(x + s * (rand() - 0.2), y + s * (0.6 + rand() * 0.5))
      ctx.closePath()
      ctx.fillStyle = colors[i % colors.length]
      ctx.globalAlpha = 0.12 + rand() * 0.25
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    radialGlow(ctx, w * 0.5, h * 0.4, w * 0.6, '#818cf8', 0.2)
  },

  'forest-haze': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#0c1a14', '#132a1e', '#1a3a28', '#243d32'], 180)
    for (let i = 0; i < 5; i++) {
      const baseY = h * (0.45 + i * 0.1)
      ctx.beginPath()
      ctx.moveTo(0, h)
      for (let x = 0; x <= w; x += 3) {
        const y =
          baseY +
          Math.sin(x / (70 + i * 30)) * h * 0.04 +
          Math.sin(x / 25 + i) * h * 0.015
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.closePath()
      const greens = ['#064e3b', '#065f46', '#047857', '#059669', '#0f766e']
      ctx.fillStyle = greens[i]
      ctx.globalAlpha = 0.55 + i * 0.08
      ctx.fill()
    }
    // tree silhouettes
    ctx.globalAlpha = 0.5
    ctx.fillStyle = '#022c22'
    for (let i = 0; i < 18; i++) {
      const tx = (i / 18) * w + rand() * 20
      const th = h * (0.12 + rand() * 0.18)
      const ty = h * 0.72
      ctx.beginPath()
      ctx.moveTo(tx, ty)
      ctx.lineTo(tx + 8 * (w / 400), ty - th)
      ctx.lineTo(tx + 16 * (w / 400), ty)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    radialGlow(ctx, w * 0.3, h * 0.25, w * 0.5, '#a7f3d0', 0.15)
  },

  'quiet-line': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#18181b', '#27272a', '#1c1c1f'], 135)
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
    ctx.lineWidth = Math.max(1.5, w / 700)
    ctx.beginPath()
    ctx.moveTo(w * 0.15, h * 0.72)
    ctx.lineTo(w * 0.85, h * 0.28)
    ctx.stroke()
    radialGlow(ctx, w * 0.5, h * 0.5, w * 0.4, '#ffffff', 0.05)
  },

  'plasma-drift': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#0c1222', '#151a30', '#0e1428'], 200)
    const blobs = [
      { x: 0.3, y: 0.35, r: 0.45, c: '#6366f1' },
      { x: 0.7, y: 0.5, r: 0.4, c: '#06b6d4' },
      { x: 0.45, y: 0.65, r: 0.35, c: '#a855f7' },
      { x: 0.55, y: 0.3, r: 0.3, c: '#22d3ee' },
      { x: 0.25, y: 0.7, r: 0.28, c: '#818cf8' },
    ]
    blobs.forEach((b) => {
      radialGlow(
        ctx,
        w * (b.x + (rand() - 0.5) * 0.05),
        h * (b.y + (rand() - 0.5) * 0.05),
        w * b.r,
        b.c,
        0.4,
      )
    })
  },

  'sunset-bloom': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#1e1b4b', '#7c3aed', '#f97316', '#fecaca'], 180)
    radialGlow(ctx, w * 0.5, h * 0.62, w * 0.7, '#fdba74', 0.55)
    radialGlow(ctx, w * 0.5, h * 0.55, w * 0.35, '#fef3c7', 0.4)
    const g = ctx.createLinearGradient(0, 0, 0, h * 0.5)
    g.addColorStop(0, '#1e1b4b')
    g.addColorStop(1, 'transparent')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h * 0.5)
  },

  'starlit-void': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#000000', '#050510', '#0a0a18'], 180)
    noiseDots(ctx, w, h, Math.floor(w * h * 0.00008), rand, 'rgba(255,255,255,0.9)', 1.8)
    // brighter stars
    for (let i = 0; i < 40; i++) {
      const x = rand() * w
      const y = rand() * h * 0.85
      const s = 1 + rand() * 2.5 * (w / 800)
      radialGlow(ctx, x, y, s * 4, '#ffffff', 0.6)
      ctx.fillStyle = '#fff'
      ctx.globalAlpha = 0.7 + rand() * 0.3
      ctx.beginPath()
      ctx.arc(x, y, s * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    radialGlow(ctx, w * 0.2, h * 0.15, w * 0.4, '#312e81', 0.3)
  },

  'laser-horizon': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#050018', '#0d0030', '#1a0040'], 180)
    const horizon = h * 0.58
    radialGlow(ctx, w / 2, horizon, w * 0.7, '#ff00cc', 0.35)
    radialGlow(ctx, w / 2, horizon, w * 0.35, '#00ffff', 0.3)
    // columns
    for (let i = 0; i < 14; i++) {
      const x = (i / 13) * w
      const hh = h * (0.08 + Math.sin(i * 1.2) * 0.06 + 0.05)
      const g = ctx.createLinearGradient(x, horizon - hh, x, horizon)
      g.addColorStop(0, 'transparent')
      g.addColorStop(1, i % 2 === 0 ? '#ff00aa' : '#00e5ff')
      ctx.fillStyle = g
      ctx.globalAlpha = 0.55
      ctx.fillRect(x - w * 0.008, horizon - hh, w * 0.016, hh)
    }
    ctx.globalAlpha = 1
    ctx.strokeStyle = '#ff66cc'
    ctx.lineWidth = Math.max(2, w / 350)
    ctx.shadowColor = '#ff00aa'
    ctx.shadowBlur = w / 30
    ctx.beginPath()
    ctx.moveTo(0, horizon)
    ctx.lineTo(w, horizon)
    ctx.stroke()
    ctx.shadowBlur = 0
    // floor fade
    const fg = ctx.createLinearGradient(0, horizon, 0, h)
    fg.addColorStop(0, 'rgba(255,0,170,0.15)')
    fg.addColorStop(1, 'transparent')
    ctx.fillStyle = fg
    ctx.fillRect(0, horizon, w, h - horizon)
  }
}
