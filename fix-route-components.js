#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Available icons in lucide-react that we can actually use
const VALID_ICONS = {
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
  'scan-to-pdf': 'ScanLine', // Fixed: Scanner -> ScanLine
  'pdf-to-pdfa': 'Archive'
};

class RouteFixer {
  constructor() {
    this.frontendDir = path.join(process.cwd(), 'frontend', 'app');
    this.fixedRoutes = [];
    this.errors = [];
  }

  async fixRoute(routeId) {
    const routeDir = path.join(this.frontendDir, routeId);
    const pageFile = path.join(routeDir, 'page.tsx');
    const layoutFile = path.join(routeDir, 'layout.tsx');

    try {
      // Fix page.tsx
      if (fs.existsSync(pageFile)) {
        let content = fs.readFileSync(pageFile, 'utf8');
        
        // Fix icon import
        const correctIcon = VALID_ICONS[routeId] || 'File';
        content = content.replace(
          /import { ArrowLeft, \w+ } from 'lucide-react'/,
          `import { ArrowLeft, ${correctIcon} } from 'lucide-react'`
        );
        
        // Fix icon usage in JSX
        content = content.replace(
          /<\w+ className="w-8 h-8 text-blue-600" \/>/,
          `<${correctIcon} className="w-8 h-8 text-blue-600" />`
        );

        // Fix FileUpload props
        content = content.replace(
          /\s*<FileUpload\s+onFilesUpload=\{handleFilesUpload\}\s+accept="[^"]*"\s+maxFiles=\{\d+\}\s+toolId="[^"]*"\s+\/>/,
          `
          <FileUpload
            tool="${routeId}"
            files={files}
            onFilesUpload={handleFilesUpload}
            onProcessStart={handleProcessStart}
            onBack={() => window.history.back()}
          />`
        );

        // Fix ProcessingModal props
        content = content.replace(
          /\s*<ProcessingModal\s+isOpen=\{isProcessing\}\s+onComplete=\{handleProcessComplete\}\s+files=\{files\}\s+toolId="[^"]*"\s+\/>/,
          `
        <ProcessingModal
          tool="${routeId}"
          files={files}
          onComplete={handleProcessComplete}
        />`
        );

        fs.writeFileSync(pageFile, content);
      }

      // Fix layout.tsx viewport issue
      if (fs.existsSync(layoutFile)) {
        let content = fs.readFileSync(layoutFile, 'utf8');
        
        // Move viewport from metadata to separate export
        content = content.replace(
          /export const metadata: Metadata = \{([^}]+)\}/s,
          (match, metadataContent) => {
            // Remove viewport from metadata if it exists
            const cleanMetadata = metadataContent.replace(/,?\s*viewport:\s*\{[^}]+\}/s, '');
            return `export const metadata: Metadata = {${cleanMetadata}}`;
          }
        );

        // Ensure viewport is properly exported
        if (!content.includes('export const viewport: Viewport')) {
          content = content.replace(
            /export const viewport: Viewport = \{[^}]+\}/s,
            `export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}`
          );
        }

        fs.writeFileSync(layoutFile, content);
      }

      this.fixedRoutes.push(routeId);
      console.log(`✅ Fixed route: /${routeId}`);

    } catch (error) {
      this.errors.push({ route: routeId, error: error.message });
      console.log(`❌ Failed to fix route /${routeId}: ${error.message}`);
    }
  }

  async fixAllRoutes() {
    console.log('🔧 Fixing Route Component Issues\n');
    console.log('='.repeat(60));

    const routes = Object.keys(VALID_ICONS);
    
    for (const routeId of routes) {
      await this.fixRoute(routeId);
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 ROUTE FIX SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`✅ Successfully fixed: ${this.fixedRoutes.length} routes`);
    console.log(`❌ Failed to fix: ${this.errors.length} routes`);
    
    if (this.fixedRoutes.length > 0) {
      console.log('\n✨ FIXED ROUTES:');
      this.fixedRoutes.forEach(route => {
        console.log(`   • /${route}`);
      });
    }

    if (this.errors.length > 0) {
      console.log('\n🔍 ERRORS:');
      this.errors.forEach(error => {
        console.log(`   • /${error.route}: ${error.error}`);
      });
    }

    console.log('\n💡 FIXES APPLIED:');
    console.log('   • Fixed icon imports (Scanner → ScanLine, etc.)');
    console.log('   • Updated FileUpload component props');
    console.log('   • Fixed ProcessingModal component props');
    console.log('   • Moved viewport metadata to proper export');

    console.log('\n🎯 Route fixing completed!');
  }
}

// Main execution
if (require.main === module) {
  const fixer = new RouteFixer();
  
  fixer.fixAllRoutes().catch(error => {
    console.error('❌ Error fixing routes:', error.message);
    process.exit(1);
  });
}

module.exports = { RouteFixer, VALID_ICONS }; 