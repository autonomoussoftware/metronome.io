import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'

import AuctionPanel from './AuctionPanel'
import AuctionStatus from './AuctionStatus'

import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import AuctionsPage from './pages/AuctionsPage'
import FeaturesPage from './pages/FeaturesPage'
import MediaKitPage from './pages/MediaKitPage'

import PageHeader from './PageHeader'
import PageFooter from './PageFooter'

function App ({ isDailyAuction, showBuyPanel }) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <AuctionStatus />

        <PageHeader />

        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/features" component={FeaturesPage} />
          <Route exact path="/media-kit" component={MediaKitPage} />
          <Route component={ErrorPage} />
        </Switch>

        {isDailyAuction
          ? <Route exact path="/auctions" component={AuctionsPage}/>
          : null}

        <PageFooter />

        <AuctionPanel showBuyPanelEdit={showBuyPanel} />
      </React.Fragment>
    </BrowserRouter>
  )
}

function mapStateToProps (state) {
  return {
    isDailyAuction: state.auction.status.isDailyAuction,
    showBuyPanel: state.buyPanel.show
  }
}

export default connect(mapStateToProps)(App)
