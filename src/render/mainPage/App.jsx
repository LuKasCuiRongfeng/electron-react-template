import React, { useState, useEffect } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWin, sendMsg } from '../utils/api'

function App() {
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  const newWin = () => {
    toggleWin("about", "open")
  }
  const changeState = () => {
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
      <button onClick={newWin}>new WIN</button>
      <button onClick={changeState}>redux</button>
      <button onClick={doSendMsg}>sendMsg</button>
    </div>
  )
}

export default App
