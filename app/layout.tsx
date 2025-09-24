import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { AppProvider } from '@/lib/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TipJar - Capture Your Best Insights',
  description: 'Capture and recall your best offline insights effortlessly with smart tagging and contextual reminders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain="base"
        >
          <AppProvider>
            {children}
          </AppProvider>
        </OnchainKitProvider>
      </body>
    </html>
  )
}
