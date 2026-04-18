import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, IBM_Plex_Mono, Atkinson_Hyperlegible } from 'next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { CalmProvider } from '@/lib/calm-mode'
import { Terminal } from '@/components/terminal/Terminal'
import { KonamiCode } from '@/components/easter-eggs/KonamiCode'
import './globals.css'
import '../styles/globals.css'
import '../styles/typography.css'
import '../styles/prose.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-display',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-body',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-ui',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Sumanth Udupi',
    default: 'Sumanth Udupi — Product Designer',
  },
  description: 'Product Designer. Mechanical Engineer turned Data Scientist turned Designer. Building interfaces that feel magical.',
  metadataBase: new URL('https://chaos.curious.me'),
  openGraph: {
    type: 'website',
    siteName: 'Sumanth Udupi',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${ibmPlexMono.variable} ${atkinson.variable}`}
    >
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <CalmProvider>
            <Nav />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
            <Terminal />
            <KonamiCode />
          </CalmProvider>
        </body>
    </html>
  )
}
