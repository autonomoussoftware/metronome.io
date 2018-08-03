import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import React from 'react'
import reactDOM from 'react-dom'

import './css/styles.css'

import analytics from './analytics'
import config from './config'
import createStore from './create-store'
import getInitialState from './get-initial-state'

import MetronomeStatus from './providers/MetronomeStatus'
import WalletVersion from './providers/WalletVersion'

import DashboardPage from './components/pages/DashboardPage'
import AuctionPage from './components/pages/AuctionPage'
import AppsPage from './components/pages/AppsPage'
import HomePage from './components/pages/HomePage'

import ConvertPanel from './components/ConvertPanel'
import ChainWarning from './components/ChainWarning'
import WalletInfo from './providers/WalletInfo'
import BuyPanel from './components/BuyPanel'
import Tooltips from './components/Tooltips'
import theme from './theme'

analytics.init()

if (module.hot) {
  module.hot.accept()
}

if (config.env === 'production' && window.Raven) {
  window.Raven.config(config.sentryDns).install()
  window.addEventListener('unhandledrejection', function(e) {
    window.Raven.captureException(e.reason)
  })
}

const reduxDevtoolsOptions = {
  features: { dispatch: true },
  actionCreators: {
    showPanel: (payload = true) => ({ type: 'SHOW_BUY_PANEL', payload })
  }
}

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent(content) {
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
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <WalletInfo />
          <MetronomeStatus />
          <WalletVersion />
          <ChainWarning />
          {getAppContent(rootContent)}
          <ConvertPanel />
          <BuyPanel />
          <Tooltips />
        </React.Fragment>
      </ThemeProvider>
    </Provider>,
    rootElement
  )
}
