import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Redact PDF - OneClickPDF',
  description: 'Redact sensitive information. Free online PDF tool.',
  keywords: ['pdf', 'redact pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RedactPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}