const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const fs = require('fs');

const webContentFolderPath = '..\\website\\Resources';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
var contents = {};

function startManager() {
  fs.readdir(webContentFolderPath, function (err, fileNames) {
    if (err) {
      console.log(err);
    }
    for (i = 0; i < fileNames.length; i++) {
      let index = i;
      fs.readFile(path.join(webContentFolderPath, fileNames[index]), function (err, file) {
        if (err) {
          console.log(err);
        }
        contents[fileNames[index].substring(0, fileNames[index].length - 5)] = JSON.parse(file.toString());
        if (index === fileNames.length - 1) {
          createWindow();
        }
      });
    }
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 300,
    minHeight: 200
  })
  // un-comment this if you like to keep the same aspect ratio when
  // mainWindow.setAspectRatio(1.3)
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    
  }))
  mainWindow.contents = contents;
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startManager)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
