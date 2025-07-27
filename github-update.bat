@echo off
echo.
echo ========================================
echo    Gabi Aharon Portfolio Updater
echo ========================================
echo.
echo This script will update your portfolio to GitHub
echo Make sure you have your changes ready!
echo.
pause

powershell -ExecutionPolicy Bypass -File "%~dp0github-update.ps1"

echo.
echo ========================================
echo Process completed!
echo ========================================
pause 