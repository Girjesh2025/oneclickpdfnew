'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

// Translation resources
const resources = {
  en: {
    translation: {
      tools: {
        merge: {
          title: 'Merge PDF',
          description: 'Combine multiple PDF files into one document'
        },
        split: {
          title: 'Split PDF',
          description: 'Split a PDF into separate pages or sections'
        },
        compress: {
          title: 'Compress PDF',
          description: 'Reduce the size of your PDF files'
        },
        organize: {
          title: 'Organize PDF',
          description: 'Reorder, add, or remove pages from your PDF'
        },
        rotate: {
          title: 'Rotate Document',
          description: 'Rotate pages and images to the correct orientation'
        },
        'page-numbers': {
          title: 'Add Page Numbers',
          description: 'Add page numbers to any document format'
        },
        'word-to-pdf': {
          title: 'Word to PDF',
          description: 'Convert Word documents to PDF format'
        },
        'excel-to-pdf': {
          title: 'Excel to PDF',
          description: 'Convert Excel spreadsheets to PDF format'
        },
        'powerpoint-to-pdf': {
          title: 'PowerPoint to PDF',
          description: 'Convert PowerPoint presentations to PDF format'
        },
        'pdf-to-jpg': {
          title: 'PDF to JPG',
          description: 'Convert PDF pages to JPG images'
        },
        'jpg-to-pdf': {
          title: 'JPG to PDF',
          description: 'Convert JPG images to PDF documents'
        },
        'html-to-pdf': {
          title: 'HTML to PDF',
          description: 'Convert HTML content to PDF documents'
        },
        'edit-pdf': {
          title: 'Edit Document',
          description: 'Edit text, annotations, and content in any document format'
        },
        crop: {
          title: 'Crop Document',
          description: 'Crop pages and images to remove unwanted areas'
        },
        watermark: {
          title: 'Add Watermark',
          description: 'Add text or image watermarks to any document'
        },
        'protect-pdf': {
          title: 'Protect PDF',
          description: 'Add password protection to your PDF files'
        },
        'unlock-pdf': {
          title: 'Unlock PDF',
          description: 'Remove password protection from PDF files'
        },
        'sign-pdf': {
          title: 'Sign PDF',
          description: 'Add digital signatures to your PDF documents'
        },
        'redact-pdf': {
          title: 'Redact PDF',
          description: 'Remove sensitive information from PDF documents'
        },
        ocr: {
          title: 'OCR (Text Recognition)',
          description: 'Extract text from scanned PDFs and images'
        },
        'scan-to-pdf': {
          title: 'Scan to PDF',
          description: 'Convert scanned documents to searchable PDFs'
        },
        'repair-pdf': {
          title: 'Repair PDF',
          description: 'Fix corrupted or damaged PDF files'
        },
        'pdf-to-pdfa': {
          title: 'PDF to PDF/A',
          description: 'Convert PDF to archival PDF/A format'
        }
      },
      recent: {
        title: 'Recently Used',
        clear: 'Clear recent tools'
      },
      search: {
        placeholder: 'Search PDF tools...',
        searching: 'Searching for "{{query}}"...',
        noResults: 'No tools found',
        noTools: 'No tools available',
        tryDifferent: 'Try a different search term',
        selectCategory: 'Try selecting a different category'
      }
    }
  }
}

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

// Language context
interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
} 