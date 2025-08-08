import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Unlock PDF - OneClickPDF',
  description: 'Remove password from PDF. Free online PDF tool.',
  keywords: ['pdf', 'unlock pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function UnlockPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}