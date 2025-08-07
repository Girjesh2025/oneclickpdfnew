import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'OCR - OneClickPDF',
  description: 'Extract text from scanned PDFs. Free online PDF tool.',
  keywords: ['pdf', 'ocr', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function OcrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}