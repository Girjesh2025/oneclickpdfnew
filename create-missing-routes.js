#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// PDF tools and their configurations
const PDF_TOOLS = [
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Split PDF into individual pages' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size' },
  { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to Word document' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Convert PDF to Excel spreadsheet' },
  { id: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', description: 'Convert PDF to PowerPoint presentation' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word document to PDF' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel spreadsheet to PDF' },
  { id: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', description: 'Convert PowerPoint to PDF' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to JPG images' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert JPG images to PDF' },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert HTML content to PDF' },
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Edit PDF content and annotations' },
  { id: 'watermark-pdf', name: 'Watermark PDF', description: 'Add watermark to PDF' },
  { id: 'password-protect-pdf', name: 'Password Protect PDF', description: 'Add password protection' },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Add page numbers to PDF' },
  { id: 'crop-pdf', name: 'Crop PDF', description: 'Crop PDF pages' },
  { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorganize PDF pages' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password from PDF' },
  { id: 'sign-pdf', name: 'Sign PDF', description: 'Add digital signature to PDF' },
  { id: 'redact-pdf', name: 'Redact PDF', description: 'Redact sensitive information' },
  { id: 'ocr', name: 'OCR', description: 'Extract text from scanned PDFs' },
  { id: 'scan-to-pdf', name: 'Scan to PDF', description: 'Convert scanned images to PDF' },
  { id: 'pdf-to-pdfa', name: 'PDF to PDF/A', description: 'Convert to archival PDF format' }
];

class RouteGenerator {
  constructor() {
    this.frontendDir = path.join(process.cwd(), 'frontend', 'app');
    this.createdRoutes = [];
    this.errors = [];
  }

  // Generate page.tsx content for a PDF tool
  generatePageContent(tool) {
    return `'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import FileUpload from '@/components/FileUpload'
import ProcessingModal from '@/components/ProcessingModal'
import Footer from '@/components/Footer'
import { ArrowLeft, ${this.getIcon(tool.id)} } from 'lucide-react'
import Link from 'next/link'

export default function ${this.toPascalCase(tool.id)}Page() {
  const { t } = useTranslation()
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles)
  }

  const handleProcessStart = () => {
    setIsProcessing(true)
  }

  const handleProcessComplete = () => {
    setIsProcessing(false)
    setFiles([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
            <${this.getIcon(tool.id)} className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">${tool.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">${tool.description}</p>
        </div>

        {/* File Upload Area */}
        <div className="max-w-4xl mx-auto">
          <FileUpload
            onFilesUpload={handleFilesUpload}
            accept="${this.getAcceptTypes(tool.id)}"
            maxFiles={${this.getMaxFiles(tool.id)}}
            toolId="${tool.id}"
          />

          {files.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Files:</h3>
              <ul className="space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
              <button
                onClick={handleProcessStart}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Process Files
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          ${this.getFeatures(tool.id)}
        </div>
      </main>

      <Footer />

      {/* Processing Modal */}
      {isProcessing && (
        <ProcessingModal
          isOpen={isProcessing}
          onComplete={handleProcessComplete}
          files={files}
          toolId="${tool.id}"
        />
      )}
    </div>
  )
}`;
  }

  // Generate layout.tsx content for a PDF tool
  generateLayoutContent(tool) {
    return `import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: '${tool.name} - OneClickPDF',
  description: '${tool.description}. Free online PDF tool.',
  keywords: ['pdf', '${tool.id.replace('-', ' ')}', 'convert', 'online', 'free'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ${this.toPascalCase(tool.id)}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}`;
  }

  // Utility functions
  toPascalCase(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  getIcon(toolId) {
    const icons = {
      'merge-pdf': 'Layers',
      'split-pdf': 'Scissors',
      'compress-pdf': 'Archive',
      'rotate-pdf': 'RotateCw',
      'pdf-to-word': 'FileText',
      'pdf-to-excel': 'Table',
      'pdf-to-powerpoint': 'Presentation',
      'word-to-pdf': 'FileText',
      'excel-to-pdf': 'Table',
      'powerpoint-to-pdf': 'Presentation',
      'pdf-to-jpg': 'Image',
      'jpg-to-pdf': 'FileImage',
      'html-to-pdf': 'Code',
      'edit-pdf': 'Edit',
      'watermark-pdf': 'Stamp',
      'password-protect-pdf': 'Lock',
      'page-numbers': 'Hash',
      'crop-pdf': 'Crop',
      'organize-pdf': 'Shuffle',
      'unlock-pdf': 'Unlock',
      'sign-pdf': 'PenTool',
      'redact-pdf': 'EyeOff',
      'ocr': 'ScanText',
      'scan-to-pdf': 'Scanner',
      'pdf-to-pdfa': 'Archive'
    };
    return icons[toolId] || 'File';
  }

  getAcceptTypes(toolId) {
    if (toolId.includes('pdf-to')) return '.pdf';
    if (toolId.includes('word') || toolId.includes('doc')) return '.pdf,.doc,.docx';
    if (toolId.includes('excel')) return '.pdf,.xls,.xlsx';
    if (toolId.includes('powerpoint') || toolId.includes('ppt')) return '.pdf,.ppt,.pptx';
    if (toolId.includes('jpg') || toolId.includes('image')) return '.pdf,.jpg,.jpeg,.png';
    if (toolId.includes('html')) return '.html,.htm';
    return '.pdf';
  }

  getMaxFiles(toolId) {
    if (toolId === 'merge-pdf' || toolId === 'jpg-to-pdf') return 10;
    return 1;
  }

  getFeatures(toolId) {
    const features = {
      'merge-pdf': [
        { title: 'Multiple Files', desc: 'Combine up to 10 PDF files' },
        { title: 'Preserve Quality', desc: 'Maintains original quality' },
        { title: 'Fast Processing', desc: 'Quick merge operation' }
      ],
      'split-pdf': [
        { title: 'Page by Page', desc: 'Split into individual pages' },
        { title: 'Custom Ranges', desc: 'Extract specific page ranges' },
        { title: 'Batch Download', desc: 'Download all pages at once' }
      ],
      'compress-pdf': [
        { title: 'Size Reduction', desc: 'Reduce file size by up to 90%' },
        { title: 'Quality Control', desc: 'Choose compression level' },
        { title: 'Optimize Images', desc: 'Smart image compression' }
      ]
    };
    
    const defaultFeatures = [
      { title: 'Secure Processing', desc: 'Files processed securely' },
      { title: 'No Registration', desc: 'Use without signing up' },
      { title: 'Free Service', desc: 'Completely free to use' }
    ];

    const toolFeatures = features[toolId] || defaultFeatures;
    
    return toolFeatures.map(feature => `
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">${feature.title}</h3>
            <p className="text-gray-600">${feature.desc}</p>
          </div>`).join('');
  }

  async createRoute(tool) {
    try {
      const routeDir = path.join(this.frontendDir, tool.id);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(routeDir)) {
        await fs.promises.mkdir(routeDir, { recursive: true });
      }

      // Create page.tsx
      const pageContent = this.generatePageContent(tool);
      await fs.promises.writeFile(path.join(routeDir, 'page.tsx'), pageContent);

      // Create layout.tsx
      const layoutContent = this.generateLayoutContent(tool);
      await fs.promises.writeFile(path.join(routeDir, 'layout.tsx'), layoutContent);

      this.createdRoutes.push({
        tool: tool.name,
        route: `/${tool.id}`,
        path: routeDir
      });

      console.log(`✅ Created route: /${tool.id}`);
      
    } catch (error) {
      this.errors.push({
        tool: tool.name,
        error: error.message
      });
      console.log(`❌ Failed to create route for ${tool.name}: ${error.message}`);
    }
  }

  async createAllRoutes() {
    console.log('🏗️  Creating Missing Next.js Routes for PDF Tools\n');
    console.log(`📁 Target directory: ${this.frontendDir}\n`);
    console.log('='.repeat(60));

    for (const tool of PDF_TOOLS) {
      await this.createRoute(tool);
      // Small delay to avoid overwhelming the filesystem
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 ROUTE CREATION SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`✅ Successfully created: ${this.createdRoutes.length} routes`);
    console.log(`❌ Failed to create: ${this.errors.length} routes`);
    
    if (this.createdRoutes.length > 0) {
      console.log('\n✨ CREATED ROUTES:');
      this.createdRoutes.forEach(route => {
        console.log(`   • ${route.route} - ${route.tool}`);
      });
    }

    if (this.errors.length > 0) {
      console.log('\n🔍 ERRORS:');
      this.errors.forEach(error => {
        console.log(`   • ${error.tool}: ${error.error}`);
      });
    }

    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Restart your Next.js development server');
    console.log('   2. Test the new routes in your browser');
    console.log('   3. The routes will automatically appear in your app');
    console.log('   4. Run the route checker again to verify they work');

    console.log('\n🎯 Route creation completed!');
  }
}

// Main execution
if (require.main === module) {
  const generator = new RouteGenerator();
  
  generator.createAllRoutes().catch(error => {
    console.error('❌ Error creating routes:', error.message);
    process.exit(1);
  });
}

module.exports = { RouteGenerator, PDF_TOOLS }; 