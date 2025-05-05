const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadURL('http://localhost:5173')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 👇 handlers pour ouvrir/lire/sauvegarder des fichiers .txt
ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (result.canceled) return []

  const folder = result.filePaths[0]
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.txt'))

  return files.map(file => ({
    name: file,
    path: path.join(folder, file)
  }))
})

ipcMain.handle('read-file', (_, filePath) => {
  return fs.readFileSync(filePath, 'utf-8')
})

ipcMain.handle('save-file', (_, { filePath, content }) => {
  fs.writeFileSync(filePath, content, 'utf-8')
})
