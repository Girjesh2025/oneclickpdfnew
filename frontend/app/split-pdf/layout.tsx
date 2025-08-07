import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Split PDF - OneClickPDF',
  description: 'Split PDF into individual pages. Free online PDF tool.',
  keywords: ['pdf', 'split pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function SplitPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}