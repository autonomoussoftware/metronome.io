import { connect } from 'react-redux'
import React from 'react'

import AuctionStatus from './AuctionStatus'
import AuctionInProgress from './AuctionInProgress'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function App ({ genesisTime, loading }) {
  const now = Date.now()
  const auctionsStarted = genesisTime * 1000 <= now
  const isInitialAuctionTime = genesisTime * 1000 + 7 * MS_PER_DAY <= now
  const loadingAuctionStatus = loading

  return (
    <div style={{ height: '100%' }}>
      <AuctionStatus />
      {auctionsStarted
        ? isInitialAuctionTime
          ? loadingAuctionStatus
            ? <div>Loading status</div>
            : <AuctionInProgress />
          : <div>buy button</div>
        : <div>Countdown</div>}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    genesisTime: state.auction.status.genesisTime,
    loading: state.auction.loading
  }
}

export default connect(mapStateToProps)(App)
