'use client'

import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, ArrowLeft, Play } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileUploadProps {
  tool: string
  files: File[]
  onFilesUpload: (files: File[]) => void
  onProcessStart: () => void
  onBack: () => void
}

export default function FileUpload({ tool, files, onFilesUpload, onProcessStart, onBack }: FileUploadProps) {
  const { t } = useTranslation()
  const [dragOver, setDragOver] = useState(false)

  const getAcceptedFileTypes = () => {
    switch (tool) {
      case 'merge':
      case 'split':
      case 'compress':
      case 'rotate':
      case 'watermark':
      case 'password':
      case 'pdf-to-jpg':
        return { 'application/pdf': ['.pdf'] }
      case 'jpg-to-pdf':
        return { 'image/*': ['.jpg', '.jpeg', '.png'] }
      case 'convert':
        return {
          'application/pdf': ['.pdf'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
        }
      default:
        return { 'application/pdf': ['.pdf'] }
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFilesUpload([...files, ...acceptedFiles])
      toast.success(`${acceptedFiles.length} file(s) added successfully`)
    }
  }, [files, onFilesUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxSize: 100 * 1024 * 1024, // 100MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast.error('File is too large. Maximum size is 100MB.')
          } else if (error.code === 'file-invalid-type') {
            toast.error('Invalid file type. Please check supported formats.')
          }
        })
      })
    }
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesUpload(newFiles)
    toast.success('File removed')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const canProcess = files.length > 0 && (tool === 'merge' ? files.length > 1 : true)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Tools</span>
      </button>

      {/* Tool Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-secondary-800">
          {t(`tools.${tool}.title`)}
        </h2>
        <p className="text-secondary-600">
          {t(`tools.${tool}.description`)}
        </p>
      </div>

      {/* Upload Area */}
      <div className="card p-8">
        <div
          {...getRootProps()}
          className={`upload-zone ${isDragActive || dragOver ? 'dragover' : ''} cursor-pointer`}
          onDragEnter={() => setDragOver(true)}
          onDragLeave={() => setDragOver(false)}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                {t('upload.title', 'Upload your files')}
              </h3>
              <p className="text-secondary-600">
                {t('upload.subtitle', 'Drag and drop files here or click to browse')}
              </p>
            </div>
            <div className="text-sm text-secondary-500 space-y-1 text-center">
              <p>{t('upload.maxSize', 'Maximum file size: 100MB')}</p>
              <p>
                {t('upload.supported', 'Supported formats')}: {' '}
                {Object.values(getAcceptedFileTypes()).flat().join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-800 mb-4">
            Uploaded Files ({files.length})
          </h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-secondary-800">{file.name}</p>
                    <p className="text-sm text-secondary-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process Button */}
      {files.length > 0 && (
        <div className="text-center">
          <button
            onClick={onProcessStart}
            disabled={!canProcess}
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-colors ${
              canProcess
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Play size={20} />
            <span>Process Files</span>
          </button>
          {tool === 'merge' && files.length === 1 && (
            <p className="text-sm text-orange-600 mt-2">
              Please upload at least 2 PDF files to merge
            </p>
          )}
        </div>
      )}
    </div>
  )
} 