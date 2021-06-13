import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import About from './render/pages/About'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './modal'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Route path="/" exact component={App} />
        <Route path="/about" exact component={About} />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
