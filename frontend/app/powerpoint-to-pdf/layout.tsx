import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PowerPoint to PDF - OneClickPDF',
  description: 'Convert PowerPoint to PDF. Free online PDF tool.',
  keywords: ['pdf', 'powerpoint to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PowerpointToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}