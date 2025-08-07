import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Page Numbers - OneClickPDF',
  description: 'Add page numbers to PDF. Free online PDF tool.',
  keywords: ['pdf', 'page numbers', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PageNumbersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}