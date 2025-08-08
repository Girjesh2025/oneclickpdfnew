import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PDF to Word - OneClickPDF',
  description: 'Convert PDF to Word document. Free online PDF tool.',
  keywords: ['pdf', 'pdf to-word', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PdfToWordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}