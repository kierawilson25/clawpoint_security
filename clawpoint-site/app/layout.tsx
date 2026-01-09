import type { Metadata } from 'next'
import { Orbitron, Special_Elite, Inter, Roboto_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

// Sans-serif font (Geist alternative)
const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

// Mono font (Geist Mono alternative)
const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

// Tactical/military fonts
const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const specialElite = Special_Elite({
  variable: '--font-special-elite',
  subsets: ['latin'],
  weight: ['400']
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#00ff41'
}

export const metadata: Metadata = {
  title: 'Claw Point Security | Hunting Threats in the Digital Forest',
  description: 'Elite cybersecurity operations with tactical precision. We are the predators that hunt down digital threats in the darkness between compliance and operational reality.',
  keywords: [
    'cybersecurity',
    'security operations',
    'threat hunting',
    'tactical security',
    'digital defense',
    'cyber defense',
    'security consulting',
    'penetration testing',
    'vulnerability assessment'
  ],
  authors: [{ name: 'Claw Point Security' }],
  creator: 'Claw Point Security',
  publisher: 'Claw Point Security',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clawpoint.security',
    siteName: 'Claw Point Security',
    title: 'Claw Point Security | Hunting Threats in the Digital Forest',
    description: 'Elite cybersecurity operations with tactical precision. We hunt threats you cannot see.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Claw Point Security - Tactical Cybersecurity Operations'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claw Point Security | Hunting Threats in the Digital Forest',
    description: 'Elite cybersecurity operations with tactical precision.',
    images: ['/images/logo.png']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${specialElite.variable} antialiased`}
      >
        {/* Scanline effect overlay */}
        <div className="scanline" />

        {/* Main structure */}
        <Navigation />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
