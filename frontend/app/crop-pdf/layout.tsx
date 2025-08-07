import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Crop PDF - OneClickPDF',
  description: 'Crop PDF pages. Free online PDF tool.',
  keywords: ['pdf', 'crop pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function CropPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}