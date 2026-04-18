'use client'

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
  if (found.includes(key)) return false
  found.push(key)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  dispatchEggEvent(key)
  return true
}

function dispatchEggEvent(key: string) {
  window.dispatchEvent(new CustomEvent('egg-found', { detail: { key } }))
}

export function countFoundEggs(): number {
  return getFoundEggs().length
}

export const ALL_EGG_KEYS = getEggKeys()
