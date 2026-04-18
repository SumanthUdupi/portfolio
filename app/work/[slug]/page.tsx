import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectBySlug } from '@/lib/mdx'
import { getProjectSlugs } from '@/lib/projects'
import { StampTag } from '@/components/ui/StampTag'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { mdxComponents } from '@/components/mdx'
import type { Metadata } from 'next'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { frontmatter, content } = project

  return (
    <PageWrapper>
      <article className={styles.article}>
        <header
          className={styles.header}
          style={{ '--accent': frontmatter.project_accent_color } as React.CSSProperties}
        >
          <div
            className={styles.heroBar}
            style={{ background: frontmatter.project_accent_color }}
          />

          <div className={styles.headerContent}>
            <div className={styles.meta}>
              <span className={styles.year}>{frontmatter.year}</span>
              <span className={styles.role}>{frontmatter.role}</span>
            </div>

            <h1 className={styles.title}>{frontmatter.title}</h1>
            <p className={styles.excerpt}>{frontmatter.excerpt}</p>

            <div className={styles.tags}>
              {frontmatter.tags.map(t => (
                <StampTag key={t} label={t} />
              ))}
            </div>

            <div className={styles.tech}>
              <span className={styles.techLabel}>Tech used:</span>
              {frontmatter.tech.map(t => (
                <code key={t} className={styles.techItem}>{t}</code>
              ))}
            </div>
          </div>
        </header>

        <div className={`${styles.body} prose`}>
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        <footer className={styles.articleFooter}>
          <a href="/work" className={styles.back}>← Back to all work</a>
        </footer>
      </article>
    </PageWrapper>
  )
}
