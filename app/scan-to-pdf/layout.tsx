import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Scan to PDF - OneClickPDF',
  description: 'Convert scanned images to PDF. Free online PDF tool.',
  keywords: ['pdf', 'scan to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ScanToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}