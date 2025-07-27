@echo off
title Site Updater
echo === GitHub ^& Netlify Site Update ===
echo Starting update process...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0github-update-new.ps1"
echo.
echo Process completed. Check for errors above.
pause 