@echo off
title Project Updater
echo === עדכון פרויקטים אוטומטי ===
echo.
echo שלב 1: מעתיק נתונים מהדפדפן לקבצים מקומיים...

:: יצירת סקריפט JavaScript זמני
echo var fs = require('fs'); > temp_script.js
echo var path = require('path'); >> temp_script.js
echo var localStorageData = localStorage.getItem('projectsData'); >> temp_script.js
echo if (localStorageData) { >> temp_script.js
echo   var projectsData = JSON.parse(localStorageData); >> temp_script.js
echo   var jsonData = JSON.stringify(projectsData, null, 2); >> temp_script.js
echo   fs.writeFileSync(path.join(__dirname, 'data/projects-data.json'), jsonData, 'utf8'); >> temp_script.js
echo   fs.writeFileSync(path.join(__dirname, 'public/data/projects-data.json'), jsonData, 'utf8'); >> temp_script.js
echo   console.log('הנתונים נשמרו בהצלחה לקבצים המקומיים'); >> temp_script.js
echo } else { >> temp_script.js
echo   console.log('לא נמצאו נתונים ב-localStorage'); >> temp_script.js
echo } >> temp_script.js

echo.
echo שלב 2: מפעיל את סקריפט העדכון...
echo.

:: הפעלת site-updater.bat
call site-updater.bat

:: ניקוי קבצים זמניים
del temp_script.js

echo.
echo === העדכון הושלם ===
pause 