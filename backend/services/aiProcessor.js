const Tesseract = require('tesseract.js')
const fs = require('fs-extra')
const path = require('path')
const { Configuration, OpenAIApi } = require('openai')

class AIProcessor {
  constructor() {
    // Initialize OpenAI (optional - for AI features)
    if (process.env.OPENAI_API_KEY) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
      this.openai = new OpenAIApi(configuration)
    }
  }

  // Perform OCR on PDF or image file
  async performOCR(filePath, language = 'eng') {
    try {
      console.log('Starting OCR processing...')
      
      // Check if file is PDF or image
      const fileExtension = path.extname(filePath).toLowerCase()
      let imagePath = filePath
      
      if (fileExtension === '.pdf') {
        // Convert PDF to image first
        const imageProcessor = require('./imageProcessor')
        const tempDir = path.dirname(filePath)
        const result = await imageProcessor.pdfToImages({ path: filePath }, tempDir, 'png')
        
        if (!result.success) {
          throw new Error('Failed to convert PDF to image for OCR')
        }
        
        imagePath = result.outputPath
      }

      // Perform OCR using Tesseract
      const { data: { text, confidence } } = await Tesseract.recognize(
        imagePath,
        language,
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              console.log(`OCR Progress: ${(m.progress * 100).toFixed(2)}%`)
            }
          }
        }
      )

      // Cleanup temporary image if it was created from PDF
      if (fileExtension === '.pdf' && imagePath !== filePath) {
        fs.unlinkSync(imagePath)
      }

      return {
        success: true,
        text: text.trim(),
        confidence: confidence,
        language: language,
        wordCount: text.trim().split(/\s+/).length
      }
    } catch (error) {
      console.error('OCR error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Summarize PDF content using AI
  async summarizePDF(filePath) {
    try {
      if (!this.openai) {
        throw new Error('OpenAI API key not configured')
      }

      // Extract text from PDF first
      const pdfParse = require('pdf-parse')
      const dataBuffer = fs.readFileSync(filePath)
      const data = await pdfParse(dataBuffer)
      
      const text = data.text
      
      if (text.length < 100) {
        throw new Error('PDF content too short to summarize')
      }

      // Split text into chunks if too long (OpenAI has token limits)
      const maxChunkLength = 8000 // Conservative limit
      const chunks = this.splitTextIntoChunks(text, maxChunkLength)
      
      let summaries = []
      
      for (const chunk of chunks) {
        const response = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes documents. Provide a concise, informative summary of the key points."
            },
            {
              role: "user",
              content: `Please summarize the following text:\n\n${chunk}`
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
        
        summaries.push(response.data.choices[0].message.content.trim())
      }

      // If multiple chunks, create a final summary
      let finalSummary
      if (summaries.length > 1) {
        const combinedSummaries = summaries.join('\n\n')
        const finalResponse = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Combine these summaries into one coherent summary."
            },
            {
              role: "user",
              content: `Combine these summaries:\n\n${combinedSummaries}`
            }
          ],
          max_tokens: 300,
          temperature: 0.3
        })
        
        finalSummary = finalResponse.data.choices[0].message.content.trim()
      } else {
        finalSummary = summaries[0]
      }

      return {
        success: true,
        summary: finalSummary,
        originalLength: text.length,
        pages: data.numpages,
        wordCount: text.split(/\s+/).length
      }
    } catch (error) {
      console.error('Summarization error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Translate PDF content
  async translatePDF(filePath, targetLanguage = 'Spanish') {
    try {
      if (!this.openai) {
        throw new Error('OpenAI API key not configured')
      }

      // Extract text from PDF first
      const pdfParse = require('pdf-parse')
      const dataBuffer = fs.readFileSync(filePath)
      const data = await pdfParse(dataBuffer)
      
      const text = data.text
      
      if (text.length < 10) {
        throw new Error('PDF content too short to translate')
      }

      // Split text into chunks for translation
      const maxChunkLength = 6000
      const chunks = this.splitTextIntoChunks(text, maxChunkLength)
      
      let translations = []
      
      for (const chunk of chunks) {
        const response = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the original formatting and structure as much as possible.`
            },
            {
              role: "user",
              content: chunk
            }
          ],
          max_tokens: 2000,
          temperature: 0.2
        })
        
        translations.push(response.data.choices[0].message.content.trim())
      }

      const translatedText = translations.join('\n\n')

      return {
        success: true,
        translatedText: translatedText,
        targetLanguage: targetLanguage,
        originalLength: text.length,
        translatedLength: translatedText.length,
        pages: data.numpages
      }
    } catch (error) {
      console.error('Translation error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Extract text from PDF using advanced methods
  async extractTextAdvanced(filePath) {
    try {
      // Try multiple methods for text extraction
      const methods = []

      // Method 1: pdf-parse
      try {
        const pdfParse = require('pdf-parse')
        const dataBuffer = fs.readFileSync(filePath)
        const data = await pdfParse(dataBuffer)
        methods.push({
          method: 'pdf-parse',
          text: data.text,
          pages: data.numpages,
          confidence: data.text.length > 100 ? 0.9 : 0.5
        })
      } catch (e) {
        console.log('pdf-parse failed:', e.message)
      }

      // Method 2: OCR fallback
      try {
        const ocrResult = await this.performOCR(filePath)
        if (ocrResult.success) {
          methods.push({
            method: 'ocr',
            text: ocrResult.text,
            pages: 1, // OCR typically processes first page
            confidence: ocrResult.confidence / 100
          })
        }
      } catch (e) {
        console.log('OCR fallback failed:', e.message)
      }

      // Choose best method based on confidence and text length
      if (methods.length === 0) {
        throw new Error('All text extraction methods failed')
      }

      const bestMethod = methods.reduce((best, current) => {
        const bestScore = best.confidence * best.text.length
        const currentScore = current.confidence * current.text.length
        return currentScore > bestScore ? current : best
      })

      return {
        success: true,
        text: bestMethod.text,
        method: bestMethod.method,
        confidence: bestMethod.confidence,
        pages: bestMethod.pages
      }
    } catch (error) {
      console.error('Advanced text extraction error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Helper function to split text into chunks
  splitTextIntoChunks(text, maxLength) {
    const chunks = []
    const sentences = text.split(/[.!?]+/)
    let currentChunk = ''
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim())
          currentChunk = sentence
        } else {
          // Single sentence too long, split by words
          const words = sentence.split(' ')
          let wordChunk = ''
          for (const word of words) {
            if ((wordChunk + ' ' + word).length > maxLength) {
              if (wordChunk) {
                chunks.push(wordChunk.trim())
                wordChunk = word
              } else {
                chunks.push(word)
              }
            } else {
              wordChunk += (wordChunk ? ' ' : '') + word
            }
          }
          if (wordChunk) {
            currentChunk = wordChunk
          }
        }
      } else {
        currentChunk += (currentChunk ? '. ' : '') + sentence
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk.trim())
    }
    
    return chunks
  }

  // Get available OCR languages
  getAvailableOCRLanguages() {
    return [
      { code: 'eng', name: 'English' },
      { code: 'spa', name: 'Spanish' },
      { code: 'fra', name: 'French' },
      { code: 'deu', name: 'German' },
      { code: 'ita', name: 'Italian' },
      { code: 'por', name: 'Portuguese' },
      { code: 'rus', name: 'Russian' },
      { code: 'chi_sim', name: 'Chinese (Simplified)' },
      { code: 'chi_tra', name: 'Chinese (Traditional)' },
      { code: 'jpn', name: 'Japanese' },
      { code: 'kor', name: 'Korean' },
      { code: 'ara', name: 'Arabic' }
    ]
  }
}

module.exports = new AIProcessor() 