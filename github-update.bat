@echo off
echo GitHub Update Process Started...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0github-update.ps1"
echo.
echo Process completed! This window will close in 10 seconds.
timeout /t 10 