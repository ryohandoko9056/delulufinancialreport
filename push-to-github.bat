@echo off
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"
echo ========================================================
echo  Pushing Delulu Budget Tracker to GitHub
echo  Repository: https://github.com/ryohandoko9056/delulufinancialreport.git
echo ========================================================
echo.
git push -u origin main
echo.
echo ========================================================
echo  Done!
echo ========================================================
pause
