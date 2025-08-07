import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import sharp from 'sharp'

// Ensure upload and output directories exist
async function ensureDirectories() {
  const uploadDir = path.join(process.cwd(), 'uploads')
  const outputDir = path.join(process.cwd(), 'output')
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
  }
}

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
    // For demo purposes, create a simple image representation
    const pdfBytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(pdfBytes)
    const pageCount = pdf.getPageCount()
    
    const images: Buffer[] = []
    
    // Create a simple image for each page (placeholder)
    for (let i = 0; i < pageCount; i++) {
      const image = await sharp({
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
    const imageBytes = await file.arrayBuffer()
    const image = file.type.includes('png') 
      ? await pdf.embedPng(imageBytes)
      : await pdf.embedJpg(imageBytes)
    
    const page = pdf.addPage([image.width, image.height])
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    })
  }
  
  return await pdf.save()
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories()
    
    const formData = await request.formData()
    const tool = formData.get('tool') as string
    const files = formData.getAll('files') as File[]
    
    if (!tool || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing tool or files' },
        { status: 400 }
      )
    }

    let result: any
    let filename: string
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
        const images = await pdfToImages(files[0])
        result = images[0] // Return first image for demo
        filename = 'converted.jpg'
        contentType = 'image/jpeg'
        break
        
      case 'jpg-to-pdf':
        result = await imagesToPDF(files)
        filename = 'images_to_pdf.pdf'
        break
        
      default:
        return NextResponse.json(
          { error: `Tool "${tool}" not implemented yet` },
          { status: 400 }
        )
    }

    // Return the processed file
    return new NextResponse(result, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

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