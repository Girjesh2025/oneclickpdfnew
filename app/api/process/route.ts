import { NextRequest, NextResponse } from 'next/server'
// Ensure this route runs on Node.js (not Edge) and is always dynamic
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Hint for platforms like Vercel to allow longer processing time
export const maxDuration = 30
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// No filesystem operations needed for serverless

// PDF Processing Functions
async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()
  
  for (const file of files) {
    const pdfBytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(pdfBytes)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page: any) => mergedPdf.addPage(page))
  }
  
  return await mergedPdf.save()
}

async function splitPDF(file: File): Promise<Uint8Array[]> {
  const pdfBytes = await file.arrayBuffer()
  const pdf = await PDFDocument.load(pdfBytes)
  const pageCount = pdf.getPageCount()
  const splitPdfs: Uint8Array[] = []
  
  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create()
    const [copiedPage] = await newPdf.copyPages(pdf, [i])
    newPdf.addPage(copiedPage)
    splitPdfs.push(await newPdf.save())
  }
  
  return splitPdfs
}

async function compressPDF(file: File): Promise<Uint8Array> {
  const pdfBytes = await file.arrayBuffer()
  const pdf = await PDFDocument.load(pdfBytes)
  
  // Basic compression by removing metadata and optimizing
  pdf.setTitle('')
  pdf.setAuthor('')
  pdf.setSubject('')
  pdf.setCreator('')
  pdf.setProducer('')
  
  return await pdf.save({
    useObjectStreams: false,
    addDefaultPage: false,
  })
}

async function pdfToImages(file: File): Promise<Buffer[]> {
  try {
    // Dynamically import sharp to avoid crashing the route when it's not bundled
    let sharpLib: any
    try {
      const mod = await import('sharp')
      sharpLib = (mod as any).default || mod
    } catch (e) {
      console.warn('sharp not available in this deployment; pdf-to-jpg disabled')
      throw new Error('PDF to image conversion requires sharp, which is not available')
    }
    // For demo purposes, create a simple image representation
    const pdfBytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(pdfBytes)
    const pageCount = pdf.getPageCount()
    
    const images: Buffer[] = []
    
    // Create a simple image for each page (placeholder)
    for (let i = 0; i < pageCount; i++) {
      const image = await sharpLib({
        create: {
          width: 800,
          height: 1000,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }
        }
      })
      .jpeg({ quality: 80 })
      .toBuffer()
      
      images.push(image)
    }
    
    return images
  } catch (error) {
    console.error('PDF to images conversion error:', error)
    throw error
  }
}

async function imagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  
  for (const file of files) {
    try {
      const imageBytes = await file.arrayBuffer()
      let image;
      
      // Validate file type and embed accordingly
      if (file.type === 'image/png') {
        image = await pdf.embedPng(imageBytes)
      } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        // Validate JPEG header before embedding
        const uint8Array = new Uint8Array(imageBytes)
        if (uint8Array.length < 2 || uint8Array[0] !== 0xFF || uint8Array[1] !== 0xD8) {
          throw new Error(`Invalid JPEG file: ${file.name}`)
        }
        image = await pdf.embedJpg(imageBytes)
      } else {
        // For other image types, try to convert using Sharp if available
        // or skip with warning
        console.warn(`Unsupported image type for ${file.name}: ${file.type}`)
        continue
      }
      
      const page = pdf.addPage([image.width, image.height])
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      })
    } catch (error) {
      console.error(`Error processing image ${file.name}:`, error)
      // Continue with other files instead of failing completely
      continue
    }
  }
  
  return await pdf.save()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tool = formData.get('tool') as string
    const files = formData.getAll('files') as File[]
    
    if (!tool || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing tool or files' },
        { status: 400 }
      )
    }

    // Handle all tools locally for better performance (no backend required)
    const localTools = ['merge', 'split', 'compress', 'pdf-to-jpg', 'jpg-to-pdf', 'organize', 'rotate', 'crop', 'page-numbers', 'watermark', 'protect-pdf', 'unlock-pdf', 'edit-pdf', 'sign-pdf', 'redact-pdf']
    
    if (localTools.includes(tool)) {
      // Handle locally (in-memory processing for serverless)
      
      let result: any
      let filename: string = 'processed.pdf' // Default filename
      let contentType: string = 'application/pdf'

      switch (tool) {
        case 'merge':
          result = await mergePDFs(files)
          filename = 'merged.pdf'
          break
          
        case 'split':
          const splitResults = await splitPDF(files[0])
          // For demo, return the first split page
          result = splitResults[0]
          filename = 'split_page_1.pdf'
          break
          
        case 'compress':
          result = await compressPDF(files[0])
          filename = 'compressed.pdf'
          break
          
        case 'pdf-to-jpg':
          try {
            const images = await pdfToImages(files[0])
            result = images[0] // Return first image for demo
            filename = 'converted.jpg'
            contentType = 'image/jpeg'
          } catch (e) {
            return NextResponse.json(
              { error: 'PDF to JPG is not available in this deployment.' },
              { status: 501 }
            )
          }
          break
          
        case 'jpg-to-pdf':
          result = await imagesToPDF(files)
          filename = 'images_to_pdf.pdf'
          break
          
        // Additional tools with basic implementations
        case 'organize':
        case 'rotate':
        case 'crop':
        case 'page-numbers':
        case 'watermark':
        case 'protect-pdf':
        case 'unlock-pdf':
        case 'edit-pdf':
        case 'sign-pdf':
        case 'redact-pdf':
          // For now, return the original file (placeholder implementation)
          result = await files[0].arrayBuffer()
          filename = `${tool.replace('-', '_')}.pdf`
          break
      }

      // Return the processed file
      return new NextResponse(result, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } else {
      // Fallback for unsupported tools
      return NextResponse.json(
        { error: `Tool '${tool}' is not yet implemented. Available tools: ${localTools.join(', ')}` },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json(
      { error: 'Processing failed. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'OneClickPDF API is running',
    timestamp: new Date().toISOString()
  })
} 