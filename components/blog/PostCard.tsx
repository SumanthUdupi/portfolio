'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { PostMeta } from '@/lib/mdx'
import { computeTemperature } from '@/lib/temperature'
import { TemperatureBadge } from '@/components/ui/TemperatureBadge'
import { StampTag } from '@/components/ui/StampTag'
import styles from './PostCard.module.css'

type PostCardProps = {
  post: PostMeta
  variant?: 'default' | 'featured'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const temp = computeTemperature(post.date, 0, post.temperature)
  const ref  = useRef<HTMLAnchorElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${styles[variant]}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      variants={{
        hidden:  { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className={styles.accent} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <TemperatureBadge temperature={temp} />
          <span className={styles.category}>{post.category}</span>
          <span className={styles.date}>
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {post.tags.slice(0, 2).map(t => <StampTag key={t} label={t} />)}
          </div>
          <span className={styles.readTime}>{post.reading_time} min</span>
        </div>
      </div>
    </motion.a>
  )
}
