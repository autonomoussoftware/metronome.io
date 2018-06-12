import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import React from 'react'

import TokenSaleCountdownDigits from './TokenSaleCountdownDigits'

function TokenSaleCountdown ({ genesisTime }) {
  return (
    <div className="final-countdown">
      <div className="final-countdown__label">TOKEN SALE COUNTDOWN:</div>
      <div className="final-countdown__counter">
        <Countdown
          date={genesisTime}
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
