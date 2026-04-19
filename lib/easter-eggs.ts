import { getEggKeys } from '@/config/easter-eggs'

const STORAGE_KEY = 'chaos_eggs_found'

export function getFoundEggs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function unlockEgg(key: string): boolean {
  const found = getFoundEggs()
  const isNew = !found.includes(key)
  if (isNew) {
    found.push(key)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  }
  // Always dispatch so the toast fires (even on re-trigger during testing)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('egg-found', { detail: { key, isNew } }))
  }
  return isNew
}

export function resetEgg(key: string) {
  const found = getFoundEggs().filter(k => k !== key)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
}

export function countFoundEggs(): number {
  return getFoundEggs().length
}

export const ALL_EGG_KEYS = getEggKeys()
