import { useState } from 'react'
import type { Wallpaper, DeviceSize } from '../types'
import { DEVICE_SIZES } from '../types'
import { PhoneFrame } from './PhoneFrame'
import { downloadWallpaper } from '../lib/generateWallpaper'

interface Props {
  wallpaper: Wallpaper
  favorite: boolean
  onClose: () => void
  onToggleFavorite: () => void
}

export function DetailView({
  wallpaper,
  favorite,
  onClose,
  onToggleFavorite,
}: Props) {
  const [device, setDevice] = useState<DeviceSize>(DEVICE_SIZES[0])
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (size: DeviceSize) => {
    setDownloading(size.id)
    downloadWallpaper(wallpaper, size.width, size.height)
    setTimeout(() => setDownloading(null), 800)
  }

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={wallpaper.name}>
      <div className="detail-panel">
        <header className="detail-header">
          <button type="button" className="ghost-btn" onClick={onClose} aria-label="Close">
            ← Back
          </button>
          <button
            type="button"
            className={`fav-btn ${favorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
          >
            {favorite ? '♥ Favorited' : '♡ Favorite'}
          </button>
        </header>

        <div className="detail-body">
          <div className="detail-preview-col">
            <PhoneFrame wallpaper={wallpaper} device={device} />
            <label className="device-picker">
              <span>Preview size</span>
              <select
                value={device.id}
                onChange={(e) => {
                  const next = DEVICE_SIZES.find((d) => d.id === e.target.value)
                  if (next) setDevice(next)
                }}
              >
                {DEVICE_SIZES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label} ({d.width}×{d.height})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="detail-info-col">
            <p className="detail-cat">{wallpaper.category}</p>
            <h2>{wallpaper.name}</h2>
            <p className="detail-desc">{wallpaper.description}</p>
            <div className="tag-row">
              {wallpaper.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="dl-title">Download PNG</h3>
            <div className="dl-grid">
              {DEVICE_SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  className="dl-btn"
                  onClick={() => handleDownload(size)}
                  disabled={downloading === size.id}
                >
                  <strong>{size.label}</strong>
                  <span>
                    {size.width}×{size.height}
                    {downloading === size.id ? ' · Saving…' : ''}
                  </span>
                </button>
              ))}
            </div>

            <aside className="tip-box">
              <strong>Tip</strong>
              <p>
                After downloading, open the image in Photos, tap Share → Use as Wallpaper,
                then adjust and set for Lock Screen, Home Screen, or both.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
