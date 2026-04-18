'use client'

import { useRouter } from 'next/navigation'
import type { PostMeta } from '@/lib/mdx'
import styles from './RandomPostButton.module.css'

type RandomPostButtonProps = {
  posts: PostMeta[]
  excludeSlug?: string
}

export function RandomPostButton({ posts, excludeSlug }: RandomPostButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    const available = posts.filter(p => p.slug !== excludeSlug)
    if (available.length === 0) return
    const pick = available[Math.floor(Math.random() * available.length)]
    router.push(`/blog/${pick.slug}`)
  }

  return (
    <button onClick={handleClick} className={styles.btn} disabled={posts.length <= 1}>
      Feeling curious? →
    </button>
  )
}
