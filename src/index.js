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

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
