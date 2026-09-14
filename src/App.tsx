import { useMemo, useState } from 'react'
import { WALLPAPERS } from './data/wallpapers'
import { CATEGORIES, type Category, type Wallpaper } from './types'
import { useFavorites } from './hooks/useFavorites'
import { WallpaperThumb } from './components/WallpaperThumb'
import { DetailView } from './components/DetailView'

type FilterMode = 'all' | 'favorites' | Category

export default function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [selected, setSelected] = useState<Wallpaper | null>(null)
  const { favorites, toggle, isFavorite } = useFavorites()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return WALLPAPERS.filter((w) => {
      if (filter === 'favorites' && !favorites.includes(w.id)) return false
      if (filter !== 'all' && filter !== 'favorites' && w.category !== filter) return false
      if (!q) return true
      const hay = `${w.name} ${w.description} ${w.category} ${w.tags.join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query, filter, favorites])

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden>
            ◆
          </span>
          <div>
            <h1>iPhone 4K Wallpapers</h1>
            <p>Procedural · Preview · Download</p>
          </div>
        </div>
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search wallpapers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search wallpapers"
          />
        </div>
      </header>

      <nav className="filters" aria-label="Categories">
        <button
          type="button"
          className={filter === 'all' ? 'chip active' : 'chip'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={filter === 'favorites' ? 'chip active' : 'chip'}
          onClick={() => setFilter('favorites')}
        >
          ♥ Favorites{favorites.length ? ` (${favorites.length})` : ''}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={filter === c ? 'chip active' : 'chip'}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      <main className="gallery">
        {filtered.length === 0 ? (
          <div className="empty">
            <p>No wallpapers match your filters.</p>
            <button type="button" className="ghost-btn" onClick={() => { setQuery(''); setFilter('all') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map((w) => (
              <WallpaperThumb
                key={w.id}
                wallpaper={w}
                favorite={isFavorite(w.id)}
                onOpen={() => setSelected(w)}
                onToggleFavorite={() => toggle(w.id)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          {WALLPAPERS.length} procedurally generated wallpapers · Client-side only · PNG up to 2160×3840
        </p>
      </footer>

      {selected && (
        <DetailView
          wallpaper={selected}
          favorite={isFavorite(selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={() => toggle(selected.id)}
        />
      )}
    </div>
  )
}
