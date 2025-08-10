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

## Environment Variables

Create a `.env.local` file in the project root for local development (and configure the same in Vercel Project Settings for production). See `.env.example` for a template.

```bash
BACKEND_URL=http://localhost:5001
# Optional fallback
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

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

You can deploy the frontend (Next.js) on Vercel. The backend (Express) can run on any Node hosting (Render/Railway/Fly.io/VPS or Vercel if using a separate project with Node server).

### Vercel (Frontend)
1. Push your changes to GitHub.
2. Import the repo in Vercel.
3. Set Environment Variables (Project Settings → Environment Variables):
   - `BACKEND_URL` → e.g. `https://oneclickpdf-backend.yourdomain.com`
   - (Optional) `NEXT_PUBLIC_BACKEND_URL` → same as above for convenience
4. Build settings:
   - Framework: Next.js (detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Deploy.

This project forces the API route to run on Node.js and disables static caching for `/app/api/process`. If `BACKEND_URL` is not set, the route returns a clear error.

### Backend
Run the backend in `/backend` on a Node hosting provider and expose it over HTTPS. Ensure CORS allows your Vercel domain. Example environment:

```
PORT=5001
FRONTEND_URL=https://your-frontend.vercel.app
```

Point `BACKEND_URL` in Vercel to this backend’s public URL.
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
