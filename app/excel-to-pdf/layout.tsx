import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Excel to PDF - OneClickPDF',
  description: 'Convert Excel spreadsheet to PDF. Free online PDF tool.',
  keywords: ['pdf', 'excel to-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ExcelToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}