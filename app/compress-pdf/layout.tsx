import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Compress PDF - OneClickPDF',
  description: 'Reduce PDF file size. Free online PDF tool.',
  keywords: ['pdf', 'compress pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function CompressPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}