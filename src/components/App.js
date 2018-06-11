import { connect } from 'react-redux'
import React from 'react'

import AuctionPanel from './AuctionPanel'
import AuctionSummary from './AuctionSummary'
// import AuctionsPage from './pages/AuctionsPage'

function App ({ isDailyAuction, showBuyPanel }) {
  return (
    <React.Fragment>
      <AuctionSummary />

      {/* {isDailyAuction
        ? <AuctionsPage/>
        : null} */}

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
