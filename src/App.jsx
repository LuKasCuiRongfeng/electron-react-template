import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
const remote = require('electron').remote
const { dialog } = remote
import { useHistory, HashRouter, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './modal/app'
import { toogleWin, sendMsg } from './render/utils/window'

function App() {
  const [count, setCount] = useState(0)
  const history = useHistory()
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  const openDia = () => {
    // dialog.showErrorBox("fuck you", "woring")
    // dialog.showOpenDialog({
    //   title: "hello",
    //   message: "xxxxxxx",
    //   properties: ["openFile", "multiSelections"]
    // }).then(res => {
    //   console.log(res)
    // })
    dialog.showMessageBox({
      type: "error",
      message: "fuck you",
      detail: "fdfsdfasdfad"
    }).then(res => {
      console.log(res)
    })
  }
  const newWin = () => {
    toogleWin("about", "open")
  }
  const doRedux = () => {
    dispatch({
      type: "app/increment",
      payload: 5
    })
  }
  const doSendMsg = () => {
    sendMsg("about", {
      type: "app/increment",
      payload: 56
    })
  }
  return (
    <div className="App">
      {/* <button onClick={createWin}>window</button> */}
      <button onClick={openDia}>dialog</button>
      <button onClick={newWin}>new WIN</button>
      <button onClick={doRedux}>redux</button>
      <button onClick={doSendMsg}>sendMsg</button>
    </div>
  )
}

function Fuck() {
  return <h1>fuck</h1>
}
function DoFuck() {
  return <h1>doFuck</h1>
}

export default App
