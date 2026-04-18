import { getAllProjectMeta, type ProjectMeta } from './mdx'

export function getAllProjects(): ProjectMeta[] {
  return getAllProjectMeta()
}

export function getFeaturedProjects(count = 3): ProjectMeta[] {
  const all = getAllProjectMeta()
  const featured = all.filter(p => p.featured)
  return featured.length >= count ? featured.slice(0, count) : all.slice(0, count)
}

export function getProjectSlugs(): string[] {
  return getAllProjectMeta().map(p => p.slug)
}
