import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Password Protect PDF - OneClickPDF',
  description: 'Add password protection. Free online PDF tool.',
  keywords: ['pdf', 'password protect-pdf', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PasswordProtectPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}