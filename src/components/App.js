import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import AuctionStatus from './AuctionStatus'
import AuctionsPage from './AuctionsPage'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import MainPage from './MainPage'

function App ({ currentAuction }) {
  const isDailyAuction = currentAuction > 0

  return (
    <Router>
      <div>
        <AuctionStatus />
        <MainHeader />

        <Route exact path="/" component={MainPage}/>

        {isDailyAuction
        <Route exact path="/auctions" component={AuctionInProgress}/>
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
