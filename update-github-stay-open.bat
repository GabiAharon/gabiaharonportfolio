@echo off
echo === GitHub Portfolio Update ===
echo This window will stay open until you press Enter
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0update-github.ps1"
echo.
echo.
echo Process completed. Press Enter to close this window...
pause > nul 