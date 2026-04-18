import Link from 'next/link'
import { getRecentPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'
import { Chip } from '@/components/chip/Chip'
import { StampTag } from '@/components/ui/StampTag'
import { TemperatureBadge } from '@/components/ui/TemperatureBadge'
import { computeTemperature } from '@/lib/temperature'
import { current, thoughtProgress } from '@/config/current'
import { IdeaJar } from '@/components/home/IdeaJar'
import { site } from '@/config/site'
import styles from './page.module.css'

export default function HomePage() {
  const posts    = getRecentPosts(3)
  const projects = getFeaturedProjects(3)

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>
            <Chip state="idle" size={20} />
            <span>{site.role}</span>
          </p>
          <h1 className={styles.heroHeadline}>{site.name}</h1>
          <p className={styles.heroTagline}>{site.tagline}</p>
          <div className={styles.heroCta}>
            <Link href="/work" className={styles.ctaPrimary}>View my work</Link>
            <Link href="/blog" className={styles.ctaSecondary}>Read the blog</Link>
          </div>
        </div>

        {/* Video stub — replaced by Remotion in Task 3.2 */}
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.heroVideoStub}>
            <Chip state="excited" size={80} commentary="Hi. I'm CHIP." />
          </div>
        </div>
      </section>

      {/* Latest Thinking */}
      <section className={styles.section} aria-labelledby="posts-heading">
        <header className={styles.sectionHeader}>
          <h2 id="posts-heading">Latest Thinking</h2>
          <Link href="/blog" className={styles.seeAll}>All posts →</Link>
        </header>

        <ul className={styles.postGrid} role="list">
          {posts.map(post => {
            const temp = computeTemperature(post.date, 0, post.temperature)
            return (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <TemperatureBadge temperature={temp} />
                    <span className={styles.postCategory}>{post.category}</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postFoot}>
                    <span className={styles.readTime}>{post.reading_time} min read</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Selected Work */}
      <section className={styles.section} aria-labelledby="work-heading">
        <header className={styles.sectionHeader}>
          <h2 id="work-heading">Selected Work</h2>
          <Link href="/work" className={styles.seeAll}>All projects →</Link>
        </header>

        <ul className={styles.projectGrid} role="list">
          {projects.map(p => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className={styles.projectCard}
                style={{ '--accent': p.project_accent_color } as React.CSSProperties}
              >
                <div
                  className={styles.projectThumb}
                  style={{ background: p.project_accent_color + '22' }}
                />
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectRole}>{p.role} · {p.year}</p>
                  <p className={styles.projectExcerpt}>{p.excerpt}</p>
                  <div className={styles.projectTags}>
                    {p.tags.slice(0, 3).map(t => (
                      <StampTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Currently */}
      <section className={styles.section} aria-labelledby="currently-heading">
        <h2 id="currently-heading" className={styles.currentlyHeading}>Currently</h2>
        <div className={styles.currentlyGrid}>
          <div className={styles.currentlyCard}>
            <span className={styles.currentlyLabel}>Building</span>
            <p>{current.building}</p>
          </div>
          <div className={styles.currentlyCard}>
            <span className={styles.currentlyLabel}>Reading</span>
            <p>{current.reading}</p>
          </div>
          <div className={styles.currentlyCard}>
            <span className={styles.currentlyLabel}>Thinking about</span>
            <p>{current.thinking}</p>
          </div>
          <div className={styles.currentlyCard}>
            <span className={styles.currentlyLabel}>Listening to</span>
            <p>{current.music}</p>
          </div>
        </div>

        <IdeaJar />

        {/* Thought Progress */}
        <div className={styles.thoughtProgress} aria-label="Thought progress bars">
          {thoughtProgress.map(t => (
            <div key={t.topic} className={styles.thought}>
              <div className={styles.thoughtMeta}>
                <span>{t.topic}</span>
                <span className={styles.thoughtPct}>{t.pct}%</span>
              </div>
              <div className={styles.progressBar} role="progressbar" aria-valuenow={t.pct} aria-valuemin={0} aria-valuemax={100}>
                <div className={styles.progressFill} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
