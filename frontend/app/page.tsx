'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import ToolGrid from '@/components/ToolGrid'
import FileUpload from '@/components/FileUpload'
import ProcessingModal from '@/components/ProcessingModal'
import Footer from '@/components/Footer'
import { Sparkles, Zap, Shield, Globe } from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    setFiles([])
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

  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
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

                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-secondary-700">Lightning Fast</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-secondary-700">100% Secure</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-secondary-700">10+ Languages</span>
                    </div>
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
              
              <ToolGrid onToolSelect={handleToolSelect} />
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