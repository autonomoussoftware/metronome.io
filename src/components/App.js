import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AuctionStatus from './AuctionStatus'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import MainPage from './MainPage'
import AuctionInProgress from './AuctionInProgress'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function App ({ genesisTime, loading }) {
  const now = Date.now()
  const auctionsStarted = genesisTime * 1000 <= now
  const isInitialAuctionTime = genesisTime * 1000 + 7 * MS_PER_DAY <= now
  const loadingAuctionStatus = loading

  return (
    <Router>
      <div>
        <AuctionStatus />
        <MainHeader />
        {/* <div style={{ height: '100%' }}>
          {auctionsStarted
            ? isInitialAuctionTime
              ? loadingAuctionStatus
                ? <div>Loading status</div>
                : <AuctionInProgress />
              : <div>buy button</div>
            : <div>Countdown</div>}
        </div> */}
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/auction" component={AuctionInProgress}/>

        <MainFooter />
      </div>
    </Router>
  )
}

function mapStateToProps (state) {
  return {
    genesisTime: state.auction.status.genesisTime,
    loading: state.auction.loading
  }
}

export default connect(mapStateToProps)(App)
