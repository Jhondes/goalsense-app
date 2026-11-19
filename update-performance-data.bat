@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo      GOALSENSE PERFORMANCE DATA EXPORT
echo ==============================================
echo.

where py >nul 2>nul
if errorlevel 1 (
  echo Python 3 was not found on this computer.
  echo Install Python 3 from https://www.python.org/downloads/ and select "Add Python to PATH".
  echo Then run this file again.
  pause
  exit /b 1
)

py -3 -c "import openpyxl" >nul 2>nul
if errorlevel 1 (
  echo Installing the one-time Excel reader dependency...
  py -3 -m pip install -r requirements.txt
  if errorlevel 1 (
    echo.
    echo Could not install the required package. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Select your latest GoalSense Excel workbook in the file window.
echo.
py -3 scripts\export_performance.py %*
echo.
pause
