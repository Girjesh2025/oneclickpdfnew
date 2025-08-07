import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Edit PDF - OneClickPDF',
  description: 'Edit PDF content and annotations. Free online PDF tool.',
  keywords: ['pdf', 'edit pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function EditPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}