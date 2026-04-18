'use client'

import { useEffect } from 'react'
import { unlockEgg } from '@/lib/easter-eggs'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export function KonamiCode() {
  useEffect(() => {
    let pos = 0
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos]) {
        pos++
        if (pos === KONAMI.length) {
          pos = 0
          unlockEgg('egg_konami')
        }
      } else {
        pos = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return null
}
