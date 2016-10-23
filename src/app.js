import './styles/main.styl'
import app from 'ampersand-app'
import React from 'react'
import {render} from 'react-dom'
import App from './AppContainer'

window.app = app // for debugging purposes

app.extend({
  init () {
    render(<App />, document.getElementById('root'))
  }
})

app.init()


