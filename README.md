# OneClickPDF - Professional PDF Processing Tool

🚀 A modern, professional web application for all your PDF processing needs. Built with React/Next.js frontend and Node.js/Express backend.

## ✨ Features

### Core PDF Operations
- **Merge PDF** - Combine multiple PDF files into one document
- **Split PDF** - Extract individual pages from PDF documents
- **Compress PDF** - Reduce file size while maintaining quality
- **Rotate PDF** - Adjust page orientation
- **Add Watermark** - Brand your documents with text watermarks
- **Password Protection** - Secure your PDFs (basic implementation)

### Conversion Tools
- **PDF to Images** - Convert PDF pages to high-quality JPG/PNG images
- **Images to PDF** - Create PDF documents from image files
- **Office to PDF** - Convert Word, Excel, PowerPoint to PDF
- **PDF to Office** - Extract content from PDFs (text extraction)

### AI-Powered Features (Optional)
- **OCR Processing** - Extract text from scanned PDFs and images
- **AI Summarization** - Generate intelligent summaries of PDF content
- **Translation** - Translate PDF content to different languages

### User Experience
- **Drag & Drop Upload** - Intuitive file uploading
- **Real-time Progress** - Track processing status
- **Multi-language Support** - Available in 10+ languages
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Secure Processing** - Files are automatically deleted after processing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Dropzone** - Drag and drop file uploads
- **React i18next** - Internationalization
- **Axios** - HTTP client
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Multer** - File upload handling
- **pdf-lib** - PDF manipulation
- **Sharp** - Image processing
- **Tesseract.js** - OCR capabilities
- **OpenAI API** - AI features (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oneclickpdf
   ```

2. **Install dependencies for all projects**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

This will start:
- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:5000`

### Manual Setup

If you prefer to start each service manually:

1. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

## 📁 Project Structure

```
oneclickpdf/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   ├── components/          # Reusable React components
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── services/           # Business logic services
│   │   ├── pdfProcessor.js # PDF operations
│   │   ├── imageProcessor.js # Image processing
│   │   ├── convertProcessor.js # File conversions
│   │   └── aiProcessor.js  # AI features
│   ├── uploads/           # Temporary file storage
│   ├── output/            # Processed files
│   └── server.js          # Main server file
└── package.json           # Root package file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here  # Optional for AI features
```

### File Limits
- Maximum file size: 100MB
- Maximum files per request: 10
- Supported formats: PDF, JPG, PNG, DOCX, XLSX, PPTX

## 🌍 Multi-language Support

The application supports multiple languages:
- English 🇺🇸
- Spanish 🇪🇸  
- French 🇫🇷
- German 🇩🇪
- Italian 🇮🇹
- Portuguese 🇵🇹
- Chinese 🇨🇳
- Japanese 🇯🇵
- Korean 🇰🇷
- Arabic 🇸🇦

## 🧪 API Endpoints

### Core Processing
- `POST /api/process` - Main file processing endpoint
- `GET /api/health` - Health check

### AI Features (Optional)
- `POST /api/ai/ocr` - OCR text extraction
- `POST /api/ai/summarize` - AI document summarization
- `POST /api/ai/translate` - Document translation

## 🔒 Security Features

- File type validation
- File size limits
- Rate limiting
- Automatic file cleanup
- CORS protection
- Helmet security headers

## 📱 Mobile Support

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🎨 Customization

### Theming
The application uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Fonts and typography
- Component styles in `globals.css`

### Adding New Features
1. Add new tools to `ToolGrid.tsx`
2. Implement processing logic in backend services
3. Update routing in `server.js`
4. Add translations to `I18nProvider.tsx`

## 🚀 Deployment

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start production server**
   ```bash
   cd backend
   npm start
   ```

### Environment Setup
- Set `NODE_ENV=production`
- Configure proper CORS origins
- Set up file storage (local or cloud)
- Configure SSL certificates
- Set up reverse proxy (nginx recommended)

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or static hosting
- **Backend**: Railway, Heroku, DigitalOcean, or VPS
- **Storage**: AWS S3, Google Cloud Storage, or local filesystem

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) - PDF creation and modification
- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR capabilities
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](issues) section
2. Create a new issue with detailed information
3. Email: support@oneclickpdf.com

---

**OneClickPDF** - Making PDF processing simple, fast, and professional. ⚡️ 