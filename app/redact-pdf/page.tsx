'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import FileUpload from '@/components/FileUpload'
import ProcessingModal from '@/components/ProcessingModal'
import Footer from '@/components/Footer'
import { ArrowLeft, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function RedactPdfPage() {
  const { t } = useTranslation()
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles)
  }

  const handleProcessStart = () => {
    setIsProcessing(true)
  }

  const handleProcessComplete = () => {
    setIsProcessing(false)
    setFiles([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
            <EyeOff className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redact PDF</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Redact sensitive information</p>
        </div>

        {/* File Upload Area */}
        <div className="max-w-4xl mx-auto">
          <FileUpload
            tool="redact-pdf"
            files={files}
            onFilesUpload={handleFilesUpload}
            onProcessStart={handleProcessStart}
            onBack={() => window.history.back()}
          />

          {files.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Files:</h3>
              <ul className="space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
              <button
                onClick={handleProcessStart}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Process Files
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
            <p className="text-gray-600">Files processed securely</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">No Registration</h3>
            <p className="text-gray-600">Use without signing up</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Free Service</h3>
            <p className="text-gray-600">Completely free to use</p>
          </div>
        </div>
      </main>

      <Footer />

      {/* Processing Modal */}
      {isProcessing && (
        <ProcessingModal
          tool="redact-pdf"
          files={files}
          onComplete={handleProcessComplete}
        />
      )}
    </div>
  )
}