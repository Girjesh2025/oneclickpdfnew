'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FileText, 
  Scissors, 
  Archive, 
  RefreshCw, 
  Image, 
  FileImage, 
  RotateCcw, 
  ShieldCheck, 
  Type,
  Combine,
  Edit3,
  Unlock,
  FolderOpen,
  Crop,
  PenTool,
  EyeOff,
  Globe,
  Settings,
  FileCheck,
  Hash,
  Scan,
  Search,
  Download,
  Upload,
  Zap
  } from 'lucide-react'

export interface Tool {
  id: string
  icon: React.ReactNode
  gradient: string
  supported?: string[]
  category: 'essential' | 'convert' | 'edit' | 'security' | 'ai'
  isNew?: boolean
  isPro?: boolean
}

export const tools: Tool[] = [
  // Essential PDF Tools
  {
    id: 'merge',
    icon: <Combine size={24} />,
    gradient: 'from-blue-500 to-blue-600',
    supported: ['PDF'],
    category: 'essential'
  },
  {
    id: 'split',
    icon: <Scissors size={24} />,
    gradient: 'from-green-500 to-green-600',
    supported: ['PDF'],
    category: 'essential'
  },
  {
    id: 'compress',
    icon: <Archive size={24} />,
    gradient: 'from-purple-500 to-purple-600',
    supported: ['PDF'],
    category: 'essential'
  },
  {
    id: 'organize',
    icon: <FolderOpen size={24} />,
    gradient: 'from-amber-500 to-amber-600',
    supported: ['PDF'],
    category: 'edit',
    isNew: true
  },
  
  // Conversion Tools
  {
    id: 'word-to-pdf',
    icon: <Upload size={24} />,
    gradient: 'from-indigo-600 to-blue-600',
    supported: ['DOCX'],
    category: 'convert'
  },
  {
    id: 'excel-to-pdf',
    icon: <Upload size={24} />,
    gradient: 'from-emerald-600 to-green-600',
    supported: ['XLSX'],
    category: 'convert'
  },
  {
    id: 'powerpoint-to-pdf',
    icon: <Upload size={24} />,
    gradient: 'from-red-500 to-orange-500',
    supported: ['PPTX'],
    category: 'convert'
  },
  {
    id: 'pdf-to-jpg',
    icon: <Image size={24} />,
    gradient: 'from-pink-500 to-pink-600',
    supported: ['PDF'],
    category: 'convert'
  },
  {
    id: 'jpg-to-pdf',
    icon: <FileImage size={24} />,
    gradient: 'from-indigo-500 to-indigo-600',
    supported: ['JPG', 'PNG', 'JPEG'],
    category: 'convert'
  },
  {
    id: 'html-to-pdf',
    icon: <Globe size={24} />,
    gradient: 'from-teal-500 to-cyan-500',
    supported: ['HTML', 'URL'],
    category: 'convert',
    isNew: true
  },
  
  // Edit Tools
  {
    id: 'edit-pdf',
    icon: <Edit3 size={24} />,
    gradient: 'from-violet-500 to-purple-600',
    supported: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'JPG', 'PNG', 'TXT', 'HTML'],
    category: 'edit',
    isNew: true
  },
  {
    id: 'rotate',
    icon: <RotateCcw size={24} />,
    gradient: 'from-teal-500 to-teal-600',
    supported: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'JPG', 'PNG', 'TXT', 'HTML'],
    category: 'edit'
  },
  {
    id: 'crop',
    icon: <Crop size={24} />,
    gradient: 'from-lime-500 to-green-500',
    supported: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'JPG', 'PNG', 'TXT', 'HTML'],
    category: 'edit',
    isNew: true
  },
  {
    id: 'page-numbers',
    icon: <Hash size={24} />,
    gradient: 'from-slate-500 to-gray-600',
    supported: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'JPG', 'PNG', 'TXT', 'HTML'],
    category: 'edit'
  },
  
  // Security Tools
  {
    id: 'watermark',
    icon: <Type size={24} />,
    gradient: 'from-red-500 to-red-600',
    supported: ['PDF'],
    category: 'security'
  },
  {
    id: 'protect-pdf',
    icon: <ShieldCheck size={24} />,
    gradient: 'from-yellow-500 to-yellow-600',
    supported: ['PDF'],
    category: 'security'
  },
  {
    id: 'unlock-pdf',
    icon: <Unlock size={24} />,
    gradient: 'from-green-500 to-lime-500',
    supported: ['PDF'],
    category: 'security',
    isNew: true
  },
  {
    id: 'sign-pdf',
    icon: <PenTool size={24} />,
    gradient: 'from-purple-600 to-pink-600',
    supported: ['PDF'],
    category: 'security',
    isNew: true
  },
  {
    id: 'redact-pdf',
    icon: <EyeOff size={24} />,
    gradient: 'from-gray-600 to-slate-700',
    supported: ['PDF'],
    category: 'security',
    isNew: true,
    isPro: true
  },
  
  // AI & Advanced Tools
  {
    id: 'ocr',
    icon: <Search size={24} />,
    gradient: 'from-cyan-500 to-blue-500',
    supported: ['PDF', 'JPG', 'PNG'],
    category: 'ai'
  },
  {
    id: 'scan-to-pdf',
    icon: <Scan size={24} />,
    gradient: 'from-indigo-500 to-purple-500',
    supported: ['JPG', 'PNG'],
    category: 'ai',
    isNew: true
  },
  {
    id: 'repair-pdf',
    icon: <Settings size={24} />,
    gradient: 'from-orange-500 to-red-500',
    supported: ['PDF'],
    category: 'ai',
    isNew: true
  },
  {
    id: 'pdf-to-pdfa',
    icon: <FileCheck size={24} />,
    gradient: 'from-emerald-500 to-teal-500',
    supported: ['PDF'],
    category: 'ai',
    isNew: true
  }
]

const categories = [
  { id: 'all', name: 'All Tools', icon: <Zap size={16} /> },
  { id: 'essential', name: 'Essential', icon: <FileText size={16} /> },
  { id: 'convert', name: 'Convert', icon: <RefreshCw size={16} /> },
  { id: 'edit', name: 'Edit', icon: <Edit3 size={16} /> },
  { id: 'security', name: 'Security', icon: <ShieldCheck size={16} /> },
  { id: 'ai', name: 'AI Tools', icon: <Search size={16} /> }
]

interface ToolGridProps {
  onToolSelect: (toolId: string) => void
  searchQuery?: string
  activeCategory?: string
}

export default function ToolGrid({ onToolSelect, searchQuery = '', activeCategory = 'all' }: ToolGridProps) {
  const { t } = useTranslation()
  const [localActiveCategory, setLocalActiveCategory] = React.useState('all')
  
  // Use prop if provided, otherwise use local state
  const currentCategory = activeCategory || localActiveCategory

  // Filter tools based on category and search query
  let filteredTools = currentCategory === 'all' || currentCategory === 'home'
    ? tools 
    : tools.filter(tool => tool.category === currentCategory)
  
  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredTools = filteredTools.filter(tool => {
      const title = t(`tools.${tool.id}.title`, tool.id).toLowerCase()
      const description = t(`tools.${tool.id}.description`, '').toLowerCase()
      return title.includes(query) || description.includes(query) || tool.id.toLowerCase().includes(query)
    })
  }

  return (
    <div id="tools" className="max-w-7xl mx-auto scroll-mt-28 md:scroll-mt-32">
      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchQuery ? t('search.noResults', 'No tools found') : t('search.noTools', 'No tools available')}
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? t('search.tryDifferent', 'Try a different search term')
              : t('search.selectCategory', 'Try selecting a different category')
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className="card hover:shadow-glow transform hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            {/* New/Pro badges */}
            {tool.isNew && (
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                NEW
              </div>
            )}
            {tool.isPro && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                PRO
              </div>
            )}

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-6 z-10">
              <div className={`w-14 h-14 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {tool.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                {t(`tools.${tool.id}.title`, tool.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()))}
              </h3>
              
              <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                {t(`tools.${tool.id}.description`, `Process your ${tool.supported?.[0] || 'files'} files with this tool.`)}
              </p>
              
              {tool.supported && (
                <div className="flex flex-wrap gap-1">
                  {tool.supported.slice(0, 3).map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {format}
                    </span>
                  ))}
                  {tool.supported.length > 3 && (
                    <span className="px-2 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 text-xs rounded-full font-medium">
                      +{tool.supported.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 border-2 border-primary-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          ))}
        </div>
      )}
      {/* Feature count */}
      <div className="text-center mt-8">
        <p className="text-secondary-500 text-sm">
          {filteredTools.length} professional tools available • 
          <span className="text-primary-600 font-medium"> Free to use</span>
        </p>
      </div>
    </div>
  )
} 