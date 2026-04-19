import Link from 'next/link'
import { getRecentPosts } from '@/lib/posts'
import { getFeaturedProjects } from '@/lib/projects'
import { StampTag } from '@/components/ui/StampTag'
import { TemperatureBadge } from '@/components/ui/TemperatureBadge'
import { computeTemperature } from '@/lib/temperature'
import { current, thoughtProgress } from '@/config/current'
import { IdeaJar } from '@/components/home/IdeaJar'
import { HeroSection } from '@/components/home/HeroSection'
import { AnimatedSection } from '@/components/home/AnimatedSection'
import styles from './page.module.css'

export default function HomePage() {
  const posts    = getRecentPosts(3)
  const projects = getFeaturedProjects(3)

  return (
    <>
      <HeroSection />

      {/* Latest Thinking */}
      <AnimatedSection className={styles.section} aria-labelledby="posts-heading">
        <header className={styles.sectionHeader}>
          <h2 id="posts-heading" className={styles.sectionTitle}>Latest Thinking</h2>
          <Link href="/blog" className={styles.seeAll}>All posts →</Link>
        </header>

        <ul className={styles.postGrid} role="list">
          {posts.map((post, i) => {
            const temp = computeTemperature(post.date, 0, post.temperature)
            return (
              <li key={post.slug} style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
                <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div className={styles.postAccent} />
                  <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                      <TemperatureBadge temperature={temp} />
                      <span className={styles.postCategory}>{post.category}</span>
                    </div>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postFoot}>
                      <span className={styles.readTime}>{post.reading_time} min read</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </AnimatedSection>

      {/* Selected Work */}
      <AnimatedSection className={styles.section} aria-labelledby="work-heading">
        <header className={styles.sectionHeader}>
          <h2 id="work-heading" className={styles.sectionTitle}>Selected Work</h2>
          <Link href="/work" className={styles.seeAll}>All projects →</Link>
        </header>

        <ul className={styles.projectGrid} role="list">
          {projects.map((p, i) => (
            <li key={p.slug} style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}>
              <Link
                href={`/work/${p.slug}`}
                className={styles.projectCard}
                style={{ '--accent': p.project_accent_color } as React.CSSProperties}
              >
                <div className={styles.projectThumb}>
                  <div className={styles.projectThumbInner}
                    style={{ background: `linear-gradient(135deg, ${p.project_accent_color}33, ${p.project_accent_color}11)` }}
                  />
                  <div className={styles.projectYear}>{p.year}</div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectRole}>{p.role}</p>
                  <p className={styles.projectExcerpt}>{p.excerpt}</p>
                  <div className={styles.projectTags}>
                    {p.tags.slice(0, 3).map(t => (
                      <StampTag key={t} label={t} />
                    ))}
                  </div>
                </div>
                <div className={styles.projectFold} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {/* Currently */}
      <AnimatedSection className={styles.section} aria-labelledby="currently-heading">
        <h2 id="currently-heading" className={styles.sectionTitle}>Currently</h2>
        <div className={styles.currentlyGrid}>
          {[
            { label: 'Building',       value: current.building },
            { label: 'Reading',        value: current.reading  },
            { label: 'Thinking about', value: current.thinking },
            { label: 'Listening to',   value: current.music    },
          ].map((item, i) => (
            <div
              key={item.label}
              className={styles.currentlyCard}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className={styles.currentlyLabel}>{item.label}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>

        <IdeaJar />

        <div className={styles.thoughtProgress}>
          {thoughtProgress.map(t => (
            <div key={t.topic} className={styles.thought}>
              <div className={styles.thoughtMeta}>
                <span>{t.topic}</span>
                <span className={styles.thoughtPct}>{t.pct}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </>
  )
}
