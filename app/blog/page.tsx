import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { PageWrapper } from '@/components/layout/PageWrapper'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on design, engineering, philosophy, and the chaos in between.',
}

export default function BlogPage() {
  const posts      = getAllPosts()
  const categories = getAllCategories()
  const tags       = getAllTags()

  return (
    <PageWrapper>
      <header className={styles.header}>
        <h1 className={styles.heading}>The Blog</h1>
        <p className={styles.sub}>Thoughts on design, engineering, philosophy, and the chaos in between.</p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <section>
            <h2 className={styles.filterLabel}>Categories</h2>
            <ul className={styles.filterList} role="list">
              {categories.map(c => (
                <li key={c}>
                  <a href={`/blog/category/${c.toLowerCase()}`} className={styles.filterLink}>{c}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.filterLabel}>Tags</h2>
            <div className={styles.tagCloud}>
              {tags.map(t => (
                <a key={t} href={`/blog/tag/${t.toLowerCase()}`} className={styles.tagLink}>{t}</a>
              ))}
            </div>
          </section>
        </aside>

        <section aria-label="Posts" className={styles.posts}>
          {posts.length === 0 ? (
            <p className={styles.empty}>No posts yet — check back soon.</p>
          ) : (
            <ul className={styles.postList} role="list">
              {posts.map(post => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageWrapper>
  )
}
