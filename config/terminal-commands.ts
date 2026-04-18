export type TerminalCommand = {
  name: string
  description: string
  handler: string
}

export const terminalCommands: TerminalCommand[] = [
  { name: 'help',        description: 'List available commands',     handler: 'help' },
  { name: 'whoami',      description: 'Print bio in ASCII art',      handler: 'whoami' },
  { name: 'ls projects', description: 'List all projects',           handler: 'ls-projects' },
  { name: 'ls posts',    description: 'List all blog posts',         handler: 'ls-posts' },
  { name: 'cat resume',  description: 'Display resume in terminal',  handler: 'cat-resume' },
  { name: 'cat about',   description: 'Display about page as text',  handler: 'cat-about' },
  { name: 'easter-eggs', description: 'Get cryptic hints',           handler: 'easter-eggs' },
  { name: 'clear',       description: 'Clear the terminal',          handler: 'clear' },
  { name: 'exit',        description: 'Close the terminal',          handler: 'exit' },
]
