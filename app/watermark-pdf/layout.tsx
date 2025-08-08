import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Watermark PDF - OneClickPDF',
  description: 'Add watermark to PDF. Free online PDF tool.',
  keywords: ['pdf', 'watermark pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function WatermarkPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}