'use client'

import { useEffect, useState } from 'react'
import styles from './ReactionButton.module.css'

type ReactionButtonProps = {
  slug: string
}

export function ReactionButton({ slug }: ReactionButtonProps) {
  const [count, setCount]     = useState(0)
  const [reacted, setReacted] = useState(false)
  const [pulse, setPulse]     = useState(false)

  useEffect(() => {
    const key = `reacted:${slug}`
    setReacted(localStorage.getItem(key) === '1')
    fetch(`/api/reactions/${slug}`)
      .then(r => r.json())
      .then(d => setCount(d.count ?? 0))
      .catch(() => {})
  }, [slug])

  const handleClick = async () => {
    if (reacted) return
    try {
      const res = await fetch(`/api/reactions/${slug}`, { method: 'POST' })
      const data = await res.json()
      setCount(data.count ?? count + 1)
      setReacted(true)
      localStorage.setItem(`reacted:${slug}`, '1')
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    } catch {
      setCount(c => c + 1)
      setReacted(true)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={reacted}
      className={`${styles.btn} ${reacted ? styles.reacted : ''} ${pulse ? styles.pulse : ''}`}
      aria-label={reacted ? `You found this interesting (${count} total)` : 'Found this interesting'}
      aria-pressed={reacted}
    >
      <span aria-hidden="true">{reacted ? '★' : '☆'}</span>
      <span className={styles.label}>Found this interesting</span>
      {count > 0 && <span className={styles.count}>{count}</span>}
    </button>
  )
}
