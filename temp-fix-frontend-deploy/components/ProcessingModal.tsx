'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Download, CheckCircle, Loader2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ProcessingModalProps {
  tool: string
  files: File[]
  onComplete: () => void
}

export default function ProcessingModal({ tool, files, onComplete }: ProcessingModalProps) {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'uploading' | 'processing' | 'completed' | 'error'>('uploading')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [resultFileName, setResultFileName] = useState<string>('')

  useEffect(() => {
    processFiles()
  }, [])

  const processFiles = async () => {
    try {
      const formData = new FormData()
      
      files.forEach((file, index) => {
        formData.append('files', file)
      })
      
      formData.append('tool', tool)

      setStatus('processing')
      setProgress(20)

      const response = await axios.post('/api/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(Math.min(uploadProgress, 90))
          }
        },
        responseType: 'blob'
      })

      setProgress(100)
      setStatus('completed')

      // Create download URL
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/pdf' 
      })
      const url = window.URL.createObjectURL(blob)
      setDownloadUrl(url)

      // Get filename from response headers
      const contentDisposition = response.headers['content-disposition']
      let filename = `processed_${tool}_${Date.now()}.pdf`
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }
      
      setResultFileName(filename)
      toast.success('Processing completed successfully!')

    } catch (error) {
      console.error('Processing error:', error)
      setStatus('error')
      toast.error('Processing failed. Please try again.')
    }
  }

  const handleDownload = () => {
    if (downloadUrl && resultFileName) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = resultFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started!')
    }
  }

  const handleClose = () => {
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl)
    }
    onComplete()
  }

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return t('upload.uploading', 'Uploading files...')
      case 'processing':
        return t('upload.processing', 'Processing...')
      case 'completed':
        return t('upload.complete', 'Processing complete!')
      case 'error':
        return 'Error occurred during processing'
      default:
        return 'Processing...'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-600" />
      case 'error':
        return <X className="w-8 h-8 text-red-600" />
      default:
        return <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-secondary-800">
            {t(`tools.${tool}.title`)}
          </h3>
          {status === 'completed' || status === 'error' ? (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          ) : null}
        </div>

        {/* Status */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-medium text-secondary-800">
              {getStatusText()}
            </p>
            
            {status !== 'error' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            
            <p className="text-sm text-secondary-600">
              {status === 'uploading' && 'Uploading your files...'}
              {status === 'processing' && 'Processing your files...'}
              {status === 'completed' && 'Your file is ready for download!'}
              {status === 'error' && 'Something went wrong. Please try again.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        {status === 'completed' && downloadUrl && (
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>{t('upload.download', 'Download Result')}</span>
            </button>
            <button
              onClick={handleClose}
              className="w-full btn-secondary"
            >
              Process Another File
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={processFiles}
              className="w-full btn-primary"
            >
              Try Again
            </button>
            <button
              onClick={handleClose}
              className="w-full btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 