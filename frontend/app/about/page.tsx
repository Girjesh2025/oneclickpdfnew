'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Zap, Shield, Globe } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8 text-center">About OneClickPDF</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-8 text-center text-xl">
              Professional PDF tools for everyone. Fast, secure, and completely free.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">Lightning Fast</h3>
                <p className="text-secondary-600">Process files instantly with our optimized tools</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">100% Secure</h3>
                <p className="text-secondary-600">Files are processed securely and deleted automatically</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Registration</h3>
                <p className="text-secondary-600">Start using tools immediately, no account needed</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
              <h2 className="text-2xl font-semibold text-secondary-800 mb-4">Our Mission</h2>
              <p className="text-secondary-600 mb-4">
                We believe PDF processing should be simple, fast, and accessible to everyone. 
                That's why we created OneClickPDF - a comprehensive suite of PDF tools that work instantly in your browser.
              </p>
              <p className="text-secondary-600">
                No downloads, no installations, no complicated software. Just professional-grade PDF tools 
                that help you get work done efficiently.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
