'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import ToolGrid, { tools } from '@/components/ToolGrid'
import FileUpload from '@/components/FileUpload'
import ProcessingModal from '@/components/ProcessingModal'
import Footer from '@/components/Footer'
import RecentTools from '@/components/RecentTools'
import { useRecentTools } from '@/hooks/useRecentTools'
import { Sparkles, Zap, Shield, Globe, Search, X } from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()
  const { addRecentTool } = useRecentTools()
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('home')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    setFiles([])
    // Add to recent tools when selected
    const toolName = t(`tools.${toolId}.title`, toolId)
    addRecentTool(toolId, toolName)
  }

  const handleFilesUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles)
  }

  const handleProcessStart = () => {
    setIsProcessing(true)
  }

  const handleProcessComplete = () => {
    setIsProcessing(false)
    setFiles([])
    setSelectedTool(null)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowSuggestions(!!query.trim())
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    // Clear search when changing category
    setSearchQuery('')
    setShowSuggestions(false)
    // Smooth scroll to tools grid with offset for fixed header
    const el = document.getElementById('tools')
    if (el) {
      const headerOffset = 96 // ~fixed header height
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <main className="flex-1">
        {!selectedTool ? (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden py-20">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
              <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
              
              <div className="relative container mx-auto px-4 text-center">
                <div className="space-y-8 max-w-4xl mx-auto">
                  <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg">
                    <Sparkles className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-secondary-700">25+ Professional PDF Tools</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold text-gradient-animated leading-tight">
                    {t('hero.title', 'OneClickPDF')}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
                    {t('hero.subtitle', 'Professional PDF tools at your fingertips. Convert, merge, split, compress and edit PDF files online with advanced AI features.')}
                  </p>

                  {/* Enhanced Search Bar */}
                  <div className="max-w-2xl mx-auto pt-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                      <div className="relative bg-white rounded-2xl shadow-2xl border border-white/20 p-2">
                        <div className="flex items-center">
                          <Search className="absolute left-6 text-gray-400 w-6 h-6" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={t('search.placeholder', 'Search PDF tools...')}
                            className="w-full pl-14 pr-12 py-4 text-lg border-0 rounded-2xl focus:ring-0 focus:outline-none bg-transparent placeholder-gray-400"
                          />
                          {searchQuery && (
                            <button
                              onClick={handleClearSearch}
                              className="absolute right-6 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                      <div className="relative max-w-2xl mx-auto">
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                          <ul className="max-h-72 overflow-auto divide-y divide-gray-100">
                            {tools
                              .filter(tl => {
                                const q = searchQuery.toLowerCase()
                                const title = t(`tools.${tl.id}.title`, tl.id).toLowerCase()
                                const desc = t(`tools.${tl.id}.description`, '').toLowerCase()
                                return title.includes(q) || desc.includes(q) || tl.id.toLowerCase().includes(q)
                              })
                              .slice(0, 8)
                              .map((tl) => (
                                <li
                                  key={tl.id}
                                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                                  onClick={() => {
                                    setShowSuggestions(false)
                                    setSearchQuery('')
                                    setActiveCategory('all')
                                    // Scroll to grid with header offset and select
                                    const el = document.getElementById('tools')
                                    if (el) {
                                      const headerOffset = 96
                                      const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
                                      window.scrollTo({ top, behavior: 'smooth' })
                                    }
                                    handleToolSelect(tl.id)
                                  }}
                                >
                                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-purple-600"></span>
                                  <span className="text-secondary-800 font-medium">{t(`tools.${tl.id}.title`, tl.id)}</span>
                                </li>
                              ))}
                            {tools.filter(tl => {
                              const q = searchQuery.toLowerCase()
                              const title = t(`tools.${tl.id}.title`, tl.id).toLowerCase()
                              const desc = t(`tools.${tl.id}.description`, '').toLowerCase()
                              return title.includes(q) || desc.includes(q) || tl.id.toLowerCase().includes(q)
                            }).length === 0 && (
                              <li className="px-4 py-3 text-gray-500">{t('search.noResults', 'No tools found')}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Section */}
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
                  Choose Your PDF Tool
                </h2>
                <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                  Professional-grade PDF processing tools for every need. Fast, secure, and completely free to use.
                </p>
              </div>
              
              {/* Recent Tools - only show when not searching */}
              {!searchQuery && (
                <div className="mb-8">
                  <RecentTools onToolSelect={handleToolSelect} />
                </div>
              )}
              
              <ToolGrid 
                onToolSelect={handleToolSelect} 
                searchQuery={searchQuery}
                activeCategory={activeCategory}
              />
            </div>
            
            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-6 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-secondary-800">{t('features.fast.title', 'Lightning Fast')}</h3>
                    <p className="text-secondary-600 leading-relaxed">{t('features.fast.description', 'Process your PDF files in seconds with our optimized algorithms.')}</p>
                  </div>
                </div>
                
                <div className="text-center space-y-6 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-secondary-800">{t('features.secure.title', 'Secure & Private')}</h3>
                    <p className="text-secondary-600 leading-relaxed">{t('features.secure.description', 'Your files are processed securely and deleted after 24 hours.')}</p>
                  </div>
                </div>
                
                <div className="text-center space-y-6 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-secondary-800">{t('features.free.title', 'Free to Use')}</h3>
                    <p className="text-secondary-600 leading-relaxed">{t('features.free.description', 'All essential PDF tools are completely free with no hidden costs.')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold">25+</div>
                    <div className="text-primary-100">PDF Tools</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold">100%</div>
                    <div className="text-primary-100">Free</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold">10+</div>
                    <div className="text-primary-100">Languages</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold">100MB</div>
                    <div className="text-primary-100">Max File Size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <FileUpload
              tool={selectedTool}
              files={files}
              onFilesUpload={handleFilesUpload}
              onProcessStart={handleProcessStart}
              onBack={() => setSelectedTool(null)}
            />
          </div>
        )}
      </main>

      <Footer />

      {isProcessing && (
        <ProcessingModal
          tool={selectedTool!}
          files={files}
          onComplete={handleProcessComplete}
        />
      )}
    </div>
  )
} 