const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createTestPdf() {
  console.log('Creating a valid test PDF...');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 24;

  page.drawText('This is a valid PDF document for testing.', {
    x: 50,
    y: height - 4 * fontSize,
    font,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'test.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`✅ Successfully created test.pdf at ${outputPath}`);
}

createTestPdf();
