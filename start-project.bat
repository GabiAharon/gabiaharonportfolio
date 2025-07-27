@echo off
echo Starting Gabi Aharon Portfolio Development Server...
echo.

:: Kill any existing Node.js processes to prevent port conflicts
echo Stopping any running development servers...
taskkill /f /im node.exe >nul 2>&1

:: Clear Next.js cache if it exists
if exist ".next" (
    echo Clearing cache...
    rmdir /s /q .next >nul 2>&1
)

echo.
echo Starting fresh development server...
echo.

:: Start the development server
start /min cmd /c "npm run dev"

:: Wait longer for server to start
echo Waiting for server to initialize...
timeout /t 8 /nobreak >nul

:: Open browser
echo Opening browser at http://localhost:3000
start "" "http://localhost:3000"

echo.
echo =================================
echo  Development server is running!
echo  URL: http://localhost:3000
echo  Press Ctrl+C in the server window to stop
echo =================================
echo.
echo Press any key to close this window...
pause >nul 