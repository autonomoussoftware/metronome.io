import { Provider } from 'react-redux'
import React from 'react'
import reactDOM from 'react-dom'

import './css/styles.css'

import config from './config'
import createStore from './create-store'
import getInitialState from './get-initial-state'

import AuctionStatus from './providers/AuctionStatus'

import AuctionPage from './components/pages/AuctionPage'
import DashboardPage from './components/pages/DashboardPage'
import HomePage from './components/pages/HomePage'

import AppsDownloadButton from './components/AppsDownloadButton'
import AuctionPanel from './components/AuctionPanel'

const reduxDevtoolsOptions = { features: { dispatch: true } }

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent (content) {
  switch (content) {
    case 'home':
      return <HomePage />
    case 'apps':
      return <AppsDownloadButton />
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

store.subscribe(function () {
  if (store.getState().auction.status.isDailyAuction) {
    // As the header items are outside React scope, use jQuery to show the
    // Auction page link once the daily auctions have started

    // eslint-disable-next-line no-undef
    $('#auctions-menu-item').show()
  }
})
