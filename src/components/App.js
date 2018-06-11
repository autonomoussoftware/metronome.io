import { connect } from 'react-redux'
import React from 'react'

import AuctionPanel from './AuctionPanel'
import AuctionStatus from './AuctionStatus'
import AuctionsPage from './pages/AuctionsPage'

function App ({ isDailyAuction, showBuyPanel }) {
  return (
    <React.Fragment>
      <AuctionStatus />

      {isDailyAuction
        ? <AuctionsPage/>
        : null}

      <h1>{isDailyAuction.toString()}</h1>

      <AuctionPanel showBuyPanelEdit={showBuyPanel} />
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    isDailyAuction: state.auction.status.isDailyAuction,
    showBuyPanel: state.buyPanel.show
  }
}

export default connect(mapStateToProps)(App)
