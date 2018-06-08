import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import AuctionStatus from './AuctionStatus'
import AuctionsPage from './AuctionsPage'
import FeaturesPage from './FeaturesPage'
import MainPage from './MainPage'

import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

function App ({ currentAuction }) {
  const isDailyAuction = currentAuction > 0

  return (
    <Router>
      <div>
        <AuctionStatus />
        <MainHeader />

        <Route exact path="/" component={MainPage}/>
        <Route exact path="/features" component={FeaturesPage} />

        {isDailyAuction
          ? <Route exact path="/auction" component={AuctionsPage}/>
          : null}

        <MainFooter />
      </div>
    </Router>
  )
}

function mapStateToProps (state) {
  return {
    currentAuction: state.auction.status.currentAuction
  }
}

export default connect(mapStateToProps)(App)
