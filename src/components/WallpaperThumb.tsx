import { useEffect, useRef } from 'react'
import type { Wallpaper } from '../types'
import { drawWallpaper } from '../lib/generateWallpaper'

interface Props {
  wallpaper: Wallpaper
  favorite?: boolean
  onOpen: () => void
  onToggleFavorite: () => void
}

export function WallpaperThumb({
  wallpaper,
  favorite,
  onOpen,
  onToggleFavorite,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawWallpaper(canvas, wallpaper, 270, 585)
  }, [wallpaper])

  return (
    <article className="thumb-card">
      <button type="button" className="thumb-preview" onClick={onOpen} aria-label={`Open ${wallpaper.name}`}>
        <canvas ref={canvasRef} width={270} height={585} />
        <span className="thumb-cat">{wallpaper.category}</span>
      </button>
      <div className="thumb-meta">
        <div>
          <h3>{wallpaper.name}</h3>
          <p>{wallpaper.description}</p>
        </div>
        <button
          type="button"
          className={`fav-btn ${favorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
          aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
          title={favorite ? 'Unfavorite' : 'Favorite'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  )
}
