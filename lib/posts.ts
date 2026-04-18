import { getAllPostMeta, type PostMeta } from './mdx'

export function getAllPosts(): PostMeta[] {
  return getAllPostMeta()
}

export function getRecentPosts(count = 3): PostMeta[] {
  return getAllPostMeta().slice(0, count)
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostMeta().filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostMeta().filter(p =>
    p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const all = getAllPostMeta()
  const current = all.find(p => p.slug === slug)
  if (!current) return all.slice(0, count)

  return all
    .filter(p => p.slug !== slug)
    .map(p => ({
      post: p,
      score: p.tags.filter(t => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(r => r.post)
}

export function getRandomPost(excludeSlug?: string): PostMeta | null {
  const posts = getAllPostMeta().filter(p => p.slug !== excludeSlug)
  if (posts.length === 0) return null
  return posts[Math.floor(Math.random() * posts.length)]
}

export function getAllCategories(): string[] {
  const cats = getAllPostMeta().map(p => p.category)
  return [...new Set(cats)].sort()
}

export function getAllTags(): string[] {
  const tags = getAllPostMeta().flatMap(p => p.tags)
  return [...new Set(tags)].sort()
}
