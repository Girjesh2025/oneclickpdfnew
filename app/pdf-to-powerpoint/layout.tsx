import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PDF to PowerPoint - OneClickPDF',
  description: 'Convert PDF to PowerPoint presentation. Free online PDF tool.',
  keywords: ['pdf', 'pdf to-powerpoint', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PdfToPowerpointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}