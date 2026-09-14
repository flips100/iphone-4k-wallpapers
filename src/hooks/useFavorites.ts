import { useCallback, useEffect, useState } from 'react'

const KEY = 'iphone-4k-wallpapers:favorites'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    typeof window !== 'undefined' ? read() : [],
  )

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggle = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  return { favorites, toggle, isFavorite }
}
