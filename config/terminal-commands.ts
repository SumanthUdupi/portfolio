export type TerminalCommand = {
  command: string
  description: string
  output: string
  action?: 'navigate'
  target?: string
}

export const COMMANDS: TerminalCommand[] = [
  {
    command: 'help',
    description: 'List available commands',
    output: [
      'Available commands:',
      '  whoami       — print bio',
      '  ls projects  — list all projects',
      '  ls posts     — list all blog posts',
      '  cat resume   — view resume',
      '  cat about    — go to about page',
      '  easter-eggs  — cryptic hints',
      '  clear        — clear screen',
      '  exit         — close terminal',
    ].join('\n'),
  },
  {
    command: 'whoami',
    description: 'Print bio',
    output: 'Sumanth Udupi — Product Designer.\nMechanical Engineer → Data Scientist → Designer.\nCurrently building interfaces that feel magical and are grounded in reality.',
  },
  {
    command: 'ls projects',
    description: 'List all projects',
    output: 'Navigating to /work...',
    action: 'navigate',
    target: '/work',
  },
  {
    command: 'ls posts',
    description: 'List all blog posts',
    output: 'Navigating to /blog...',
    action: 'navigate',
    target: '/blog',
  },
  {
    command: 'cat resume',
    description: 'View resume',
    output: 'Resume not yet uploaded. Check /about for now.',
  },
  {
    command: 'cat about',
    description: 'About in text form',
    output: 'Navigating to /about...',
    action: 'navigate',
    target: '/about',
  },
  {
    command: 'easter-eggs',
    description: 'Get cryptic hints',
    output: '🥚 There are 7. Hints:\n   - Old school game pad inputs\n   - Rapid clicking on CHIP\n   - Read a lot in one session\n   - Hover the copyright year\n   - You found /secret\n   - Be thorough with the portfolio\n   - Night owl hours',
  },
]
