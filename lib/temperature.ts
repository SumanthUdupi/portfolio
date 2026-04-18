export type Temperature = 'fresh' | 'hot' | 'cold' | 'classic'

export function computeTemperature(
  date: string,
  reactionCount = 0,
  override?: Temperature
): Temperature {
  if (override) return override

  const now = Date.now()
  const postDate = new Date(date).getTime()
  const ageMs = now - postDate
  const ageDays = ageMs / (1000 * 60 * 60 * 24)

  if (ageDays < 2) return 'fresh'
  if (ageDays < 30 && reactionCount > 10) return 'hot'
  if (ageDays > 180 && reactionCount > 50) return 'classic'
  return 'cold'
}

export const temperatureEmoji: Record<Temperature, string> = {
  fresh:   '🌱',
  hot:     '🔥',
  cold:    '🧊',
  classic: '🏺',
}
