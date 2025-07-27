@echo off
echo === GitHub & Netlify Portfolio Update ===
echo Starting update process...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0github-update-new.ps1"
echo.
echo Process completed.
pause 