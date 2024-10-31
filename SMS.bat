@echo off

REM Upgrade pip to the latest version
echo Upgrading pip...
python -m pip install --upgrade pip || (echo Failed to upgrade pip. & pause & exit /b)

REM Check if Python is installed
echo Checking for Python installation...
python --version >nul 2>&1 || (
    echo Python is not installed. Please install Python from https://www.python.org/downloads/ and try again.
    pause
    exit /b
)

REM Navigate to the directory of the script
cd "%~dp0" || (echo Failed to navigate to script directory. & pause & exit /b)

REM Change to Django project directory
cd "myproject" || (echo Failed to navigate to the Django project directory. & pause & exit /b)

REM Check if manage.py exists
if not exist "manage.py" (
    echo manage.py not found in the specified directory: "%cd%"
    pause
    exit /b
)

REM Run Django migrations to set up the database
echo Running Django migrations...
python manage.py migrate || (echo Failed to apply migrations. & pause & exit /b)

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

REM Start Electron app
start cmd /k "npm start"
