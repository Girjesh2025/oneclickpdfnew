# OneClickPDF - Professional PDF Tools Online

A modern, professional web application for PDF manipulation and conversion, similar to iLovePDF.com. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core PDF Tools
- **Merge PDF** - Combine multiple PDF files into one document
- **Split PDF** - Split large PDF files into smaller parts
- **Compress PDF** - Reduce PDF file size while maintaining quality
- **Rotate PDF** - Rotate PDF pages to correct orientation

### Conversion Tools
- **PDF to Word/Excel/PowerPoint** - Convert PDFs to editable documents
- **Word/Excel/PowerPoint to PDF** - Convert office documents to PDF
- **PDF to JPG** - Convert PDF pages to image files
- **JPG to PDF** - Create PDFs from image files
- **HTML to PDF** - Convert web pages to PDF

### Advanced Features
- **Edit PDF** - Add annotations, text, and modifications
- **Watermark PDF** - Add text or image watermarks
- **Password Protection** - Secure PDFs with passwords
- **Page Numbers** - Add page numbering to documents
- **Crop PDF** - Remove unwanted margins and content
- **Organize PDF** - Rearrange and manage PDF pages

### Security & AI Tools
- **Unlock PDF** - Remove passwords from protected PDFs
- **Sign PDF** - Add digital signatures
- **Redact PDF** - Hide sensitive information
- **OCR** - Extract text from scanned documents
- **Scan to PDF** - Convert images to searchable PDFs
- **PDF to PDF/A** - Convert to archival format

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Lucide React
- **Animations**: Framer Motion
- **File Handling**: React Dropzone
- **PDF Processing**: pdf-lib, pdf-parse
- **Image Processing**: Sharp
- **Notifications**: React Hot Toast

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Girjesh2025/oneclickpdf-frontend.git
   cd oneclickpdf-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── process/       # PDF processing endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── FileUpload.tsx    # File upload with drag & drop
│   ├── Footer.tsx        # Application footer
│   ├── Header.tsx        # Navigation header
│   ├── LanguageSelector.tsx # Multi-language support
│   ├── ProcessingModal.tsx # File processing UI
│   └── ToolGrid.tsx      # PDF tools grid
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🌟 Key Features

### User Experience
- **Drag & Drop Upload** - Intuitive file upload experience
- **Real-time Progress** - Visual feedback during processing
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Multi-language Support** - Interface available in multiple languages
- **Search Functionality** - Quickly find the right tool

### Performance
- **Fast Processing** - Optimized PDF manipulation
- **Large File Support** - Handle files up to 200MB
- **Efficient Memory Usage** - Smart resource management
- **Cached Results** - Quick access to processed files

### Security
- **Client-side Processing** - Files processed locally when possible
- **Automatic Cleanup** - Temporary files removed after processing
- **No Data Storage** - Files not permanently stored on servers
- **Secure Uploads** - Encrypted file transmission

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by iLovePDF.com
- Built with modern web technologies
- Thanks to the open source community

## 📞 Support

For support, email support@oneclickpdf.com or create an issue on GitHub.

---

**Made with ❤️ by Girjesh** # Force deployment trigger
# Trigger deployment with new root directory
