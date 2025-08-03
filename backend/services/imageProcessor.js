const { PDFDocument } = require('pdf-lib')
const sharp = require('sharp')
const fs = require('fs-extra')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

class ImageProcessor {

  // Convert PDF pages to images
  async pdfToImages(file, outputDir, format = 'jpeg', quality = 90) {
    try {
      // Note: For production, you'd want to use a more robust PDF to image converter
      // like pdf2pic, pdf-poppler, or ghostscript
      
      const pdf2pic = require('pdf2pic')
      const options = {
        density: 300,           // Output DPI
        saveFilename: "page",   // Output filename
        savePath: outputDir,    // Output directory
        format: format,         // Output format
        width: 2480,           // Output width
        height: 3508           // Output height (A4)
      }

      const convert = pdf2pic.fromPath(file.path, options)
      const results = await convert.bulk(-1) // Convert all pages

      if (results.length === 0) {
        throw new Error('No pages found in PDF')
      }

      // If multiple pages, create a zip file
      if (results.length > 1) {
        const zipPath = path.join(outputDir, `pdf_images_${uuidv4()}.zip`)
        const archiver = require('archiver')
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })

        return new Promise((resolve, reject) => {
          output.on('close', () => {
            // Cleanup individual image files
            results.forEach(result => {
              if (fs.existsSync(result.path)) {
                fs.unlinkSync(result.path)
              }
            })

            resolve({
              success: true,
              outputPath: zipPath,
              type: 'zip',
              pageCount: results.length
            })
          })

          archive.on('error', (err) => {
            reject(err)
          })

          archive.pipe(output)

          // Add each image to the zip
          results.forEach((result, index) => {
            if (fs.existsSync(result.path)) {
              archive.file(result.path, { name: `page_${index + 1}.${format}` })
            }
          })

          archive.finalize()
        })
      } else {
        // Single page, return the image directly
        const imagePath = results[0].path
        const outputPath = path.join(outputDir, `pdf_image_${uuidv4()}.${format}`)
        fs.moveSync(imagePath, outputPath)

        return {
          success: true,
          outputPath,
          type: 'image',
          pageCount: 1
        }
      }
    } catch (error) {
      console.error('PDF to images conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert images to PDF
  async imagesToPDF(files, outputDir) {
    try {
      if (files.length === 0) {
        throw new Error('No image files provided')
      }

      const pdfDoc = await PDFDocument.create()

      for (const file of files) {
        try {
          // Process image with sharp to ensure compatibility
          const imageBuffer = await sharp(file.path)
            .resize(2480, 3508, { 
              fit: 'inside', 
              withoutEnlargement: true 
            })
            .jpeg({ quality: 85 })
            .toBuffer()

          // Embed image in PDF
          const image = await pdfDoc.embedJpg(imageBuffer)
          const page = pdfDoc.addPage()
          
          const { width, height } = page.getSize()
          const imageAspectRatio = image.width / image.height
          const pageAspectRatio = width / height

          let imageWidth, imageHeight

          if (imageAspectRatio > pageAspectRatio) {
            // Image is wider than page
            imageWidth = width * 0.9 // 90% of page width
            imageHeight = imageWidth / imageAspectRatio
          } else {
            // Image is taller than page
            imageHeight = height * 0.9 // 90% of page height
            imageWidth = imageHeight * imageAspectRatio
          }

          const x = (width - imageWidth) / 2
          const y = (height - imageHeight) / 2

          page.drawImage(image, {
            x: x,
            y: y,
            width: imageWidth,
            height: imageHeight,
          })
        } catch (imageError) {
          console.error(`Error processing image ${file.originalname}:`, imageError)
          // Continue with other images instead of failing entirely
        }
      }

      const pdfBytes = await pdfDoc.save()
      const outputPath = path.join(outputDir, `images_to_pdf_${uuidv4()}.pdf`)
      
      fs.writeFileSync(outputPath, pdfBytes)

      return {
        success: true,
        outputPath,
        type: 'pdf',
        imageCount: files.length
      }
    } catch (error) {
      console.error('Images to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Optimize image for PDF embedding
  async optimizeImageForPDF(imagePath, maxWidth = 2480, maxHeight = 3508) {
    try {
      const metadata = await sharp(imagePath).metadata()
      
      // Calculate optimal dimensions
      const aspectRatio = metadata.width / metadata.height
      let newWidth = Math.min(metadata.width, maxWidth)
      let newHeight = Math.min(metadata.height, maxHeight)
      
      if (newWidth / newHeight !== aspectRatio) {
        if (newWidth / aspectRatio <= maxHeight) {
          newHeight = Math.round(newWidth / aspectRatio)
        } else {
          newWidth = Math.round(newHeight * aspectRatio)
        }
      }

      const optimizedBuffer = await sharp(imagePath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 85,
          progressive: true
        })
        .toBuffer()

      return optimizedBuffer
    } catch (error) {
      console.error('Image optimization error:', error)
      throw error
    }
  }

  // Get image information
  async getImageInfo(imagePath) {
    try {
      const metadata = await sharp(imagePath).metadata()
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size,
        density: metadata.density
      }
    } catch (error) {
      console.error('Error getting image info:', error)
      throw error
    }
  }

  // Resize image
  async resizeImage(imagePath, outputPath, width, height, options = {}) {
    try {
      await sharp(imagePath)
        .resize(width, height, {
          fit: options.fit || 'inside',
          withoutEnlargement: options.withoutEnlargement !== false
        })
        .jpeg({
          quality: options.quality || 85
        })
        .toFile(outputPath)

      return {
        success: true,
        outputPath
      }
    } catch (error) {
      console.error('Image resize error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Convert image format
  async convertImageFormat(imagePath, outputPath, format, options = {}) {
    try {
      let processor = sharp(imagePath)

      switch (format.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
          processor = processor.jpeg({ quality: options.quality || 85 })
          break
        case 'png':
          processor = processor.png({ quality: options.quality || 85 })
          break
        case 'webp':
          processor = processor.webp({ quality: options.quality || 85 })
          break
        default:
          throw new Error(`Unsupported format: ${format}`)
      }

      await processor.toFile(outputPath)

      return {
        success: true,
        outputPath
      }
    } catch (error) {
      console.error('Image format conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Scan to PDF (convert scanned images to searchable PDF)
  async scanToPDF(files, outputDir) {
    try {
      // This is similar to imagesToPDF but with OCR processing
      const result = await this.imagesToPDF(files, outputDir)
      
      if (result.success) {
        // In a real implementation, you'd apply OCR to make it searchable
        const scannedPath = result.outputPath.replace('images_to_pdf_', 'scanned_')
        fs.moveSync(result.outputPath, scannedPath)
        
        return {
          ...result,
          outputPath: scannedPath,
          isSearchable: true // Would be true after OCR processing
        }
      }
      
      return result
    } catch (error) {
      console.error('Scan to PDF conversion error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

module.exports = new ImageProcessor() 