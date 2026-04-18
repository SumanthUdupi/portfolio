import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/mdx'
import { getAllPosts } from '@/lib/posts'
import { computeTemperature } from '@/lib/temperature'
import { TemperatureBadge } from '@/components/ui/TemperatureBadge'
import { StampTag } from '@/components/ui/StampTag'
import { Chip } from '@/components/chip/Chip'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { mdxComponents } from '@/components/mdx'
import { XPBar } from '@/components/blog/XPBar'
import { CuriosityMeter } from '@/components/blog/CuriosityMeter'
import { ReactionButton } from '@/components/blog/ReactionButton'
import { RabbitHoleNavigator } from '@/components/blog/RabbitHoleNavigator'
import { getRelatedPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content } = post
  const temp = computeTemperature(frontmatter.date, 0, frontmatter.temperature)
  const related = getRelatedPosts(slug, 4)

  return (
    <PageWrapper>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <TemperatureBadge temperature={temp} />
            <span className={styles.category}>{frontmatter.category}</span>
            <span className={styles.date}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          </div>

          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.excerpt}>{frontmatter.excerpt}</p>

          <div className={styles.postInfo}>
            <span className={styles.readTime}>{frontmatter.reading_time} min read</span>
            <div className={styles.tags}>
              {frontmatter.tags.map(t => (
                <StampTag key={t} label={t} href={`/blog/tag/${t.toLowerCase()}`} />
              ))}
            </div>
          </div>

          {frontmatter.chip_commentary && (
            <div className={styles.chipCommentary}>
              <Chip state="reading" size={32} commentary={frontmatter.chip_commentary} />
              <span className={styles.chipLabel}>CHIP says</span>
            </div>
          )}
        </header>

        <XPBar />

        {frontmatter.curiosity && (
          <CuriosityMeter data={frontmatter.curiosity} />
        )}

        <div className={`${styles.body} prose`}>
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        <RabbitHoleNavigator
          currentSlug={slug}
          relatedSlugs={related.map(r => r.slug)}
        />

        <footer className={styles.articleFooter}>
          <div className={styles.footerActions}>
            <ReactionButton slug={slug} />
          </div>
          <p className={styles.footerNote}>
            Written by Sumanth Udupi · {' '}
            <a href="/about">About me</a> · <a href="/contact">Say hi</a>
          </p>
        </footer>
      </article>
    </PageWrapper>
  )
}
