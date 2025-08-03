'use client'

import { useTranslation } from 'react-i18next'
import { Heart, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1C</span>
              </div>
              <span className="text-xl font-bold text-gradient">OneClickPDF</span>
            </div>
            <p className="text-secondary-600 text-sm">
              Professional PDF tools for all your document processing needs. 
              Fast, secure, and completely free to use.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary-800">PDF Tools</h4>
            <ul className="space-y-2 text-sm text-secondary-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Merge PDF</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Split PDF</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Compress PDF</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Convert PDF</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Protect PDF</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary-800">Resources</h4>
            <ul className="space-y-2 text-sm text-secondary-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary-800">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="p-2 bg-gray-100 hover:bg-primary-100 rounded-lg transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} className="text-gray-600 group-hover:text-primary-600" />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 bg-gray-100 hover:bg-primary-100 rounded-lg transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} className="text-gray-600 group-hover:text-primary-600" />
              </a>
              <a
                href="mailto:hello@oneclickpdf.com"
                className="p-2 bg-gray-100 hover:bg-primary-100 rounded-lg transition-colors group"
              >
                <Mail size={20} className="text-gray-600 group-hover:text-primary-600" />
              </a>
            </div>
            <p className="text-sm text-secondary-600">
              Questions? We're here to help!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-secondary-600">
            © 2024 OneClickPDF. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-secondary-600">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>for better PDF processing</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 