const { BrowserWindow, dialog } = require('electron')

const defaultWinOpts = {
  width: 1024,
  height: 768,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  }
}

function toogleWin(key, type, opts) {
  let win = global.wins[key]
  switch (type) {
    case "open":
      if (win) {
        win.focus()
      } else {
        win = new BrowserWindow({ ...defaultWinOpts, ...opts })
        win.loadURL(`${global.baseUrl}/${key}`)
        win.webContents.openDevTools()
        global.wins[key] = win
        win.on("closed", () => {
          global.wins[key] = null
        })
      }
      break;
    case "close":
      if (win) {
        win.close()
      } else {
        dialog.showErrorBox("error", "窗口不存在")
      }
  }
}

function sendMsg(key, data) {
  let win = global.wins[key]
  if (win) {
    win.webContents.send("send-msg", data)
  }
}

module.exports = {
  toogleWin,
  sendMsg
}