#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { URL } = require('url');

// Configuration
const BASE_URL = 'http://localhost:3001'; // Frontend server
const TIMEOUT = 5000; // 5 seconds timeout

// Array of PDF tools and their routes
const pdfTools = [
  { name: 'Home Page', route: '/' },
  { name: 'Merge PDF', route: '/merge-pdf' },
  { name: 'Split PDF', route: '/split-pdf' },
  { name: 'Compress PDF', route: '/compress-pdf' },
  { name: 'Rotate PDF', route: '/rotate-pdf' },
  { name: 'PDF to Word', route: '/pdf-to-word' },
  { name: 'PDF to Excel', route: '/pdf-to-excel' },
  { name: 'PDF to PowerPoint', route: '/pdf-to-powerpoint' },
  { name: 'Word to PDF', route: '/word-to-pdf' },
  { name: 'Excel to PDF', route: '/excel-to-pdf' },
  { name: 'PowerPoint to PDF', route: '/powerpoint-to-pdf' },
  { name: 'PDF to JPG', route: '/pdf-to-jpg' },
  { name: 'JPG to PDF', route: '/jpg-to-pdf' },
  { name: 'HTML to PDF', route: '/html-to-pdf' },
  { name: 'Edit PDF', route: '/edit-pdf' },
  { name: 'Watermark PDF', route: '/watermark-pdf' },
  { name: 'Password Protect PDF', route: '/password-protect-pdf' },
  { name: 'Page Numbers', route: '/page-numbers' },
  { name: 'Crop PDF', route: '/crop-pdf' },
  { name: 'Organize PDF', route: '/organize-pdf' },
  { name: 'Unlock PDF', route: '/unlock-pdf' },
  { name: 'Sign PDF', route: '/sign-pdf' },
  { name: 'Redact PDF', route: '/redact-pdf' },
  { name: 'OCR', route: '/ocr' },
  { name: 'Scan to PDF', route: '/scan-to-pdf' },
  { name: 'PDF to PDF/A', route: '/pdf-to-pdfa' }
];

// Function to make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Route-Tester/1.0'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
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

    req.end();
  });
}

// Function to test a single route
async function testRoute(tool) {
  const url = `${BASE_URL}${tool.route}`;
  
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode >= 200 && response.statusCode < 400) {
      return { status: 'working', code: response.statusCode };
    } else {
      return { status: 'not-working', code: response.statusCode, error: `HTTP ${response.statusCode}` };
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return { status: 'not-working', error: 'Connection refused - Server not running' };
    } else if (error.message === 'Request timeout') {
      return { status: 'not-working', error: 'Timeout' };
    } else {
      return { status: 'not-working', error: error.message };
    }
  }
}

// Main function to test all routes
async function testAllRoutes() {
  console.log('🧪 Testing OneClickPDF Routes...\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`⏱️  Timeout: ${TIMEOUT}ms\n`);
  console.log('='.repeat(50));
  
  const results = [];
  let workingCount = 0;
  let notWorkingCount = 0;
  
  // Test routes sequentially
  for (let i = 0; i < pdfTools.length; i++) {
    const tool = pdfTools[i];
    
    const result = await testRoute(tool);
    
    if (result.status === 'working') {
      console.log(`✅ ${tool.name} - Working (${result.code})`);
      workingCount++;
    } else {
      console.log(`❌ ${tool.name} - Not Working (${result.error})`);
      notWorkingCount++;
    }
    
    results.push({
      ...tool,
      ...result
    });
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY:');
  console.log(`✅ Working: ${workingCount} tools`);
  console.log(`❌ Not Working: ${notWorkingCount} tools`);
  console.log(`📈 Success Rate: ${((workingCount / pdfTools.length) * 100).toFixed(1)}%`);
  
  // Detailed breakdown
  if (notWorkingCount > 0) {
    console.log('\n🔍 ISSUES FOUND:');
    results
      .filter(r => r.status === 'not-working')
      .forEach(tool => {
        console.log(`   • ${tool.name}: ${tool.error}`);
      });
    
    console.log('\n💡 TIPS:');
    console.log('   • Make sure your frontend server is running on http://localhost:3001');
    console.log('   • Check if routes are properly configured in your Next.js app');
    console.log('   • Some routes might be dynamic and require specific implementation');
  }
  
  console.log('\n✨ Route testing completed!');
  
  return results;
}

// Run the tests
if (require.main === module) {
  testAllRoutes().catch(error => {
    console.error('❌ Error running tests:', error.message);
    process.exit(1);
  });
}

module.exports = { testAllRoutes, testRoute, pdfTools }; 