import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { calculateReadingTime } from './reading-time'
import type { Temperature } from './temperature'

export type CuriosityData = {
  technical:    number
  philosophical: number
  absurd:       number
  practical:    number
  strange:      number
}

export type PostFrontmatter = {
  title:                string
  slug:                 string
  date:                 string
  updated?:             string
  category:             string
  tags:                 string[]
  excerpt:              string
  reading_time:         number
  status:               'published' | 'draft'
  temperature?:         Temperature
  chip_commentary?:     string
  quirk_level?:         number
  curiosity?:           CuriosityData
  project_accent_color?: string
  has_margin_doodles?:  boolean
  og_image?:            string
  related_quest?:       string
}

export type ProjectFrontmatter = {
  title:               string
  slug:                string
  year:                number
  role:                string
  tags:                string[]
  excerpt:             string
  status:              'published' | 'draft'
  project_accent_color: string
  tech:                string[]
  featured?:           boolean
}

export type PostMeta = PostFrontmatter & { slug: string }
export type ProjectMeta = ProjectFrontmatter & { slug: string }

const BLOG_DIR    = path.join(process.cwd(), 'content/blog')
const WORK_DIR    = path.join(process.cwd(), 'content/work')

function slugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
}

export function getAllPostMeta(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      const slug = (data.slug as string) || slugFromFilename(filename)
      const reading_time = (data.reading_time as number) || calculateReadingTime(content)

      return { ...(data as PostFrontmatter), slug, reading_time } as PostMeta
    })
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllProjectMeta(): ProjectMeta[] {
  if (!fs.existsSync(WORK_DIR)) return []

  return fs
    .readdirSync(WORK_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(WORK_DIR, filename), 'utf8')
      const { data } = matter(raw)
      const slug = (data.slug as string) || filename.replace(/\.mdx$/, '')
      return { ...(data as ProjectFrontmatter), slug } as ProjectMeta
    })
    .filter(p => p.status === 'published')
    .sort((a, b) => b.year - a.year)
}

export async function getPostBySlug(slug: string) {
  if (!fs.existsSync(BLOG_DIR)) return null

  const files = fs.readdirSync(BLOG_DIR)
  const filename = files.find(f => {
    const fileSlug = (matter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')).data.slug as string)
      || slugFromFilename(f)
    return fileSlug === slug
  })

  if (!filename) return null

  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const mdxSource = await serialize(content)
  const reading_time = (data.reading_time as number) || calculateReadingTime(content)

  return {
    frontmatter: { ...(data as PostFrontmatter), slug, reading_time } as PostMeta,
    mdxSource,
  }
}

export async function getProjectBySlug(slug: string) {
  if (!fs.existsSync(WORK_DIR)) return null

  const filename = `${slug}.mdx`
  const filepath = path.join(WORK_DIR, filename)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  const mdxSource = await serialize(content)

  return {
    frontmatter: { ...(data as ProjectFrontmatter), slug } as ProjectMeta,
    mdxSource,
  }
}
