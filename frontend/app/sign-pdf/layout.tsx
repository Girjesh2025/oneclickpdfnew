import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Sign PDF - OneClickPDF',
  description: 'Add digital signature to PDF. Free online PDF tool.',
  keywords: ['pdf', 'sign pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function SignPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}