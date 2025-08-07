const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs-extra')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Import PDF processing modules
const pdfProcessor = require('./services/pdfProcessor')
const convertProcessor = require('./services/convertProcessor')
const imageProcessor = require('./services/imageProcessor')
const aiProcessor = require('./services/aiProcessor')

const app = express()
const PORT = 5001

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads')
    fs.ensureDirSync(uploadDir)
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
    files: 10 // max 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Please upload PDF, image, or Office documents.'))
    }
  }
})

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OneClickPDF API is running' })
})

// Main processing endpoint
app.post('/api/process', upload.array('files', 10), async (req, res) => {
  try {
    const { tool } = req.body
    const files = req.files

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    if (!tool) {
      return res.status(400).json({ error: 'No tool specified' })
    }

    console.log(`Processing ${files.length} files with tool: ${tool}`)

    let result
    const outputDir = path.join(__dirname, 'output')
    fs.ensureDirSync(outputDir)

    switch (tool) {
      // Essential PDF Tools
      case 'merge':
        result = await pdfProcessor.mergePDFs(files, outputDir)
        break
      case 'split':
        result = await pdfProcessor.splitPDF(files[0], outputDir)
        break
      case 'compress':
        result = await pdfProcessor.compressPDF(files[0], outputDir)
        break
      case 'organize':
        result = await pdfProcessor.organizePDF(files[0], outputDir)
        break

      // Conversion Tools
      case 'pdf-to-word':
      case 'pdf-to-excel':
      case 'pdf-to-powerpoint':
        result = await convertProcessor.convertPDFToOffice(files[0], outputDir, tool)
        break
      case 'word-to-pdf':
      case 'excel-to-pdf':
      case 'powerpoint-to-pdf':
        result = await convertProcessor.convertOfficeToPDF(files[0], outputDir)
        break
      case 'pdf-to-jpg':
        result = await imageProcessor.pdfToImages(files[0], outputDir)
        break
      case 'jpg-to-pdf':
        result = await imageProcessor.imagesToPDF(files, outputDir)
        break
      case 'html-to-pdf':
        result = await convertProcessor.convertHTMLToPDF(files[0], outputDir)
        break

      // Edit Tools
      case 'edit-pdf':
        result = await pdfProcessor.editPDF(files[0], outputDir)
        break
      case 'rotate':
        result = await pdfProcessor.rotatePDF(files[0], outputDir)
        break
      case 'crop':
        result = await pdfProcessor.cropPDF(files[0], outputDir)
        break
      case 'page-numbers':
        result = await pdfProcessor.addPageNumbers(files[0], outputDir)
        break

      // Security Tools
      case 'watermark':
        result = await pdfProcessor.addWatermark(files[0], outputDir)
        break
      case 'protect-pdf':
        result = await pdfProcessor.protectPDF(files[0], outputDir)
        break
      case 'unlock-pdf':
        result = await pdfProcessor.unlockPDF(files[0], outputDir)
        break
      case 'sign-pdf':
        result = await pdfProcessor.signPDF(files[0], outputDir)
        break
      case 'redact-pdf':
        result = await pdfProcessor.redactPDF(files[0], outputDir)
        break

      // AI & Advanced Tools
      case 'ocr':
        result = await aiProcessor.performOCR(files[0].path)
        break
      case 'scan-to-pdf':
        result = await imageProcessor.scanToPDF(files, outputDir)
        break
      case 'repair-pdf':
        result = await pdfProcessor.repairPDF(files[0], outputDir)
        break
      case 'pdf-to-pdfa':
        result = await pdfProcessor.convertToPDFA(files[0], outputDir)
        break

      // Legacy support
      case 'convert':
        result = await convertProcessor.convertFile(files[0], outputDir)
        break
      case 'password':
        result = await pdfProcessor.protectPDF(files[0], outputDir)
        break

      default:
        return res.status(400).json({ error: 'Invalid tool specified' })
    }

    // Send the result file
    if (result.success) {
      const filename = path.basename(result.outputPath)
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      
      if (result.type === 'zip') {
        res.setHeader('Content-Type', 'application/zip')
      } else {
        res.setHeader('Content-Type', 'application/pdf')
      }

      const fileStream = fs.createReadStream(result.outputPath)
      fileStream.pipe(res)

      // Cleanup files after sending (with delay)
      setTimeout(() => {
        cleanupFiles([...files.map(f => f.path), result.outputPath])
      }, 5000)
    } else {
      // Cleanup uploaded files on error
      cleanupFiles(files.map(f => f.path))
      res.status(500).json({ error: result.error || 'Processing failed' })
    }

  } catch (error) {
    console.error('Processing error:', error)
    
    // Cleanup uploaded files on error
    if (req.files) {
      cleanupFiles(req.files.map(f => f.path))
    }
    
    res.status(500).json({ 
      error: 'Internal server error', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    })
  }
})

// AI Processing endpoints
app.post('/api/ai/ocr', upload.single('file'), async (req, res) => {
  try {
    const result = await aiProcessor.performOCR(req.file.path)
    
    // Cleanup
    setTimeout(() => {
      cleanupFiles([req.file.path])
    }, 1000)

    res.json(result)
  } catch (error) {
    console.error('OCR error:', error)
    if (req.file) {
      cleanupFiles([req.file.path])
    }
    res.status(500).json({ error: 'OCR processing failed' })
  }
})

app.post('/api/ai/summarize', upload.single('file'), async (req, res) => {
  try {
    const result = await aiProcessor.summarizePDF(req.file.path)
    
    // Cleanup
    setTimeout(() => {
      cleanupFiles([req.file.path])
    }, 1000)

    res.json(result)
  } catch (error) {
    console.error('Summarization error:', error)
    if (req.file) {
      cleanupFiles([req.file.path])
    }
    res.status(500).json({ error: 'PDF summarization failed' })
  }
})

app.post('/api/ai/translate', upload.single('file'), async (req, res) => {
  try {
    const { targetLanguage } = req.body
    const result = await aiProcessor.translatePDF(req.file.path, targetLanguage)
    
    // Cleanup
    setTimeout(() => {
      cleanupFiles([req.file.path])
    }, 1000)

    res.json(result)
  } catch (error) {
    console.error('Translation error:', error)
    if (req.file) {
      cleanupFiles([req.file.path])
    }
    res.status(500).json({ error: 'PDF translation failed' })
  }
})

// Utility function to cleanup files
function cleanupFiles(filePaths) {
  filePaths.forEach(filePath => {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
        console.log(`Cleaned up file: ${filePath}`)
      } catch (error) {
        console.error(`Error cleaning up file ${filePath}:`, error)
      }
    }
  })
}

// Cleanup old files periodically (every hour)
setInterval(() => {
  const uploadDir = path.join(__dirname, 'uploads')
  const outputDir = path.join(__dirname, 'output')
  
  ;[uploadDir, outputDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      const now = Date.now()
      
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)
        const age = now - stats.mtime.getTime()
        
        // Delete files older than 1 hour
        if (age > 60 * 60 * 1000) {
          fs.unlinkSync(filePath)
          console.log(`Cleaned up old file: ${filePath}`)
        }
      })
    }
  })
}, 60 * 60 * 1000) // Run every hour

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' })
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 10 files.' })
    }
  }
  
  console.error('Error:', error)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OneClickPDF API server running on port ${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`)
}) 