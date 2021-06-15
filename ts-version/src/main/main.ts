import { ipcMain, toggleWin, sendMsg, app, BrowserWindow } from './window'
import { config } from 'dotenv'
import { join } from 'path'

config()

const baseUrl = app.isPackaged
    ? join(__dirname, "../render/index.html#")
    : `http://localhost:${process.env.PORT}/#`

global.baseUrl = baseUrl

app.whenReady().then(() => toggleWin("main", "open"))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        toggleWin("main", "open")
    }
})

ipcMain.on("toggleWin", (e, arg) => {
    const { key = "", type = "open", opts = {} } = arg
    toggleWin(key, type, opts)
})

ipcMain.on("send-msg", (e, data) => {
    const { key, action } = data
    sendMsg(key, action)
})