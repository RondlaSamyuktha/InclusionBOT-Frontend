@echo off
echo Updating frontend files from main repository...

REM Copy files from parent directory
copy "..\InclusionBOT\index.html" .
copy "..\InclusionBOT\style.css" .
copy "..\InclusionBOT\script.js" .

echo Files updated successfully!
echo.
echo Now commit and push:
echo git add .
echo git commit -m "Fix: Add responsive CSS and relative paths"
echo git push origin main
echo.
pause