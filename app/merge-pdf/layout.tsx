import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Merge PDF - OneClickPDF',
  description: 'Combine multiple PDF files into one. Free online PDF tool.',
  keywords: ['pdf', 'merge pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}