const electron = require('electron')
const { ipcRenderer } = electron
import store from '../../modal'

// 监听窗口间传值
ipcRenderer.on("send-msg", (e, action) => {
  // 更改对应页面自己`独立保留`的状态
  store.dispatch(action)
})

/**
 * 该方法可以从一个窗口更改另一个窗口的状态数据
 * 本来每个窗口的状态数据是独立的，尽管都可以访问
 * 状态数据的初始值，但是每个窗口都`独立`保留了初始状态数据
 * 的副本，该方法需要找到自己对应的窗口
 * @param {string} key -页面路由名，页面本质是路由
 * @param {{type: string, payload: any}} action -对应store里的action
 */
function sendMsg(key, action) {
  ipcRenderer.send("send-msg", { key, action })
}

/**
 * 处理窗口
 * @param {string} key -页面
 * @param {string} type -类型open or close
 * @param {{}} opts -窗口参数
 */
function toggleWin(key, type,  opts) {
  ipcRenderer.send("toggleWin", { key, type, opts })
}


export {
  sendMsg,
  toggleWin,
}