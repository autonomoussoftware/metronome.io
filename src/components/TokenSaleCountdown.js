import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import React from 'react'

import TokenSaleCountdownDigits from './TokenSaleCountdownDigits'

function TokenSaleCountdown ({ genesisTime }) {
  return (
    <div className="final-countdown" style={{ display: 'flex' }}>
      <div className="final-countdown__label">TOKEN SALE COUNTDOWN:</div>
      <div className="final-countdown__counter">
        <Countdown
          date={genesisTime * 1000}
          renderer={TokenSaleCountdownDigits}
        />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    genesisTime: state.auction.status.genesisTime
  }
}

export default connect(mapStateToProps)(TokenSaleCountdown)
