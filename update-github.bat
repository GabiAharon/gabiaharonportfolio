@echo off
echo Starting GitHub update process...
echo.
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0update-github.ps1" 