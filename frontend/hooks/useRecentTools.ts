'use client'

import { useState, useEffect } from 'react'

interface RecentTool {
  id: string
  name: string
  lastUsed: number
  count: number
}

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([])

  useEffect(() => {
    // Load recent tools from localStorage on mount
    const stored = localStorage.getItem('oneclickpdf-recent-tools')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRecentTools(parsed)
      } catch (error) {
        console.error('Error parsing recent tools:', error)
      }
    }
  }, [])

  const addRecentTool = (toolId: string, toolName: string) => {
    setRecentTools(prev => {
      const existing = prev.find(tool => tool.id === toolId)
      let updated: RecentTool[]

      if (existing) {
        // Update existing tool
        updated = prev.map(tool =>
          tool.id === toolId
            ? { ...tool, lastUsed: Date.now(), count: tool.count + 1 }
            : tool
        )
      } else {
        // Add new tool
        const newTool: RecentTool = {
          id: toolId,
          name: toolName,
          lastUsed: Date.now(),
          count: 1
        }
        updated = [newTool, ...prev]
      }

      // Sort by last used and keep only top 6
      updated = updated
        .sort((a, b) => b.lastUsed - a.lastUsed)
        .slice(0, 6)

      // Save to localStorage
      localStorage.setItem('oneclickpdf-recent-tools', JSON.stringify(updated))
      
      return updated
    })
  }

  const clearRecentTools = () => {
    setRecentTools([])
    localStorage.removeItem('oneclickpdf-recent-tools')
  }

  return {
    recentTools,
    addRecentTool,
    clearRecentTools
  }
}
