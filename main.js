
if (require('electron-squirrel-startup')) return;

const electron = require('electron'),
    app = electron.app,
    arch = process.arch,          // OS X(Mac): 'x64', Windows: 'x64'
    platform = process.platform,  // OS X(Mac): 'darwin', Windows: 'win32'
    BrowserWindow = electron.BrowserWindow,
    ipcMain = electron.ipcMain,
    // appVersion = app.getVersion();
    appVersion = require('./package.json').version;

console.log('app.getVersion():'+app.getVersion())

// Defines a function that creates a new window
let mainWindow
function createWindow () {
  // Generates a instance of "BrowserWindow"
  mainWindow = new BrowserWindow({width: 800, height: 600})
  // Displays "index.html"
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // Displays DevTools
  mainWindow.webContents.openDevTools()
  // Discards the object reference when closing the window
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Displays a new window when the app is ready to start
app.on('ready', createWindow)

// Terminates the app when all the window are closed
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

///////////////////////////
// autoUpdater starts here
const autoUpdater = require('electron').autoUpdater,
    dialog = require('electron').dialog

// Event: Emitted when there is an available update.
// The update is downloaded automatically.
autoUpdater.addListener("update-available", function(event) {
  console.log('update-available')
})

// Event: Emitted when an update has been downloaded.
// On Windows only releaseName is available.
autoUpdater.addListener("update-downloaded", function(
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateURL
) {
  console.log('update-downloaded')
  // Displays a dialog window to make sure that the app will be restarted soon after applying the update.
  buttons = ['Restart', 'Later']
  detail = releaseName + "\n\n" + releaseNotes
  confirm(`
A new version is available!
Version ${releaseName} is downloaded and will be automatically installed on Quit.
`, buttons, detail)
});

// Event: Emitted when there is an error while updating.
autoUpdater.addListener("error", function(error) {
  console.log(error)
  buttons = ['OK']
  // detail = error
  detail = ''
  confirm("Error occurred", buttons, detail)
});

// Event: Emitted when checking if an update has started.
autoUpdater.addListener("checking-for-update", function(event) {
  console.log('checking-for-update')
});

// Event: Emitted when there is no available update.
autoUpdater.addListener("update-not-available", function(event) {
  console.log('update-not-available')
  buttons = ['OK']
  detail = ""
  confirm("No update found", buttons, detail)
});

// Defines variables for updater endpoint.
var queries = '?version=' + appVersion
if (platform == 'win32') {
  console.log('platform: win32')
  var feedURL = 'https://win.example.com/updates/latest';
} else {
  console.log('platform: ' + platform)
  var feedURL = 'https://mac.example.com/updates/latest' + queries;
}
console.log(feedURL)

// Sets the feed url and initialize the auto updater.
autoUpdater.setFeedURL(feedURL);

function confirm(message, buttons, detail) {

  var index = dialog.showMessageBox(mainWindow, {
    type: 'info',
    buttons: buttons,
    message: message,
    detail: detail
  });

  if (buttons.length === 2) {
    //dialog.showErrorBox('String(index)', String(index))
    if (index !== 1) {
      console.log('run autoUpdater.quitAndInstall()')
      // Restarts the app and installs the update after it has been downloaded.
      autoUpdater.quitAndInstall();
    }
  }
}

// Asks the server whether there is an update.
autoUpdater.checkForUpdates();
