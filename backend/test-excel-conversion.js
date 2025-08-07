const fs = require('fs')
const path = require('path')
const convertProcessor = require('./services/convertProcessor')

async function testExcelConversion() {
  try {
    console.log('🧪 Testing Excel to PDF conversion...')
    
    // Create a simple test Excel file
    const XLSX = require('xlsx')
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Name', 'Age', 'City'],
      ['John Doe', 30, 'New York'],
      ['Jane Smith', 25, 'Los Angeles'],
      ['Bob Johnson', 35, 'Chicago']
    ])
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TestSheet')
    
    const testFilePath = path.join(__dirname, 'test-excel.xlsx')
    XLSX.writeFile(workbook, testFilePath)
    
    console.log('✅ Test Excel file created:', testFilePath)
    
    // Mock file object like multer would create
    const mockFile = {
      path: testFilePath,
      originalname: 'test-excel.xlsx',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    
    const outputDir = path.join(__dirname, 'output')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    console.log('🔄 Converting Excel to PDF...')
    const result = await convertProcessor.convertOfficeToPDF(mockFile, outputDir)
    
    console.log('📊 Conversion result:', result)
    
    if (result.success) {
      console.log('✅ Conversion successful!')
      console.log('📄 Output file:', result.outputPath)
    } else {
      console.log('❌ Conversion failed:', result.error)
    }
    
    // Cleanup
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath)
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error('Stack trace:', error.stack)
  }
}

testExcelConversion()
