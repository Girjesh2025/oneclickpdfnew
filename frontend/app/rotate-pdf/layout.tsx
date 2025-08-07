import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Rotate PDF - OneClickPDF',
  description: 'Rotate PDF pages. Free online PDF tool.',
  keywords: ['pdf', 'rotate pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RotatePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}