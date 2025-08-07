import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PDF to JPG - OneClickPDF',
  description: 'Convert PDF pages to JPG images. Free online PDF tool.',
  keywords: ['pdf', 'pdf to-jpg', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PdfToJpgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}