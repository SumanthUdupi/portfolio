'use client'

import { useEffect } from 'react'
import { unlockEgg } from '@/lib/easter-eggs'

const SESSION_KEY = 'chaos_posts_read'

export function PostReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const read: string[] = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '[]')
    if (!read.includes(slug)) {
      read.push(slug)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(read))
    }
    if (read.length >= 3) {
      unlockEgg('egg_three_posts')
    }
  }, [slug])

  return null
}
