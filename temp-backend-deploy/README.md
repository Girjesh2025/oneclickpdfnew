# OneClickPDF Backend

Professional PDF processing API backend for OneClickPDF application.

## 🚀 Features

- **25+ PDF Tools**: Merge, Split, Compress, Convert, and more
- **File Conversion**: PDF ↔ Word, Excel, PowerPoint, Images
- **AI Features**: OCR, Translation, Summarization
- **Express.js API**: RESTful endpoints
- **File Upload**: Secure file handling with Multer
- **CORS Enabled**: Ready for frontend integration

## 🛠️ Tech Stack

- **Node.js** with Express.js
- **PDF-lib** for PDF manipulation
- **Sharp** for image processing
- **Multer** for file uploads
- **Mammoth** for Word document processing
- **XLSX** for Excel processing

## 🚀 Deployment

### Railway Deployment

1. **Connect to Railway**: [railway.app](https://railway.app)
2. **Deploy from GitHub**: Connect this repository
3. **Environment Variables**: Set production environment
4. **Auto Deploy**: Push to main branch to deploy

### Environment Variables

```bash
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
MAX_FILE_SIZE=100MB
```

## 📱 API Endpoints

- `POST /api/process` - Process PDF files
- `GET /api/health` - Health check
- `GET /api/tools` - Available tools

## 🔗 Frontend

- Repository: [oneclickpdf-frontend](https://github.com/Girjesh2025/oneclickpdf-frontend)
- Live Demo: [Coming Soon]

---

Built with ❤️ for professional PDF processing 