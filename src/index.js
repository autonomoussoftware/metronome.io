import { Provider } from 'react-redux'
import React from 'react'
import reactDOM from 'react-dom'

import './css/styles.css'
import App from './components/App'
import config from './config'
import createStore from './createStore'
import getInitialState from './getInitialState'

const reduxDevtoolsOptions = { features: { dispatch: true } }

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent (content) {
  switch (content) {
    case 'home':
      return <App />
    default:
      return null
  }
}

const rootElement = document.getElementById('root')

if (rootElement) {
  const rootContent = rootElement.getAttribute('content')

  reactDOM.render(
    <Provider store={store}>
      {getAppContent(rootContent)}
    </Provider>,
    rootElement
  )
}
