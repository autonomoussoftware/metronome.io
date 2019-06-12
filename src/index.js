import { Provider } from 'react-redux'
import reactDOM from 'react-dom'
import React from 'react'

import getInitialState from './get-initial-state'
import createStore from './create-store'
import analytics from './analytics'
import config from './config'

import MetronomeStatus from './providers/MetronomeStatus'
import WalletVersion from './providers/WalletVersion'
import WalletInfo from './providers/WalletInfo'
import Rates from './providers/Rates'

import DashboardPage from './components/dashboard/Dashboard'
import ChainWarning from './components/common/ChainWarning'
import AuctionPage from './components/auction/Auction'
import WalletPage from './components/wallet/Wallet'
import HomePage from './components/home/Home'

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
    showPanel: () => ({ type: 'SHOW_BUY_PANEL', payload: true })
  }
}

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent(content) {
  switch (content) {
    case 'home':
      return <HomePage />
    case 'dashboard':
      return <DashboardPage />
    case 'auction':
      return <AuctionPage />
    case 'wallet':
      return <WalletPage />
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
        <WalletInfo />
        <MetronomeStatus />
        <WalletVersion />
        <ChainWarning />
        <Rates />
        {getAppContent(rootContent)}
      </React.Fragment>
    </Provider>,
    rootElement
  )
}
