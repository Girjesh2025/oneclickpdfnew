'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              By using OneClickPDF, you agree to these terms of service.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">Service Usage</h2>
            <p className="text-secondary-600 mb-4">
              Our PDF tools are provided free of charge for personal and commercial use.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">File Processing</h2>
            <p className="text-secondary-600 mb-4">
              Files are processed temporarily and deleted automatically. We don't store your documents.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">Limitations</h2>
            <p className="text-secondary-600">
              Service is provided "as is" without warranties. File size limits may apply.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
