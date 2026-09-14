import type { Wallpaper } from '../types'
import { fillGradient, mulberry32 } from './helpers'
import { renderers1 } from './renderers1'
import { renderers2 } from './renderers2'

const renderers = { ...renderers1, ...renderers2 }

/** Draw wallpaper onto an existing canvas at given size */
export function drawWallpaper(
  canvas: HTMLCanvasElement,
  wallpaper: Wallpaper,
  width: number,
  height: number,
) {
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  const rand = mulberry32(wallpaper.seed)
  const renderer = renderers[wallpaper.id]
  if (renderer) {
    renderer(ctx, width, height, rand)
  } else {
    fillGradient(ctx, width, height, ['#111', '#222', '#111'])
  }
}

/** Export wallpaper as PNG blob URL / trigger download */
export function downloadWallpaper(
  wallpaper: Wallpaper,
  width: number,
  height: number,
  filename?: string,
) {
  const canvas = document.createElement('canvas')
  drawWallpaper(canvas, wallpaper, width, height)
  const name = filename ?? `${wallpaper.id}-${width}x${height}.png`
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, 'image/png')
}

/** Preview data URL at lower res for gallery thumbs */
export function previewDataUrl(
  wallpaper: Wallpaper,
  width = 360,
  height = 780,
): string {
  const canvas = document.createElement('canvas')
  drawWallpaper(canvas, wallpaper, width, height)
  return canvas.toDataURL('image/jpeg', 0.85)
}
