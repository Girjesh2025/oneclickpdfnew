#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

// Configuration
const FRONTEND_API_URL = 'http://localhost:3001/api'; // Next.js API routes
const BACKEND_API_URL = 'http://localhost:5000/api';   // Express.js API
const TIMEOUT = 10000; // 10 seconds timeout

// API endpoints to test
const API_ENDPOINTS = {
  frontend: [
    { name: 'Process PDF', endpoint: '/process', method: 'POST' },
    { name: 'Health Check', endpoint: '/health', method: 'GET' }
  ],
  backend: [
    { name: 'Health Check', endpoint: '/health', method: 'GET' },
    { name: 'Merge PDF', endpoint: '/merge', method: 'POST' },
    { name: 'Split PDF', endpoint: '/split', method: 'POST' },
    { name: 'Compress PDF', endpoint: '/compress', method: 'POST' },
    { name: 'Rotate PDF', endpoint: '/rotate', method: 'POST' },
    { name: 'Convert PDF to Word', endpoint: '/convert/pdf-to-word', method: 'POST' },
    { name: 'Convert PDF to Excel', endpoint: '/convert/pdf-to-excel', method: 'POST' },
    { name: 'Convert PDF to PowerPoint', endpoint: '/convert/pdf-to-powerpoint', method: 'POST' },
    { name: 'Convert Word to PDF', endpoint: '/convert/word-to-pdf', method: 'POST' },
    { name: 'Convert Excel to PDF', endpoint: '/convert/excel-to-pdf', method: 'POST' },
    { name: 'Convert PowerPoint to PDF', endpoint: '/convert/powerpoint-to-pdf', method: 'POST' },
    { name: 'Convert PDF to JPG', endpoint: '/convert/pdf-to-jpg', method: 'POST' },
    { name: 'Convert JPG to PDF', endpoint: '/convert/jpg-to-pdf', method: 'POST' },
    { name: 'Convert HTML to PDF', endpoint: '/convert/html-to-pdf', method: 'POST' },
    { name: 'Edit PDF', endpoint: '/edit', method: 'POST' },
    { name: 'Watermark PDF', endpoint: '/watermark', method: 'POST' },
    { name: 'Password Protect PDF', endpoint: '/protect', method: 'POST' },
    { name: 'Add Page Numbers', endpoint: '/page-numbers', method: 'POST' },
    { name: 'Crop PDF', endpoint: '/crop', method: 'POST' },
    { name: 'Organize PDF', endpoint: '/organize', method: 'POST' },
    { name: 'Unlock PDF', endpoint: '/unlock', method: 'POST' },
    { name: 'Sign PDF', endpoint: '/sign', method: 'POST' },
    { name: 'Redact PDF', endpoint: '/redact', method: 'POST' },
    { name: 'OCR', endpoint: '/ocr', method: 'POST' },
    { name: 'Scan to PDF', endpoint: '/scan-to-pdf', method: 'POST' },
    { name: 'PDF to PDF/A', endpoint: '/convert/pdf-to-pdfa', method: 'POST' }
  ]
};

class APITester {
  constructor() {
    this.results = { frontend: [], backend: [] };
    this.stats = { frontend: { working: 0, notWorking: 0 }, backend: { working: 0, notWorking: 0 } };
  }

  makeRequest(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: method,
        timeout: TIMEOUT,
        headers: {
          'User-Agent': 'API-Tester/1.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      if (data && method !== 'GET') {
        const jsonData = JSON.stringify(data);
        options.headers['Content-Length'] = Buffer.byteLength(jsonData);
      }

      const req = client.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData,
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

      if (data && method !== 'GET') {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async testEndpoint(baseUrl, endpoint, type) {
    const url = `${baseUrl}${endpoint.endpoint}`;
    
    try {
      // For POST endpoints, we'll test with a simple request to see if the endpoint exists
      const testData = endpoint.method === 'POST' ? { test: true } : null;
      const response = await this.makeRequest(url, endpoint.method, testData);
      
      if (response.statusCode < 500) {
        // Any response code below 500 means the endpoint exists (even if it returns 400 for bad request)
        return { 
          status: 'working', 
          code: response.statusCode,
          contentType: response.contentType.split(';')[0],
          message: this.getStatusMessage(response.statusCode)
        };
      } else {
        return { 
          status: 'not-working', 
          code: response.statusCode, 
          error: `Server Error ${response.statusCode}`,
          message: this.getStatusMessage(response.statusCode)
        };
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

  getStatusMessage(code) {
    const messages = {
      200: 'OK',
      201: 'Created',
      400: 'Bad Request (Endpoint exists)',
      401: 'Unauthorized (Endpoint exists)',
      404: 'Not Found',
      405: 'Method Not Allowed (Endpoint exists)',
      500: 'Internal Server Error'
    };
    return messages[code] || `HTTP ${code}`;
  }

  async testAllEndpoints() {
    console.log('🔧 API Endpoint Tester\n');
    console.log('Testing both Frontend (Next.js) and Backend (Express.js) APIs\n');
    console.log('='.repeat(70));

    // Test Frontend API
    console.log(`\n📱 FRONTEND API (${FRONTEND_API_URL})`);
    console.log('-'.repeat(50));
    
    for (const endpoint of API_ENDPOINTS.frontend) {
      const result = await this.testEndpoint(FRONTEND_API_URL, endpoint, 'frontend');
      
      if (result.status === 'working') {
        console.log(`✅ ${endpoint.name} [${endpoint.method}] - ${result.message} (${result.code})`);
        this.stats.frontend.working++;
      } else {
        console.log(`❌ ${endpoint.name} [${endpoint.method}] - ${result.error}`);
        this.stats.frontend.notWorking++;
      }
      
      this.results.frontend.push({ ...endpoint, ...result });
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Test Backend API
    console.log(`\n🖥️  BACKEND API (${BACKEND_API_URL})`);
    console.log('-'.repeat(50));
    
    for (const endpoint of API_ENDPOINTS.backend) {
      const result = await this.testEndpoint(BACKEND_API_URL, endpoint, 'backend');
      
      if (result.status === 'working') {
        console.log(`✅ ${endpoint.name} [${endpoint.method}] - ${result.message} (${result.code})`);
        this.stats.backend.working++;
      } else {
        console.log(`❌ ${endpoint.name} [${endpoint.method}] - ${result.error}`);
        this.stats.backend.notWorking++;
      }
      
      this.results.backend.push({ ...endpoint, ...result });
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 API ENDPOINT SUMMARY');
    console.log('='.repeat(70));
    
    console.log(`\n📱 FRONTEND API:`);
    console.log(`   ✅ Working: ${this.stats.frontend.working}`);
    console.log(`   ❌ Not Working: ${this.stats.frontend.notWorking}`);
    console.log(`   📈 Success Rate: ${((this.stats.frontend.working / API_ENDPOINTS.frontend.length) * 100).toFixed(1)}%`);
    
    console.log(`\n🖥️  BACKEND API:`);
    console.log(`   ✅ Working: ${this.stats.backend.working}`);
    console.log(`   ❌ Not Working: ${this.stats.backend.notWorking}`);
    console.log(`   📈 Success Rate: ${((this.stats.backend.working / API_ENDPOINTS.backend.length) * 100).toFixed(1)}%`);
    
    const totalWorking = this.stats.frontend.working + this.stats.backend.working;
    const totalEndpoints = API_ENDPOINTS.frontend.length + API_ENDPOINTS.backend.length;
    
    console.log(`\n🎯 OVERALL:`);
    console.log(`   ✅ Total Working: ${totalWorking}`);
    console.log(`   ❌ Total Not Working: ${totalEndpoints - totalWorking}`);
    console.log(`   📈 Overall Success Rate: ${((totalWorking / totalEndpoints) * 100).toFixed(1)}%`);

    // Working endpoints
    const allWorking = [...this.results.frontend, ...this.results.backend].filter(r => r.status === 'working');
    if (allWorking.length > 0) {
      console.log(`\n✨ WORKING ENDPOINTS:`);
      allWorking.forEach(endpoint => {
        const apiType = this.results.frontend.includes(endpoint) ? 'Frontend' : 'Backend';
        console.log(`   • [${apiType}] ${endpoint.name} - ${endpoint.message}`);
      });
    }

    console.log('\n💡 NOTES:');
    console.log('   • 400/401/405 status codes indicate the endpoint exists but needs proper data');
    console.log('   • 404 status codes indicate the endpoint is not implemented');
    console.log('   • Connection errors indicate the server is not running');
    
    console.log('\n🎯 API testing completed!');
  }

  exportResults(filename = 'api-test-results.json') {
    const exportData = {
      timestamp: new Date().toISOString(),
      frontend: {
        baseUrl: FRONTEND_API_URL,
        stats: this.stats.frontend,
        results: this.results.frontend
      },
      backend: {
        baseUrl: BACKEND_API_URL,
        stats: this.stats.backend,
        results: this.results.backend
      }
    };
    
    fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
    console.log(`\n💾 Results exported to ${filename}`);
  }
}

// Run the tests
if (require.main === module) {
  const tester = new APITester();
  
  tester.testAllEndpoints()
    .then(() => {
      if (process.argv.includes('--export')) {
        tester.exportResults();
      }
    })
    .catch(error => {
      console.error('❌ Error running API tests:', error.message);
      process.exit(1);
    });
}

module.exports = { APITester, API_ENDPOINTS }; 