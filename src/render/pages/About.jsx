import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function About() {
  const app = useSelector(state => state.app)
  const dispatch = useDispatch()
  
  const change = () => {
    dispatch({
      type: "app/increment",
      payload: 20
    })
  }
  return (
    <h1 onClick={change}>About{app.age}</h1>
  )
}

export default About