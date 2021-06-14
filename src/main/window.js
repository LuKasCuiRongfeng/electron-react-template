const { BrowserWindow, dialog } = require('electron')

// 创建新窗口时的默认配置
const defaultWinOpts = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    // 这个东西必须显式地置为false，才能在渲染进程里用require
    // 搞笑的是默认就是false，但不显式地说明，还是会报错
    contextIsolation: false
  }
}

// 本来可以在渲染进程里用remote.BrowserWindow来处理窗口
// 但是主进程和渲染进程的global不通用，如果不用global来
// 存主窗口，可以考虑就在渲染进程里处理窗口，我这里是在
// 主进程里用global.wins保存创建的窗口，所以就干脆窗口全部
// 在主进程里创建
/**
 * 
 * @param {string} key 
 * @param {string} type -操作类型，包括`open新建close关闭`
 * @param {{}} opts -窗口选项
 */
function toggleWin(key, type, opts) {
  let win = global.wins[key]
  switch (type) {
    case "open":
      if (win) {
        // 已经打开的窗口重新获得焦点
        win.focus()
      } else {
        win = new BrowserWindow({ ...defaultWinOpts, ...opts })
        win.loadURL(`${global.baseUrl}/${key}`)
        win.webContents.openDevTools()
        // 保存在global.wins里
        global.wins[key] = win
        win.on("closed", () => {
          // 必须监听这个事件，只有当真正关闭后才置为null
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

function sendMsg(key, action) {
  let win = global.wins[key]
  if (win) {
    win.webContents.send("send-msg", action)
  }
}

module.exports = {
  toggleWin,
  sendMsg
}