@echo off
title Site Updater
echo === GitHub ^& Netlify Site Update ===
echo.
echo ======================================
echo חשוב: לפני הפעלת הסקריפט
echo 1. ודא שהאתר פתוח בדפדפן (localhost:3000)
echo 2. ערוך את הפרויקטים כרצונך
echo 3. לחץ על כפתור "שמור שינויים" בדפדפן
echo ======================================
echo.
echo Starting update process...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0github-update-new.ps1"
echo.
echo Process completed. Check for errors above.
pause 