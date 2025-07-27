@echo off
echo === GitHub & Netlify Update ===
echo Starting update process...
powershell -ExecutionPolicy Bypass -File "%~dp0github-update-new.ps1"
pause 