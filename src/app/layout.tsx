import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import { Providers } from './providers'
import './globals.css'
import 'react-photo-view/dist/react-photo-view.css'

export const metadata: Metadata = {
  title: 'cobweb',
  description: 'Collect, store and distribute meaningful static data',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers className="h-screen w-screen font-sans">
          <main className="min-h-full">
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
