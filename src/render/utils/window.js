// const remote = require('electron').remote
// const { BrowserWindow } = remote
const { ipcRenderer } = require('electron')
import store from '../../modal'

// const defaultWinOpts = {
//   width: 1024,
//   height: 768,
//   webPreferences: {
//     nodeIntegration: true,
//     enableRemoteModule: true,
//     contextIsolation: false
//   }
// }

function toogleWin(key = "", type = "open",  opts) {
  // let win = new BrowserWindow({...defaultWinOpts, ...opts})
  // win.loadURL(`http://localhost:3000/#/${key}`)
  // console.log(global.wins)
  // win.webContents.openDevTools()
  // return win 
  ipcRenderer.send("toogleWin", { key, type, opts })
}

function sendMsg(key = "", data) {
  ipcRenderer.send("send-msg", { key, data })
}

ipcRenderer.on("send-msg", (e, arg) => {
  store.dispatch(arg)
})

export {
  toogleWin,
  sendMsg
}
