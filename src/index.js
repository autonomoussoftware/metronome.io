import { Provider } from 'react-redux'
import React from 'react'
import reactDOM from 'react-dom'

import './css/styles.css'

import analytics from './analytics'
import config from './config'
import createStore from './create-store'
import getInitialState from './get-initial-state'

import AuctionStatus from './providers/AuctionStatus'

import AppsPage from './components/AppsPage'
import HomePage from './components/pages/HomePage'
import AuctionPage from './components/pages/AuctionPage'
import DashboardPage from './components/pages/DashboardPage'

import AuctionPanel from './components/AuctionPanel'

analytics.init()

if (module.hot) {
  module.hot.accept()
}

if (config.env === 'production' && window.Raven) {
  window.Raven.config(config.sentryDns).install()
  window.addEventListener('unhandledrejection', function (e) {
    window.Raven.captureException(e.reason)
  })
}

const reduxDevtoolsOptions = { features: { dispatch: true } }

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent (content) {
  switch (content) {
    case 'home':
      return <HomePage />
    case 'apps':
      return <AppsPage />
    case 'auction':
      return <AuctionPage />
    case 'dashboard':
      return <DashboardPage />
    default:
      return null
  }
}

const rootElement = document.getElementById('root')

if (rootElement) {
  const rootContent = rootElement.getAttribute('content')

  reactDOM.render(
    <Provider store={store}>
      <React.Fragment>
        <AuctionStatus />
        {getAppContent(rootContent)}
        <AuctionPanel/>
      </React.Fragment>
    </Provider>,
    rootElement
  )
}
