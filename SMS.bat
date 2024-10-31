@echo off
REM Navigate to the directory of the script
cd "%~dp0" || (echo Failed to navigate to script directory. & pause & exit /b)

REM Set Python installer URL (modify this to the correct version)
set PYTHON_INSTALLER_URL=https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe
set PYTHON_INSTALLER=python_installer.exe

REM Check if Python is installed
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python not found. Installing Python...
    
    REM Download Python installer
    powershell -command "Invoke-WebRequest -Uri %PYTHON_INSTALLER_URL% -OutFile %PYTHON_INSTALLER%"
    if not exist %PYTHON_INSTALLER% (
        echo Failed to download Python installer.
        pause
        exit /b
    )

    REM Install Python silently and add to PATH
    %PYTHON_INSTALLER% /quiet InstallAllUsers=1 PrependPath=1
    if ERRORLEVEL 1 (
        echo Python installation failed.
        pause
        exit /b
    )
    echo Python installed successfully.
)

REM Confirm Python is available in PATH
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python is still not available after installation. Ensure it is in the PATH and try again.
    pause
    exit /b
)

REM Install Python dependencies if not already installed
cd "myproject" || (echo Failed to navigate to the Django project directory. & pause & exit /b)

REM Check if manage.py exists
if not exist "manage.py" (
    echo manage.py not found in the specified directory: "%cd%"
    pause
    exit /b
)

REM Install Python dependencies from requirements.txt if not already installed
if exist "requirements.txt" (
    echo Checking and installing Python dependencies...
    pip install -r requirements.txt || (echo Failed to install Python dependencies. & pause & exit /b)
)

REM Start the Django server and log output
start cmd /k "python manage.py runserver 8080"

REM Wait for server to start
echo Waiting for Django server to start...
:waitLoop
    timeout /t 2 >nul
    (echo >nul | curl http://127.0.0.1:8080) && goto serverReady
    echo Server still not up. Retrying...
goto waitLoop

:serverReady
echo Django server is up. Starting Electron...

REM Change to Electron app directory
cd "%~dp0my-electron-app" || (echo Failed to navigate to the Electron app directory. & pause & exit /b)

REM Ensure npm is available
npm -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo Node.js and npm are required. Please install them and try again.
    pause
    exit /b
)

REM Install Electron app dependencies if not already installed
if not exist "node_modules" (
    echo Installing Electron app dependencies...
    npm install || (echo Failed to install Electron app dependencies. & pause & exit /b)
)

REM Start Electron app
start cmd /k "npm start"
