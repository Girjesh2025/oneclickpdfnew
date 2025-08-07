import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'HTML to PDF - OneClickPDF',
  description: 'Convert HTML content to PDF. Free online PDF tool.',
  keywords: ['pdf', 'html to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function HtmlToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}