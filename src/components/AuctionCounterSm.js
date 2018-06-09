import { connect } from 'react-redux'
import { VictoryPie } from 'victory'
import Countdown from 'react-countdown-now'
import React from 'react'

import TimeString from './TimeString'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function AuctionCounterSm (props) {
  const {
    currentAuction,
    genesisTime,
    isAuctionInProgress,
    nextAuctionStartTime
  } = props

  const now = Date.now()
  const remainingTime = nextAuctionStartTime - now
  const consumedTime = currentAuction === 0
    ? now - genesisTime
    : MS_PER_DAY - remainingTime

  // The pie will only be updated when a new block arrives. Since that happens
  // in average 4 times per minute and the pie shows time in days timespan, this
  // should be a non-issue.
  return (
    <div className="AuctionCounterSm">
      {isAuctionInProgress && <VictoryPie
        colorScale={[
          '#202020',
          '#7e61f8'
        ]}
        data={[
          { y: consumedTime },
          { y: remainingTime }
        ]}
      />}
      <span className="auction__counter-sm">
        <Countdown
          date={nextAuctionStartTime}
          renderer={TimeString}
        />
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionInProgress
          ? 'Remaining'
          : 'Until Next Auction'}
      </span>
    </div>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionCounterSm)
