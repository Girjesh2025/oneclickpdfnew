import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PDF to Excel - OneClickPDF',
  description: 'Convert PDF to Excel spreadsheet. Free online PDF tool.',
  keywords: ['pdf', 'pdf to-excel', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PdfToExcelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}