'use client'

import { useEffect } from 'react'
import { unlockEgg } from '@/lib/easter-eggs'

export function SecretEggUnlocker() {
  useEffect(() => {
    unlockEgg('egg_secret_route')
  }, [])
  return null
}
