'use client'

import { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      hero: {
        title: 'OneClickPDF',
        subtitle: 'Professional PDF tools at your fingertips. Convert, merge, split, compress and edit PDF files online with advanced AI features.'
      },
      features: {
        fast: {
          title: 'Lightning Fast',
          description: 'Process your PDF files in seconds with our optimized algorithms.'
        },
        secure: {
          title: 'Secure & Private',
          description: 'Your files are processed securely and deleted after 24 hours.'
        },
        free: {
          title: 'Free to Use',
          description: 'All essential PDF tools are completely free with no hidden costs.'
        }
      },
      tools: {
        merge: {
          title: 'Merge PDF',
          description: 'Combine multiple PDF files into one document'
        },
        split: {
          title: 'Split PDF',
          description: 'Extract pages from your PDF document'
        },
        compress: {
          title: 'Compress PDF',
          description: 'Reduce the size of your PDF files'
        },
        convert: {
          title: 'Convert PDF',
          description: 'Convert PDF to Word, Excel, PowerPoint and more'
        },
        'pdf-to-jpg': {
          title: 'PDF to JPG',
          description: 'Convert PDF pages to high-quality images'
        },
        'jpg-to-pdf': {
          title: 'JPG to PDF',
          description: 'Convert images to PDF documents'
        },
        rotate: {
          title: 'Rotate PDF',
          description: 'Rotate PDF pages to the correct orientation'
        },
        watermark: {
          title: 'Add Watermark',
          description: 'Add text or image watermarks to your PDF'
        },
        'protect-pdf': {
          title: 'Protect PDF',
          description: 'Add password protection to your PDF files'
        },
        'edit-pdf': {
          title: 'Edit PDF',
          description: 'Edit text and images in your PDF documents'
        },
        'unlock-pdf': {
          title: 'Unlock PDF',
          description: 'Remove password protection from PDF files'
        },
        organize: {
          title: 'Organize PDF',
          description: 'Reorder, delete, and arrange PDF pages'
        },
        crop: {
          title: 'Crop PDF',
          description: 'Crop PDF pages to remove unwanted margins'
        },
        'sign-pdf': {
          title: 'Sign PDF',
          description: 'Add digital signatures to your PDF documents'
        },
        'redact-pdf': {
          title: 'Redact PDF',
          description: 'Remove sensitive information from PDF files'
        },
        'html-to-pdf': {
          title: 'HTML to PDF',
          description: 'Convert web pages and HTML content to PDF'
        },
        'page-numbers': {
          title: 'Page Numbers',
          description: 'Add page numbers to your PDF documents'
        },
        'pdf-to-word': {
          title: 'PDF to Word',
          description: 'Convert PDF documents to editable Word files'
        },
        'word-to-pdf': {
          title: 'Word to PDF',
          description: 'Convert Word documents to PDF format'
        },
        'pdf-to-excel': {
          title: 'PDF to Excel',
          description: 'Convert PDF tables to Excel spreadsheets'
        },
        'excel-to-pdf': {
          title: 'Excel to PDF',
          description: 'Convert Excel spreadsheets to PDF format'
        },
        'pdf-to-powerpoint': {
          title: 'PDF to PowerPoint',
          description: 'Convert PDF slides to PowerPoint presentations'
        },
        'powerpoint-to-pdf': {
          title: 'PowerPoint to PDF',
          description: 'Convert PowerPoint presentations to PDF'
        },
        ocr: {
          title: 'OCR PDF',
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
      upload: {
        title: 'Upload your files',
        subtitle: 'Drag and drop files here or click to browse',
        supported: 'Supported formats',
        maxSize: 'Maximum file size: 100MB',
        processing: 'Processing...',
        complete: 'Processing complete!',
        download: 'Download Result'
      },
      nav: {
        home: 'Home',
        tools: 'Tools',
        about: 'About',
        contact: 'Contact'
      }
    }
  },
  es: {
    translation: {
      hero: {
        title: 'OneClickPDF',
        subtitle: 'Herramientas PDF profesionales al alcance de tus dedos. Convierte, combina, divide, comprime y edita archivos PDF en línea con funciones de IA avanzadas.'
      },
      features: {
        fast: {
          title: 'Súper Rápido',
          description: 'Procesa tus archivos PDF en segundos con nuestros algoritmos optimizados.'
        },
        secure: {
          title: 'Seguro y Privado',
          description: 'Tus archivos se procesan de forma segura y se eliminan después de 24 horas.'
        },
        free: {
          title: 'Gratis',
          description: 'Todas las herramientas PDF esenciales son completamente gratuitas.'
        }
      },
      tools: {
        merge: {
          title: 'Combinar PDF',
          description: 'Combina múltiples archivos PDF en un solo documento'
        },
        split: {
          title: 'Dividir PDF',
          description: 'Extrae páginas de tu documento PDF'
        },
        compress: {
          title: 'Comprimir PDF',
          description: 'Reduce el tamaño de tus archivos PDF'
        },
        'edit-pdf': {
          title: 'Editar PDF',
          description: 'Edita texto e imágenes en tus documentos PDF'
        },
        'protect-pdf': {
          title: 'Proteger PDF',
          description: 'Añade protección con contraseña a tus archivos PDF'
        }
      }
    }
  },
  fr: {
    translation: {
      hero: {
        title: 'OneClickPDF',
        subtitle: 'Outils PDF professionnels à portée de main. Convertissez, fusionnez, divisez, compressez et éditez des fichiers PDF en ligne avec des fonctionnalités IA avancées.'
      },
      features: {
        fast: {
          title: 'Ultra Rapide',
          description: 'Traitez vos fichiers PDF en quelques secondes avec nos algorithmes optimisés.'
        },
        secure: {
          title: 'Sécurisé et Privé',
          description: 'Vos fichiers sont traités en toute sécurité et supprimés après 24 heures.'
        },
        free: {
          title: 'Gratuit',
          description: 'Tous les outils PDF essentiels sont entièrement gratuits.'
        }
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize i18n on the client side
  }, [])

  return <>{children}</>
} 