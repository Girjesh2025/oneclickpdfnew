'use client'

import { useTranslation } from 'react-i18next'
import { Clock, X } from 'lucide-react'
import { useRecentTools } from '@/hooks/useRecentTools'

interface RecentToolsProps {
  onToolSelect: (toolId: string) => void
}

export default function RecentTools({ onToolSelect }: RecentToolsProps) {
  const { t } = useTranslation()
  const { recentTools, clearRecentTools } = useRecentTools()

  if (recentTools.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('recent.title', 'Recently Used')}
          </h3>
        </div>
        <button
          onClick={clearRecentTools}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title={t('recent.clear', 'Clear recent tools')}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {recentTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className="group relative p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white hover:bg-blue-50"
          >
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 truncate">
                {t(`tools.${tool.id}.title`, tool.name)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {tool.count > 1 && `${tool.count}x`}
              </div>
            </div>
            
            {/* Usage indicator */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
          </button>
        ))}
      </div>
    </div>
  )
}
