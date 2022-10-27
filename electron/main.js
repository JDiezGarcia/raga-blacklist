const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const gotTheLock = app.requestSingleInstanceLock();
let mainWindow

if (!gotTheLock) {
    if (mainWindow) {
        app.quit();
    }
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
        }
    });
    app.on('ready', createWindow);
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow()
        }
    });
}

async function createWindow() {
    try {
        app.server = await require(path.join(__dirname, '/raga-blacklist/build/index.js')).default;
    } catch {
        mainWindow = null;
        app.quit();
    }
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        useContentSize: true,
        icon: __dirname + '/favicon.ico',
    })
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.focus();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
