import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron'
const defaultWinOpts: BrowserWindowConstructorOptions = {
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

function toggleWin(key: string, type: "open" | "close", opts = defaultWinOpts) {
    let win = global.wins[key]
    switch (type) {
        case "open":
            if (win) {
                win.focus()
            } else {
                win = new BrowserWindow({ ...defaultWinOpts, ...opts })
                if (key === "main") {
                    win.loadURL(`${global.baseUrl}`)
                } else {
                    win.loadURL(`${global.baseUrl}${app.isPackaged ? key : '/' + key}`)
                }
                app.isPackaged && win.webContents.openDevTools()
                global.wins[key] = win
                win.on("closed", () => {
                    if (key === "main") {
                        if (process.platform !== 'darwin') {
                            app.quit()
                        }
                    } else {
                        global.wins[key] = null
                    }
                })
            }
            break;
        case "close":
            if (win) {
                win.close()
            }
    }
}

interface Action {
    type: string,
    payload: any
}

function sendMsg(key: string, action: Action) {
    let win = global.wins[key]
    win?.webContents.send("send-msg", action)
}

export {
    app,
    ipcMain,
    BrowserWindow,
    toggleWin,
    sendMsg,
    Action
}