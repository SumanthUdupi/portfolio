export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 238
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}
