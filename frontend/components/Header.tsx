'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Globe, X } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1C</span>
            </div>
            <span className="text-xl font-bold text-gradient">OneClickPDF</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-secondary-600 hover:text-primary-600 transition-colors">
              {t('nav.home', 'Home')}
            </a>
            <a href="#tools" className="text-secondary-600 hover:text-primary-600 transition-colors">
              {t('nav.tools', 'Tools')}
            </a>
            <a href="#about" className="text-secondary-600 hover:text-primary-600 transition-colors">
              {t('nav.about', 'About')}
            </a>
            <a href="#contact" className="text-secondary-600 hover:text-primary-600 transition-colors">
              {t('nav.contact', 'Contact')}
            </a>
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            <a
              href="#"
              className="block px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {t('nav.home', 'Home')}
            </a>
            <a
              href="#tools"
              className="block px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {t('nav.tools', 'Tools')}
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {t('nav.about', 'About')}
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {t('nav.contact', 'Contact')}
            </a>
          </div>
        )}
      </div>
    </header>
  )
} 