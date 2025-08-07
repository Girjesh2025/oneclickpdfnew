'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">Data Collection</h2>
            <p className="text-secondary-600 mb-4">
              We only process files temporarily for conversion. Files are automatically deleted after processing.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">Data Security</h2>
            <p className="text-secondary-600 mb-4">
              All file processing happens securely. We use industry-standard encryption and security measures.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">Contact</h2>
            <p className="text-secondary-600">
              Questions about privacy? Contact us at hello@oneclickpdf.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
