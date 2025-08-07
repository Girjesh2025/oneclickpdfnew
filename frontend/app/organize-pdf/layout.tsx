import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Organize PDF - OneClickPDF',
  description: 'Reorganize PDF pages. Free online PDF tool.',
  keywords: ['pdf', 'organize pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function OrganizePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}