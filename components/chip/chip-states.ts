export type ChipState =
  | 'idle'
  | 'reading'
  | 'working'
  | 'confused'
  | 'excited'
  | 'sleepy'
  | 'error'
  | 'victory'

export type ChipSVGData = {
  eyeLeft:  string
  eyeRight: string
  mouth:    string
  body:     string
  extras?:  string
}

export const chipStates: Record<ChipState, ChipSVGData> = {
  idle: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M9 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    eyeRight: 'M15 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    mouth:    'M9 16q3 2 6 0',
  },
  reading: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 11h2v1H8z',
    eyeRight: 'M14 11h2v1h-2z',
    mouth:    'M10 16h4',
    extras:   '<rect x="3" y="17" width="7" height="5" rx="1" fill="currentColor" opacity="0.3"/>',
  },
  working: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M9 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    eyeRight: 'M15 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    mouth:    'M9 16q3 1 6-1',
    extras:   '<circle cx="18" cy="7" r="3" fill="var(--color-accent-amber)"/>',
  },
  confused: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 10l2 2m0-2L8 12',
    eyeRight: 'M14 10l2 2m0-2l-2 2',
    mouth:    'M10 17q1-2 4 0',
    extras:   '<path d="M12 2v2M12 2l1.5-1M12 2l-1.5-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  },
  excited: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 10.5c0-1 1-1.5 1.5-1.5S11 9.5 11 10.5s-1 2-1.5 2S8 11.5 8 10.5z',
    eyeRight: 'M13 10.5c0-1 1-1.5 1.5-1.5S16 9.5 16 10.5s-1 2-1.5 2S13 11.5 13 10.5z',
    mouth:    'M8 16q4 3 8 0',
    extras:   '<path d="M5 8l1 1M19 8l-1 1M12 3v1.5" stroke="var(--color-accent-amber)" stroke-width="1.5" stroke-linecap="round"/>',
  },
  sleepy: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 11.5c0-.5.3-1 1-1s1 .5 1 1-.3.5-1 .5-1 0-1-.5z',
    eyeRight: 'M14 11.5c0-.5.3-1 1-1s1 .5 1 1-.3.5-1 .5-1 0-1-.5z',
    mouth:    'M10 16h4',
    extras:   '<text x="18" y="9" font-size="6" fill="var(--color-accent-teal)">z</text><text x="20" y="6" font-size="4" fill="var(--color-accent-teal)">z</text>',
  },
  error: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 10l2 2m0-2L8 12',
    eyeRight: 'M14 10l2 2m0-2l-2 2',
    mouth:    'M9 17q3-2 6 0',
    extras:   '<path d="M12 3l1 4h-2l1-4z" fill="var(--color-error)"/>',
  },
  victory: {
    body:     'M12 4a8 8 0 0 1 8 8v8H4v-8a8 8 0 0 1 8-8z',
    eyeLeft:  'M8 10.5c0-1 1-1.5 1.5-1.5S11 9.5 11 10.5s-1 2-1.5 2S8 11.5 8 10.5z',
    eyeRight: 'M13 10.5c0-1 1-1.5 1.5-1.5S16 9.5 16 10.5s-1 2-1.5 2S13 11.5 13 10.5z',
    mouth:    'M7 16q5 4 10 0',
    extras:   '<path d="M5 7l2-3M19 7l-2-3M12 3l0-2" stroke="var(--color-accent-amber)" stroke-width="2" stroke-linecap="round"/>',
  },
}
