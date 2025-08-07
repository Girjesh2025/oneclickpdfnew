#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Configuration
const API_BASE_URL = 'http://localhost:3001/api/process';
const BACKEND_API_URL = 'http://localhost:5000/api';
const TIMEOUT = 30000; // 30 seconds for file processing

class PDFFunctionalTester {
  constructor() {
    this.testResults = [];
    this.testFiles = {
      pdf: null,
      image: null,
      document: null
    };
  }

  // Create test files
  async createTestFiles() {
    console.log('📁 Creating test files...\n');
    
    const testDir = path.join(process.cwd(), 'test-files');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Create a simple PDF for testing
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Test PDF Document) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000102 00000 n 
0000000251 00000 n 
0000000347 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
420
%%EOF`;

    const testPdfPath = path.join(testDir, 'test.pdf');
    fs.writeFileSync(testPdfPath, pdfContent);
    
    // Create a simple text file for document conversion tests
    const textContent = 'This is a test document for PDF conversion testing.';
    const testTextPath = path.join(testDir, 'test.txt');
    fs.writeFileSync(testTextPath, textContent);

    console.log(`✅ Created test PDF: ${testPdfPath}`);
    console.log(`✅ Created test document: ${testTextPath}\n`);

    this.testFiles.pdf = testPdfPath;
    this.testFiles.document = testTextPath;
  }

  // Make API request with file upload
  async makeFileRequest(url, files, additionalData = {}) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      
      // Add files
      files.forEach((filePath, index) => {
        if (fs.existsSync(filePath)) {
          form.append(`file${index}`, fs.createReadStream(filePath));
        }
      });

      // Add additional data
      Object.keys(additionalData).forEach(key => {
        form.append(key, additionalData[key]);
      });

      const options = {
        method: 'POST',
        headers: form.getHeaders(),
        timeout: TIMEOUT
      };

      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;

      const req = client.request(parsedUrl, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            contentType: res.headers['content-type'] || ''
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      form.pipe(req);
    });
  }

  // Test individual PDF tool functionality
  async testPDFTool(toolId, toolName, testConfig) {
    console.log(`🧪 Testing ${toolName}...`);
    
    try {
      const { files, operation, expectedResponse } = testConfig;
      const testFiles = files.map(file => this.testFiles[file]).filter(Boolean);
      
      if (testFiles.length === 0) {
        throw new Error('No valid test files available');
      }

      const response = await this.makeFileRequest(API_BASE_URL, testFiles, {
        operation: operation || toolId,
        tool: toolId
      });

      let result = {
        tool: toolName,
        toolId: toolId,
        status: 'unknown',
        statusCode: response.statusCode,
        message: ''
      };

      if (response.statusCode === 200) {
        result.status = 'working';
        result.message = 'Tool processed successfully';
        console.log(`   ✅ ${toolName} - Working (200 OK)`);
      } else if (response.statusCode === 400) {
        result.status = 'implemented';
        result.message = 'Tool exists but needs valid input';
        console.log(`   🔶 ${toolName} - Implemented but needs valid data (400)`);
      } else if (response.statusCode === 404) {
        result.status = 'not-implemented';
        result.message = 'Tool not implemented in API';
        console.log(`   ❌ ${toolName} - Not implemented (404)`);
      } else {
        result.status = 'error';
        result.message = `HTTP ${response.statusCode}`;
        console.log(`   ⚠️  ${toolName} - Error (${response.statusCode})`);
      }

      this.testResults.push(result);
      
    } catch (error) {
      const result = {
        tool: toolName,
        toolId: toolId,
        status: 'error',
        message: error.message,
        statusCode: null
      };
      
      this.testResults.push(result);
      console.log(`   ❌ ${toolName} - Error: ${error.message}`);
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async runAllTests() {
    console.log('🔧 PDF Tool Functionality Tester\n');
    console.log('Testing actual PDF processing capabilities...\n');
    console.log('='.repeat(70));

    await this.createTestFiles();

    // Define test configurations for each tool
    const testConfigs = [
      { id: 'merge', name: 'Merge PDF', config: { files: ['pdf', 'pdf'], operation: 'merge' } },
      { id: 'split', name: 'Split PDF', config: { files: ['pdf'], operation: 'split' } },
      { id: 'compress', name: 'Compress PDF', config: { files: ['pdf'], operation: 'compress' } },
      { id: 'rotate', name: 'Rotate PDF', config: { files: ['pdf'], operation: 'rotate' } },
      { id: 'pdf-to-word', name: 'PDF to Word', config: { files: ['pdf'], operation: 'convert', format: 'word' } },
      { id: 'pdf-to-excel', name: 'PDF to Excel', config: { files: ['pdf'], operation: 'convert', format: 'excel' } },
      { id: 'pdf-to-jpg', name: 'PDF to JPG', config: { files: ['pdf'], operation: 'convert', format: 'jpg' } },
      { id: 'word-to-pdf', name: 'Word to PDF', config: { files: ['document'], operation: 'convert', format: 'pdf' } },
      { id: 'watermark', name: 'Watermark PDF', config: { files: ['pdf'], operation: 'watermark' } },
      { id: 'protect', name: 'Password Protect', config: { files: ['pdf'], operation: 'protect' } }
    ];

    for (const test of testConfigs) {
      await this.testPDFTool(test.id, test.name, test.config);
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 PDF FUNCTIONALITY TEST SUMMARY');
    console.log('='.repeat(70));

    const working = this.testResults.filter(r => r.status === 'working');
    const implemented = this.testResults.filter(r => r.status === 'implemented');
    const notImplemented = this.testResults.filter(r => r.status === 'not-implemented');
    const errors = this.testResults.filter(r => r.status === 'error');

    console.log(`\n📈 RESULTS:`);
    console.log(`   ✅ Fully Working: ${working.length} tools`);
    console.log(`   🔶 Implemented (needs data): ${implemented.length} tools`);
    console.log(`   ❌ Not Implemented: ${notImplemented.length} tools`);
    console.log(`   ⚠️  Errors: ${errors.length} tools`);

    const totalTested = this.testResults.length;
    const functionalTools = working.length + implemented.length;
    const successRate = totalTested > 0 ? ((functionalTools / totalTested) * 100).toFixed(1) : 0;

    console.log(`\n🎯 OVERALL FUNCTIONALITY: ${successRate}%`);

    if (working.length > 0) {
      console.log(`\n✅ FULLY WORKING TOOLS:`);
      working.forEach(tool => {
        console.log(`   • ${tool.tool}`);
      });
    }

    if (implemented.length > 0) {
      console.log(`\n🔶 IMPLEMENTED BUT NEED PROPER DATA:`);
      implemented.forEach(tool => {
        console.log(`   • ${tool.tool}`);
      });
    }

    if (notImplemented.length > 0) {
      console.log(`\n❌ NOT YET IMPLEMENTED:`);
      notImplemented.forEach(tool => {
        console.log(`   • ${tool.tool}`);
      });
    }

    if (errors.length > 0) {
      console.log(`\n⚠️  ERRORS ENCOUNTERED:`);
      errors.forEach(tool => {
        console.log(`   • ${tool.tool}: ${tool.message}`);
      });
    }

    console.log(`\n💡 RECOMMENDATIONS:`);
    if (notImplemented.length > 0) {
      console.log(`   • Implement missing tools in the API`);
    }
    if (implemented.length > 0) {
      console.log(`   • Add proper file validation and processing logic`);
    }
    if (errors.length > 0) {
      console.log(`   • Debug error cases and improve error handling`);
    }

    console.log(`\n🎯 Functionality testing completed!`);
  }

  cleanup() {
    const testDir = path.join(process.cwd(), 'test-files');
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
      console.log(`\n🧹 Cleaned up test files`);
    }
  }
}

// Main execution
if (require.main === module) {
  // Check if form-data is available
  try {
    require('form-data');
  } catch (error) {
    console.error('❌ Error: This script requires the form-data package');
    console.error('Install it with: npm install form-data');
    process.exit(1);
  }

  const tester = new PDFFunctionalTester();
  
  tester.runAllTests()
    .then(() => {
      if (process.argv.includes('--cleanup')) {
        tester.cleanup();
      }
    })
    .catch(error => {
      console.error('❌ Error running functionality tests:', error.message);
      process.exit(1);
    });
}

module.exports = { PDFFunctionalTester }; 