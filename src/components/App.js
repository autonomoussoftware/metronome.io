import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import AuctionStatus from './AuctionStatus'
import AuctionsPage from './pages/AuctionsPage'
import FeaturesPage from './pages/FeaturesPage'
import MediaKitPage from './pages/MediaKitPage'
import HomePage from './pages/HomePage'

import PageHeader from './PageHeader'
import PageFooter from './PageFooter'

function App ({ isDailyAuction }) {
  return (
    <Router>
      <div>
        <AuctionStatus />
        <PageHeader />

        <Route exact path="/" component={HomePage}/>
        <Route exact path="/features" component={FeaturesPage} />
        <Route exact path="/media-kit" component={MediaKitPage} />

        {isDailyAuction
          ? <Route exact path="/auctions" component={AuctionsPage}/>
          : null}

        <PageFooter />
      </div>
    </Router>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

export default connect(mapStateToProps)(App)
