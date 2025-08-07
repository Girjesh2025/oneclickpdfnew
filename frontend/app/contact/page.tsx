'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8">Contact Us</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Mail size={32} className="text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-secondary-800 mb-4">Get in Touch</h2>
            <p className="text-secondary-600 mb-6">
              Have questions or need help? We're here to assist you with any PDF processing needs.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-secondary-800 mb-2">Email Support</h3>
                <a 
                  href="mailto:hello@oneclickpdf.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  hello@oneclickpdf.com
                </a>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-secondary-500">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
