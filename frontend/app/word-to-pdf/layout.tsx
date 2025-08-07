import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Word to PDF - OneClickPDF',
  description: 'Convert Word document to PDF. Free online PDF tool.',
  keywords: ['pdf', 'word to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function WordToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}