import { Provider } from 'react-redux'
import React from 'react'
import reactDOM from 'react-dom'

import './css/styles.css'

import config from './config'
import createStore from './createStore'
import getInitialState from './getInitialState'
import AuctionStatus from './providers/AuctionStatus'

import AuctionPanel from './components/AuctionPanel'
import HomePageContent from './components/HomePageContent'
import AppsDownloadButton from './components/AppsDownloadButton'

const reduxDevtoolsOptions = { features: { dispatch: true } }

const store = createStore(reduxDevtoolsOptions, getInitialState(config))

function getAppContent (content) {
  switch (content) {
    case 'home':
      return <HomePageContent />
    case 'apps':
      return <AppsDownloadButton />
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
    // eslint-disable-next-line no-undef
    $('#auctions-menu-item').show()
  }
})
