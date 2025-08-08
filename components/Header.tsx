'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export default function Header({ activeCategory = 'home', onCategoryChange }: HeaderProps) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1C</span>
            </div>
            <span className="text-xl font-bold text-gradient">OneClickPDF</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onCategoryChange?.('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'home' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>🏠</span>
              <span>{t('nav.home', 'Home')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>⚡</span>
              <span>{t('nav.allTools', 'All Tools')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('essential')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'essential' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>📋</span>
              <span>{t('nav.essential', 'Essential')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('convert')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'convert' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>🔄</span>
              <span>{t('nav.convert', 'Convert')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('edit')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'edit' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>✏️</span>
              <span>{t('nav.edit', 'Edit')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('security')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'security' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>🔒</span>
              <span>{t('nav.security', 'Security')}</span>
            </button>
            <button 
              onClick={() => onCategoryChange?.('ai')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'ai' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <span>🤖</span>
              <span>{t('nav.aiTools', 'AI Tools')}</span>
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center">
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
            <button 
              onClick={() => {
                onCategoryChange?.('home')
                setIsMenuOpen(false)
              }}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'home' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>🏠</span>
              <span>{t('nav.home', 'Home')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('all')
                setIsMenuOpen(false)
              }}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>⚡</span>
              <span>{t('nav.allTools', 'All Tools')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('essential')
                setIsMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'essential' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>📋</span>
              <span>{t('nav.essential', 'Essential')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('convert')
                setIsMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'convert' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>🔄</span>
              <span>{t('nav.convert', 'Convert')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('edit')
                setIsMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'edit' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>✏️</span>
              <span>{t('nav.edit', 'Edit')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('security')
                setIsMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'security' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>🔒</span>
              <span>{t('nav.security', 'Security')}</span>
            </button>
            <button 
              onClick={() => {
                onCategoryChange?.('ai')
                setIsMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeCategory === 'ai' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span>🤖</span>
              <span>{t('nav.aiTools', 'AI Tools')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
} 