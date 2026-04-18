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

export const ideaJar: string[] = [
  'What if design systems were written as poetry?',
  'Every good interface is a quiet argument about what matters.',
  'The best UX is the one users never think about.',
  'Data tells you what happened. Design tells you what could.',
  'Complexity is easy. Clarity is the hard part.',
  'A good question is worth more than a perfect answer.',
  'CHIP thinks the loading spinner is the most honest UI element.',
]

export const thoughtProgress: ThoughtProgressItem[] = [
  { topic: 'Philosophy',      pct: 80, note: 'deep in it' },
  { topic: 'World-building',  pct: 70, note: 'entire universes' },
  { topic: 'Vibe-coding',     pct: 60, note: 'experiments everywhere' },
  { topic: 'Fantasy writing', pct: 50, note: 'getting there' },
]
