'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'

interface ToolSearchProps {
  onSearch: (query: string) => void
  onClear: () => void
}

export default function ToolSearch({ onSearch, onClear }: ToolSearchProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery('')
    onClear()
  }

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder', 'Search PDF tools...')}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-500 text-center">
          {t('search.searching', `Searching for "${query}"...`)}
        </div>
      )}
    </div>
  )
}
