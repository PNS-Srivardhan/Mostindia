const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');

// Function to check if the server is running
function checkServer(callback) {
    console.log('Checking if server is up...');
    http.get('http://127.0.0.1:8080', (res) => {
        console.log('Server is up!');
        callback(true);
    }).on('error', (err) => {
        console.log('Server not available, retrying...');
        callback(false);
    });
}

// Retry logic for loading the URL
function loadWindow(win) {
    checkServer((serverUp) => {
        if (serverUp) {
            console.log('Loading URL: http://127.0.0.1:8080');
            win.loadURL('http://127.0.0.1:8080');
        } else {
            console.log('Retrying to load the URL in 1 second...');
            setTimeout(() => loadWindow(win), 1000); // Retry every 1 second
        }
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    loadWindow(win);  // Start retrying to load the URL
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
