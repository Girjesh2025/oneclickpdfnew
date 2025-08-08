import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'JPG to PDF - OneClickPDF',
  description: 'Convert JPG images to PDF. Free online PDF tool.',
  keywords: ['pdf', 'jpg to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function JpgToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}