import Link from 'next/link'
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

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${styles[variant]}`}
    >
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
          {post.tags.slice(0, 3).map(t => (
            <StampTag key={t} label={t} />
          ))}
        </div>
        <span className={styles.readTime}>{post.reading_time} min</span>
      </div>
    </Link>
  )
}
