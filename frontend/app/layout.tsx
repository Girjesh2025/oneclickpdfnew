import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { I18nProvider } from '@/components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OneClickPDF - Professional PDF Tools',
  description: 'Convert, merge, split, compress and edit PDF files online. Professional PDF tools for all your document needs.',
  keywords: ['pdf', 'converter', 'merge', 'split', 'compress', 'edit', 'online'],
  authors: [{ name: 'OneClickPDF Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </I18nProvider>
      </body>
    </html>
  )
} 