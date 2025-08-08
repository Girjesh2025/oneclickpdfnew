import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PDF to PDF/A - OneClickPDF',
  description: 'Convert to archival PDF format. Free online PDF tool.',
  keywords: ['pdf', 'pdf to-pdfa', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PdfToPdfaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}