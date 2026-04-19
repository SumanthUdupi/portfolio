'use client'

import { useEffect } from 'react'
import { unlockEgg } from '@/lib/easter-eggs'

const SESSION_KEY = 'chaos_projects_viewed'

export function ProjectViewTracker({ slug, total }: { slug: string; total: number }) {
  useEffect(() => {
    const viewed: string[] = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '[]')
    if (!viewed.includes(slug)) {
      viewed.push(slug)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(viewed))
    }
    if (viewed.length >= total) {
      unlockEgg('egg_all_projects')
    }
  }, [slug, total])

  return null
}
