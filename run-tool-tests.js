const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5001/api/process';
const TEST_FILE_PATH = path.join(__dirname, 'test.pdf');

// Helper to read stream to string for error logging
async function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}

async function testTool(toolName) {
  console.log(`\n--- Testing tool: ${toolName} ---`);

  if (!fs.existsSync(TEST_FILE_PATH)) {
    console.error(`Error: Test file not found at ${TEST_FILE_PATH}`);
    return;
  }

  const form = new FormData();
  form.append('files', fs.createReadStream(TEST_FILE_PATH));
  form.append('tool', toolName);

  try {
    const response = await axios.post(API_URL, form, {
      headers: {
        ...form.getHeaders(),
      },
      responseType: 'stream',
    });

    if (response.status === 200) {
      console.log(`✅ SUCCESS: Tool '${toolName}' processed the file successfully.`);
      const extension = toolName.includes('word') ? 'docx' : 'xlsx';
      const outputFileName = `test-output-${toolName}.${extension}`;
      const writer = fs.createWriteStream(outputFileName);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          console.log(`📝 Output saved to ${outputFileName}`);
          resolve(true);
        });
        writer.on('error', (err) => {
            console.error(`❌ FAILURE: Could not write output file for ${toolName}.`, err);
            reject(false);
        });
      });
    } else {
      console.error(`❌ FAILURE: Tool '${toolName}' failed with status code: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ FAILURE: Request for tool '${toolName}' failed.`);
    if (error.response) {
      console.error('Error status:', error.response.status);
      const errorData = await streamToString(error.response.data);
      console.error('Error response:', errorData);
    } else if (error.request) {
      console.error('Error: No response received. Is the backend server running on port 5000?');
    } else {
      console.error('Error message:', error.message);
    }
    return false;
  }
}

async function runTests() {
  console.log('Starting OneClickPDF tool tests...');
  console.log('==================================');

  const results = {};
  results['pdf-to-word'] = await testTool('pdf-to-word');
  results['pdf-to-excel'] = await testTool('pdf-to-excel');
  
  console.log('\n==================================');
  console.log('Test Summary:');
  for (const [tool, success] of Object.entries(results)) {
    console.log(`- ${tool}: ${success ? '✅ PASSED' : '❌ FAILED'}`);
  }
  console.log('==================================\n');

  if (Object.values(results).every(Boolean)) {
    console.log('All tests passed!');
  } else {
    console.log('Some tests failed. Please review the logs above.');
  }
}

runTests();
