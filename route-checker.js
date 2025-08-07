#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { URL } = require('url');

/**
 * Route Checker - Universal tool for testing web application routes
 * Usage: node route-checker.js [base-url] [config-file]
 */

// Default configuration
const DEFAULT_CONFIG = {
  baseUrl: 'http://localhost:3001',
  timeout: 5000,
  retries: 1,
  delay: 200,
  routes: [
    { name: 'Home Page', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Contact', route: '/contact' }
  ]
};

// PDF Tools configuration for OneClickPDF
const PDF_TOOLS_CONFIG = {
  baseUrl: 'http://localhost:3001',
  timeout: 5000,
  retries: 1,
  delay: 200,
  routes: [
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
  ]
};

class RouteChecker {
  constructor(config = PDF_TOOLS_CONFIG) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.results = [];
    this.stats = { working: 0, notWorking: 0, total: 0 };
  }

  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        timeout: this.config.timeout,
        headers: {
          'User-Agent': 'RouteChecker/1.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
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

      req.end();
    });
  }

  async testRoute(tool, attempt = 1) {
    const url = `${this.config.baseUrl}${tool.route}`;
    
    try {
      const response = await this.makeRequest(url);
      
      if (response.statusCode >= 200 && response.statusCode < 400) {
        return { 
          status: 'working', 
          code: response.statusCode,
          contentType: response.contentType.split(';')[0],
          attempt
        };
      } else {
        return { 
          status: 'not-working', 
          code: response.statusCode, 
          error: `HTTP ${response.statusCode}`,
          attempt
        };
      }
    } catch (error) {
      if (attempt < this.config.retries) {
        // Retry the request
        await new Promise(resolve => setTimeout(resolve, this.config.delay * 2));
        return this.testRoute(tool, attempt + 1);
      }
      
      if (error.code === 'ECONNREFUSED') {
        return { status: 'not-working', error: 'Connection refused - Server not running', attempt };
      } else if (error.message === 'Request timeout') {
        return { status: 'not-working', error: 'Timeout', attempt };
      } else {
        return { status: 'not-working', error: error.message, attempt };
      }
    }
  }

  async checkAllRoutes() {
    console.log('🔍 Universal Route Checker\n');
    console.log(`📍 Base URL: ${this.config.baseUrl}`);
    console.log(`⏱️  Timeout: ${this.config.timeout}ms`);
    console.log(`🔄 Retries: ${this.config.retries}`);
    console.log(`📊 Total Routes: ${this.config.routes.length}\n`);
    console.log('='.repeat(60));
    
    this.results = [];
    this.stats = { working: 0, notWorking: 0, total: this.config.routes.length };
    
    for (let i = 0; i < this.config.routes.length; i++) {
      const tool = this.config.routes[i];
      
      const result = await this.testRoute(tool);
      
      if (result.status === 'working') {
        const contentInfo = result.contentType ? ` [${result.contentType}]` : '';
        console.log(`✅ ${tool.name} - Working (${result.code})${contentInfo}`);
        this.stats.working++;
      } else {
        const retryInfo = result.attempt > 1 ? ` (${result.attempt} attempts)` : '';
        console.log(`❌ ${tool.name} - Not Working (${result.error})${retryInfo}`);
        this.stats.notWorking++;
      }
      
      this.results.push({
        ...tool,
        ...result
      });
      
      // Delay between requests
      if (i < this.config.routes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, this.config.delay));
      }
    }
    
    this.printSummary();
    return this.results;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY REPORT');
    console.log('='.repeat(60));
    console.log(`✅ Working Routes: ${this.stats.working}`);
    console.log(`❌ Failed Routes: ${this.stats.notWorking}`);
    console.log(`📈 Success Rate: ${((this.stats.working / this.stats.total) * 100).toFixed(1)}%`);
    
    if (this.stats.notWorking > 0) {
      console.log('\n🔍 FAILED ROUTES:');
      this.results
        .filter(r => r.status === 'not-working')
        .forEach(route => {
          console.log(`   • ${route.name} (${route.route}): ${route.error}`);
        });
      
      console.log('\n💡 TROUBLESHOOTING TIPS:');
      console.log('   • Verify server is running and accessible');
      console.log('   • Check if routes are properly configured');
      console.log('   • Some routes might need specific parameters');
      console.log('   • Consider implementing missing routes');
    }
    
    if (this.stats.working > 0) {
      console.log('\n✨ WORKING ROUTES:');
      this.results
        .filter(r => r.status === 'working')
        .forEach(route => {
          console.log(`   • ${route.name} (${route.route}): HTTP ${route.code}`);
        });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 Route checking completed!');
  }

  // Export results to JSON
  exportResults(filename = 'route-check-results.json') {
    const fs = require('fs');
    const exportData = {
      timestamp: new Date().toISOString(),
      config: this.config,
      stats: this.stats,
      results: this.results
    };
    
    fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
    console.log(`\n💾 Results exported to ${filename}`);
  }
}

// Command line interface
function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0];
  const configFile = args[1];
  
  let config = PDF_TOOLS_CONFIG;
  
  // Override base URL if provided
  if (baseUrl) {
    config = { ...config, baseUrl };
  }
  
  // Load custom config if provided
  if (configFile) {
    try {
      const fs = require('fs');
      const customConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      config = { ...config, ...customConfig };
    } catch (error) {
      console.error(`❌ Error loading config file: ${error.message}`);
      process.exit(1);
    }
  }
  
  const checker = new RouteChecker(config);
  
  checker.checkAllRoutes()
    .then((results) => {
      // Optionally export results
      if (args.includes('--export')) {
        checker.exportResults();
      }
    })
    .catch(error => {
      console.error('❌ Error running route check:', error.message);
      process.exit(1);
    });
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { RouteChecker, PDF_TOOLS_CONFIG, DEFAULT_CONFIG }; 