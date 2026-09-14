# iPhone 4K Wallpapers

A polished, mobile-first web app to **browse**, **preview on an iPhone frame**, and **download** high-resolution wallpapers for modern iPhones.

All wallpapers are **procedurally generated in the browser** (canvas) — no stock photos, no paid APIs, fully client-side.

## Features

- Gallery with categories: Abstract, Gradients, Dark, Minimal, Neon, Nature-inspired
- 16 distinct procedural wallpapers
- iPhone-style preview frame with common device sizes
- Download PNG at:
  - **1179×2556** — iPhone 15/16 Pro
  - **1290×2796** — iPhone 15/16 Pro Max
  - **1320×2868** — iPhone 16 Plus
  - **2160×3840** — 4K portrait
- Search and category filters
- Favorites stored in `localStorage`
- Dark premium UI
- Detail view with tip: save to Photos → set as wallpaper
- Works on phone browsers and desktop

## Tech

- Vite + React + TypeScript
- Clean CSS (no Tailwind dependency)
- Client-side only

## Run locally

```bash
npm install && npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   # Gallery thumbs, phone frame, detail view
  data/         # Wallpaper catalog
  hooks/        # Favorites (localStorage)
  lib/          # Canvas wallpaper generators + download
  App.tsx
  index.css
```

## License

MIT
