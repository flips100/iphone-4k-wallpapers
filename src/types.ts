export type Category =
  | 'Abstract'
  | 'Gradients'
  | 'Dark'
  | 'Minimal'
  | 'Neon'
  | 'Nature-inspired'

export interface Wallpaper {
  id: string
  name: string
  category: Category
  description: string
  tags: string[]
  seed: number
}

export interface DeviceSize {
  id: string
  label: string
  width: number
  height: number
}

export const DEVICE_SIZES: DeviceSize[] = [
  { id: '15pro', label: 'iPhone 15/16 Pro', width: 1179, height: 2556 },
  { id: '15promax', label: 'iPhone 15/16 Pro Max', width: 1290, height: 2796 },
  { id: '16plus', label: 'iPhone 16 Plus', width: 1320, height: 2868 },
  { id: '4k', label: '4K Portrait', width: 2160, height: 3840 },
]

export const CATEGORIES: Category[] = [
  'Abstract',
  'Gradients',
  'Dark',
  'Minimal',
  'Neon',
  'Nature-inspired',
]
