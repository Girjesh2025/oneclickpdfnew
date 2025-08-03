@echo off
echo 🚀 Starting OneClickPDF Development Environment

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node -v

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

REM Create environment file if it doesn't exist
if not exist "backend\.env" (
    echo ⚙️ Creating environment file...
    copy "backend\.env.example" "backend\.env"
    echo 📝 Please edit backend\.env with your configuration
)

REM Create necessary directories
if not exist "backend\uploads" mkdir "backend\uploads"
if not exist "backend\output" mkdir "backend\output"

echo ✅ Setup complete!
echo.
echo 🌐 Starting development servers...
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start both frontend and backend
npm run dev

pause 