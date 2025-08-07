const mammoth = require('mammoth')
const XLSX = require('xlsx')
const fs = require('fs-extra')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib')

class ConvertProcessor {

  // Convert various file formats
  async convertFile(file, outputDir) {
    try {
      const fileExtension = path.extname(file.originalname).toLowerCase()
      
      switch (fileExtension) {
        case '.pdf':
          return await this.convertPDFToOffice(file, outputDir, 'pdf-to-word')
        case '.docx':
          return await this.convertOfficeToPDF(file, outputDir)
        case '.xlsx':
          return await this.convertOfficeToPDF(file, outputDir)
        case '.pptx':
          return await this.convertOfficeToPDF(file, outputDir)
        default:
          throw new Error(`Unsupported file format: ${fileExtension}`)
      }
    } catch (error) {
      console.error('Conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert PDF to Office formats with specific target
  async convertPDFToOffice(file, outputDir, targetFormat) {
    const temp = require('temp').track(); // Automatically track and cleanup files
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execPromise = promisify(exec);

    try {
      const dataBuffer = fs.readFileSync(file.path);
      let outputFormat, filter, outputExtension;

      switch (targetFormat) {
        case 'pdf-to-word':
          outputFormat = 'docx';
          filter = '"MS Word 2007 XML"'; // Filter for DOCX
          outputExtension = '.docx';
          break;
        case 'pdf-to-excel':
          outputFormat = 'xlsx';
          filter = '"Calc MS Excel 2007 XML"'; // Filter for XLSX
          outputExtension = '.xlsx';
          break;
        case 'pdf-to-powerpoint':
          throw new Error('PDF to PowerPoint conversion is not supported at this time.');
        default:
          throw new Error(`Unsupported target format: ${targetFormat}`);
      }

      const tempInputDir = temp.mkdirSync('oneclickpdf-input');
      const tempInputPath = path.join(tempInputDir, file.originalname);
      fs.writeFileSync(tempInputPath, dataBuffer);

      const tempOutputDir = temp.mkdirSync('oneclickpdf-output');

      const command = `soffice --headless --convert-to ${outputFormat}:${filter} --outdir "${tempOutputDir}" "${tempInputPath}"`;

      await execPromise(command);

      const originalFileName = path.basename(file.originalname, path.extname(file.originalname));
      const convertedFileName = `${originalFileName}${outputExtension}`;
      const convertedFilePath = path.join(tempOutputDir, convertedFileName);

      if (!fs.existsSync(convertedFilePath)) {
        throw new Error(`Conversion failed. Output file not found: ${convertedFilePath}`);
      }

      const outputPath = path.join(outputDir, `converted_${uuidv4()}${outputExtension}`);
      fs.copyFileSync(convertedFilePath, outputPath);

      return {
        success: true,
        outputPath,
        type: outputFormat,
      };
    } catch (error) {
      console.error(`PDF to ${targetFormat} conversion error:`, error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred during conversion.',
      };
    } finally {
      temp.cleanupSync();
    }
  }

  // Convert Office files to PDF (unified method)
  async convertOfficeToPDF(file, outputDir) {
    try {
      const fileExtension = path.extname(file.originalname).toLowerCase()
      
      switch (fileExtension) {
        case '.docx':
          return await this.convertWordToPDF(file, outputDir)
        case '.xlsx':
          return await this.convertExcelToPDF(file, outputDir)
        case '.pptx':
          return await this.convertPowerPointToPDF(file, outputDir)
        default:
          throw new Error(`Unsupported Office format: ${fileExtension}`)
      }
    } catch (error) {
      console.error('Office to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert HTML to PDF
  async convertHTMLToPDF(file, outputDir) {
    try {
      let htmlContent
      
      if (file.mimetype === 'text/html') {
        htmlContent = fs.readFileSync(file.path, 'utf8')
      } else {
        // If it's a URL or text, treat as HTML content
        htmlContent = `<html><body><h1>HTML to PDF Conversion</h1><p>Original content: ${file.originalname}</p></body></html>`
      }

      // Create a simple PDF from HTML content
      const pdfDoc = await PDFDocument.create()
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const page = pdfDoc.addPage()
      const { width, height } = page.getSize()
      
      // Simple HTML parsing (in production, use a proper HTML to PDF library)
      const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      const lines = this.wrapText(textContent, 70) // Wrap text to fit page
      
      lines.forEach((line, index) => {
        const y = height - 100 - (index * 20)
        if (y > 50) {
          page.drawText(line, {
            x: 50,
            y: y,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          })
        }
      })
      
      const pdfBytes = await pdfDoc.save()
      const outputPath = path.join(outputDir, `html_to_pdf_${uuidv4()}.pdf`)
      
      fs.writeFileSync(outputPath, pdfBytes)

      return {
        success: true,
        outputPath,
        type: 'pdf'
      }
    } catch (error) {
      console.error('HTML to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Helper function to wrap text
  wrapText(text, maxLength) {
    const words = text.split(' ')
    const lines = []
    let currentLine = ''
    
    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        if (currentLine) lines.push(currentLine)
        currentLine = word
      }
    })
    
    if (currentLine) lines.push(currentLine)
    return lines
  }

  // Legacy method - convert PDF to text
  async convertPDFToText(file, outputDir) {
    try {
      // For a production app, you'd want to use a more sophisticated PDF to Office converter
      // This is a simplified implementation
      
      const pdfParse = require('pdf-parse')
      const dataBuffer = fs.readFileSync(file.path)
      const data = await pdfParse(dataBuffer)
      
      const text = data.text
      const outputPath = path.join(outputDir, `converted_${uuidv4()}.txt`)
      
      fs.writeFileSync(outputPath, text, 'utf8')

      return {
        success: true,
        outputPath,
        type: 'text',
        pages: data.numpages
      }
    } catch (error) {
      console.error('PDF to Office conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert Word document to PDF
  async convertWordToPDF(file, outputDir) {
    try {
      // Extract text and images from Word document
      const result = await mammoth.extractRawText({ path: file.path })
      const text = result.value
      
      // Create a new PDF with the extracted text
      const pdfDoc = await PDFDocument.create()
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      // Split text into lines and pages
      const lines = text.split('\n')
      const linesPerPage = 50
      const pageWidth = 595 // A4 width in points
      const pageHeight = 842 // A4 height in points
      const margin = 50
      const lineHeight = 14
      
      for (let i = 0; i < lines.length; i += linesPerPage) {
        const page = pdfDoc.addPage([pageWidth, pageHeight])
        const pageLines = lines.slice(i, i + linesPerPage)
        
        pageLines.forEach((line, index) => {
          const y = pageHeight - margin - (index * lineHeight)
          if (y > margin) {
            // Truncate line if too long
            const maxWidth = pageWidth - (2 * margin)
            let displayText = line
            
            const textWidth = helveticaFont.widthOfTextAtSize(line, 12)
            if (textWidth > maxWidth) {
              // Simple truncation - in production you'd want proper word wrapping
              const ratio = maxWidth / textWidth
              const maxChars = Math.floor(line.length * ratio * 0.9)
              displayText = line.substring(0, maxChars) + '...'
            }
            
            page.drawText(displayText, {
              x: margin,
              y: y,
              size: 12,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            })
          }
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      const outputPath = path.join(outputDir, `converted_${uuidv4()}.pdf`)
      
      fs.writeFileSync(outputPath, pdfBytes)

      return {
        success: true,
        outputPath,
        type: 'pdf'
      }
    } catch (error) {
      console.error('Word to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert Excel to PDF
  async convertExcelToPDF(file, outputDir) {
    try {
      const workbook = XLSX.readFile(file.path)
      const pdfDoc = await PDFDocument.create()
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const pageWidth = 595
      const pageHeight = 842
      const margin = 50
      const cellHeight = 20
      const cellWidth = 80
      
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        
        if (jsonData.length > 0) {
          const page = pdfDoc.addPage([pageWidth, pageHeight])
          
          // Draw sheet name
          page.drawText(`Sheet: ${sheetName}`, {
            x: margin,
            y: pageHeight - margin - 20,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          })
          
          // Draw table data
          jsonData.forEach((row, rowIndex) => {
            if (rowIndex < 30) { // Limit rows to fit on page
              const y = pageHeight - margin - 60 - (rowIndex * cellHeight)
              
              if (Array.isArray(row)) {
                row.forEach((cell, colIndex) => {
                  if (colIndex < 6 && y > margin) { // Limit columns
                    const x = margin + (colIndex * cellWidth)
                    const cellText = String(cell || '').substring(0, 10) // Truncate long text
                    
                    page.drawText(cellText, {
                      x: x,
                      y: y,
                      size: 10,
                      font: helveticaFont,
                      color: rgb(0, 0, 0),
                    })
                  }
                })
              }
            }
          })
        }
      })
      
      const pdfBytes = await pdfDoc.save()
      const outputPath = path.join(outputDir, `converted_${uuidv4()}.pdf`)
      
      fs.writeFileSync(outputPath, pdfBytes)

      return {
        success: true,
        outputPath,
        type: 'pdf'
      }
    } catch (error) {
      console.error('Excel to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert PowerPoint to PDF (basic implementation)
  async convertPowerPointToPDF(file, outputDir) {
    try {
      // Note: Converting PPTX to PDF is complex and typically requires external tools
      // This is a placeholder implementation that creates a simple PDF
      
      const pdfDoc = await PDFDocument.create()
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const page = pdfDoc.addPage()
      const { width, height } = page.getSize()
      
      page.drawText('PowerPoint to PDF Conversion', {
        x: 50,
        y: height - 100,
        size: 20,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      })
      
      page.drawText('Original file: ' + file.originalname, {
        x: 50,
        y: height - 150,
        size: 12,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      })
      
      page.drawText('Note: Full PowerPoint conversion requires additional processing.', {
        x: 50,
        y: height - 200,
        size: 10,
        font: helveticaFont,
        color: rgb(0.8, 0.4, 0.4),
      })
      
      const pdfBytes = await pdfDoc.save()
      const outputPath = path.join(outputDir, `converted_${uuidv4()}.pdf`)
      
      fs.writeFileSync(outputPath, pdfBytes)

      return {
        success: true,
        outputPath,
        type: 'pdf'
      }
    } catch (error) {
      console.error('PowerPoint to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get supported conversion formats
  getSupportedFormats() {
    return {
      input: ['.pdf', '.docx', '.xlsx', '.pptx'],
      output: ['.pdf', '.txt']
    }
  }
}

module.exports = new ConvertProcessor() 