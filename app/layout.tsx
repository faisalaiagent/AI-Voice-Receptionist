// ============================================================
// ROOT LAYOUT — fonts, metadata, providers
// ============================================================
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'VoiceAI — AI-Powered Receptionist Platform',
    template: '%s | VoiceAI',
  },
  description:
    'AI Voice Receptionist that answers calls, books appointments, and sends WhatsApp confirmations — automatically.',
  keywords: ['AI receptionist', 'voice AI', 'appointment booking', 'Twilio', 'WhatsApp automation'],
  authors: [{ name: 'VoiceAI Platform' }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'VoiceAI — AI-Powered Receptionist Platform',
    description: 'Automate your phone reception with AI.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060E1F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts — Syne (display) + DM Sans (body) + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
