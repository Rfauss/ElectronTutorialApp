const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')


//This function loads the "Web page" into the new browser window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    ipcMain.handle('ping', () => 'pong')
    //this is the file it loads
    win.loadFile('index.html')
}

// listens for when app is ready and creates a window using createwindow function
app.whenReady().then(() => {
    createWindow()
    //following code ensures that when an application starts on macOs that it opens a window
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//This ensures that closing the last window on win32 platform closes the application
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

