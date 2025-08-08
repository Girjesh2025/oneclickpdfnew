'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">Is OneClickPDF free to use?</h3>
              <p className="text-secondary-600">Yes, all our PDF tools are completely free with no registration required.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">Are my files secure?</h3>
              <p className="text-secondary-600">Yes, files are processed securely and deleted automatically after conversion.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">What file formats are supported?</h3>
              <p className="text-secondary-600">We support PDF, Word, Excel, PowerPoint, images (JPG, PNG), and more.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">Is there a file size limit?</h3>
              <p className="text-secondary-600">Most tools support files up to 100MB. Edit tools support up to 500MB.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">Do I need to create an account?</h3>
              <p className="text-secondary-600">No registration required. Just upload your file and start processing.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
