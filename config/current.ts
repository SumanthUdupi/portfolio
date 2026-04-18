export const current = {
  building:  'chaos.curious.me — a portfolio that thinks for itself',
  reading:   'Something philosophical (update this)',
  thinking:  'The intersection of systems thinking and product design',
  music:     'Whatever is in the queue',
} as const

export type ThoughtProgressItem = {
  topic: string
  pct: number
  note: string
}

export const thoughtProgress: ThoughtProgressItem[] = [
  { topic: 'Philosophy',      pct: 80, note: 'deep in it' },
  { topic: 'World-building',  pct: 70, note: 'entire universes' },
  { topic: 'Vibe-coding',     pct: 60, note: 'experiments everywhere' },
  { topic: 'Fantasy writing', pct: 50, note: 'getting there' },
]
