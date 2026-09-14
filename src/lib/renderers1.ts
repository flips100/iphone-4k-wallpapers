import {
  fillGradient,
  radialGlow,
  noiseDots,
  mulberry32,
  type Renderer,
} from './helpers'

export const renderers1: Record<string, Renderer> = {
  'aurora-veil': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#0b1026', '#1a1440', '#0d1b2a'], 200)
    for (let i = 0; i < 6; i++) {
      const y = h * (0.15 + i * 0.12)
      const amp = h * (0.04 + rand() * 0.05)
      ctx.beginPath()
      ctx.moveTo(0, y)
      for (let x = 0; x <= w; x += 8) {
        const yy =
          y +
          Math.sin(x / (80 + i * 20) + i) * amp +
          Math.sin(x / 40 + i * 2) * amp * 0.3
        ctx.lineTo(x, yy)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      const hues = ['#5b8def', '#7c5cff', '#3dd6c6', '#a78bfa', '#60a5fa', '#818cf8']
      ctx.fillStyle = hues[i % hues.length]
      ctx.globalAlpha = 0.12 + i * 0.03
      ctx.fill()
    }
    ctx.globalAlpha = 1
    radialGlow(ctx, w * 0.3, h * 0.25, w * 0.7, '#6366f1', 0.35)
    radialGlow(ctx, w * 0.75, h * 0.45, w * 0.5, '#22d3ee', 0.25)
  },

  'midnight-orb': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#050508', '#0c0c14', '#080810'], 160)
    const cx = w * 0.5
    const cy = h * 0.42
    const r = Math.min(w, h) * 0.28
    radialGlow(ctx, cx, cy, r * 2.2, '#4f46e5', 0.4)
    radialGlow(ctx, cx - r * 0.3, cy - r * 0.4, r * 1.2, '#818cf8', 0.5)
    const g = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.35, r * 0.1, cx, cy, r)
    g.addColorStop(0, '#c7d2fe')
    g.addColorStop(0.35, '#6366f1')
    g.addColorStop(0.75, '#1e1b4b')
    g.addColorStop(1, '#0a0a12')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    noiseDots(ctx, w, h, 80, mulberry32(23), 'rgba(200,210,255,0.5)', 1.2)
  },

  'neon-grid': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#05010a', '#12081f', '#0a0514'], 180)
    radialGlow(ctx, w / 2, h * 0.35, w * 0.8, '#ff00aa', 0.25)
    radialGlow(ctx, w / 2, h * 0.7, w * 0.6, '#00e5ff', 0.2)
    const horizon = h * 0.55
    ctx.strokeStyle = '#ff2bd6'
    ctx.lineWidth = Math.max(1, w / 600)
    ctx.globalAlpha = 0.7
    for (let i = 0; i < 18; i++) {
      const t = i / 17
      const y = horizon + Math.pow(t, 1.6) * (h - horizon)
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    const vanishingX = w / 2
    for (let i = -12; i <= 12; i++) {
      ctx.beginPath()
      ctx.moveTo(vanishingX, horizon - h * 0.02)
      ctx.lineTo(vanishingX + i * w * 0.12, h)
      ctx.strokeStyle = i % 2 === 0 ? '#ff2bd6' : '#00e5ff'
      ctx.globalAlpha = 0.35 + Math.abs(i) * 0.02
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.strokeStyle = '#ff6bff'
    ctx.lineWidth = Math.max(2, w / 400)
    ctx.beginPath()
    ctx.moveTo(0, horizon)
    ctx.lineTo(w, horizon)
    ctx.stroke()
  },

  'silk-waves': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#1a1030', '#2d1b4e', '#152238'], 210)
    const bands = [
      ['#7c3aed', '#db2777'],
      ['#2563eb', '#06b6d4'],
      ['#c026d3', '#f472b6'],
      ['#4f46e5', '#a78bfa'],
    ]
    for (let b = 0; b < bands.length; b++) {
      const [c1, c2] = bands[b]
      const baseY = h * (0.2 + b * 0.18)
      ctx.beginPath()
      ctx.moveTo(-20, h)
      for (let x = -20; x <= w + 20; x += 6) {
        const y =
          baseY +
          Math.sin(x / (90 + b * 30) + b + rand() * 0.01) * h * 0.08 +
          Math.sin(x / 40 + b * 1.5) * h * 0.03
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w + 20, h + 20)
      ctx.lineTo(-20, h + 20)
      ctx.closePath()
      const g = ctx.createLinearGradient(0, baseY - h * 0.1, w, baseY + h * 0.2)
      g.addColorStop(0, c1)
      g.addColorStop(1, c2)
      ctx.fillStyle = g
      ctx.globalAlpha = 0.35
      ctx.fill()
    }
    ctx.globalAlpha = 1
  },

  'misty-peaks': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#1e293b', '#334155', '#64748b', '#94a3b8'], 180)
    const layers = [
      { color: '#0f172a', y: 0.55, amp: 0.08 },
      { color: '#1e293b', y: 0.62, amp: 0.06 },
      { color: '#334155', y: 0.7, amp: 0.05 },
      { color: '#475569', y: 0.78, amp: 0.04 },
      { color: '#1e293b', y: 0.88, amp: 0.03 },
    ]
    layers.forEach((layer, li) => {
      ctx.beginPath()
      ctx.moveTo(0, h)
      ctx.lineTo(0, h * layer.y)
      for (let x = 0; x <= w; x += 4) {
        const n =
          Math.sin(x / (100 + li * 40) + li) * layer.amp +
          Math.sin(x / (50 + li * 20) + rand() * 0.02) * layer.amp * 0.5
        ctx.lineTo(x, h * (layer.y + n))
      }
      ctx.lineTo(w, h)
      ctx.closePath()
      ctx.fillStyle = layer.color
      ctx.globalAlpha = 0.85
      ctx.fill()
    })
    ctx.globalAlpha = 1
    radialGlow(ctx, w * 0.7, h * 0.28, w * 0.45, '#f8fafc', 0.35)
  },

  'mono-circle': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#141416', '#1c1c20', '#121214'], 160)
    const cx = w * 0.5
    const cy = h * 0.45
    const r = Math.min(w, h) * 0.22
    radialGlow(ctx, cx, cy, r * 1.8, '#ffffff', 0.08)
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r)
    g.addColorStop(0, '#3a3a42')
    g.addColorStop(1, '#1a1a1e')
    ctx.fillStyle = g
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = Math.max(1, w / 800)
    ctx.stroke()
  },

  'ember-flare': (ctx, w, h) => {
    fillGradient(ctx, w, h, ['#1a0a05', '#2d1208', '#0f0805'], 200)
    radialGlow(ctx, w * 0.5, h * 0.7, w * 0.9, '#f97316', 0.55)
    radialGlow(ctx, w * 0.45, h * 0.55, w * 0.5, '#fbbf24', 0.4)
    radialGlow(ctx, w * 0.55, h * 0.4, w * 0.35, '#fecaca', 0.25)
    const g = ctx.createLinearGradient(0, h * 0.5, 0, h)
    g.addColorStop(0, 'transparent')
    g.addColorStop(1, '#1a0502')
    ctx.fillStyle = g
    ctx.fillRect(0, h * 0.5, w, h * 0.5)
  },

  'void-ribbons': (ctx, w, h, rand) => {
    fillGradient(ctx, w, h, ['#030306', '#0a0a12', '#050508'], 180)
    for (let i = 0; i < 8; i++) {
      const startX = rand() * w
      const ctrl1x = rand() * w
      const ctrl2x = rand() * w
      const endX = rand() * w
      ctx.beginPath()
      ctx.moveTo(startX, -20)
      ctx.bezierCurveTo(ctrl1x, h * 0.33, ctrl2x, h * 0.66, endX, h + 20)
      const colors = ['#6366f1', '#22d3ee', '#a78bfa', '#38bdf8', '#818cf8']
      ctx.strokeStyle = colors[i % colors.length]
      ctx.lineWidth = Math.max(1.5, w / (500 + i * 80))
      ctx.globalAlpha = 0.35 + rand() * 0.35
      ctx.shadowColor = colors[i % colors.length]
      ctx.shadowBlur = w / 40
      ctx.stroke()
    }
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
  }
}
