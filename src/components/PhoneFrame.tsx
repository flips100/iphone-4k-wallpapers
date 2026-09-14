import { useEffect, useRef } from 'react'
import type { Wallpaper, DeviceSize } from '../types'
import { drawWallpaper } from '../lib/generateWallpaper'

interface Props {
  wallpaper: Wallpaper
  device: DeviceSize
}

export function PhoneFrame({ wallpaper, device }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // keep preview canvas manageable
  const previewW = 280
  const previewH = Math.round((previewW * device.height) / device.width)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawWallpaper(canvas, wallpaper, previewW, previewH)
  }, [wallpaper, previewW, previewH])

  return (
    <div className="phone-frame" style={{ aspectRatio: `${device.width} / ${device.height}` }}>
      <div className="phone-bezel">
        <div className="phone-notch" aria-hidden />
        <div className="phone-screen">
          <canvas ref={canvasRef} width={previewW} height={previewH} />
        </div>
        <div className="phone-home-bar" aria-hidden />
      </div>
    </div>
  )
}
