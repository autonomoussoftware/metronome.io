import { connect } from 'react-redux'
import { VictoryPie } from 'victory'
import Countdown from 'react-countdown-now'
import React from 'react'

import TimeString from './TimeString'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function AuctionCounterSm (props) { // eslint-disable-line complexity
  const { loading } = props
  const {
    currentAuction,
    currentAuctionEndTime,
    genesisTime,
    isAuctionActive,
    nextAuctionStartTime
  } = props.status

  const now = Date.now()
  const remainingTime = currentAuctionEndTime - now
  const consumedTime = currentAuction === 0
    ? now - genesisTime
    : MS_PER_DAY - remainingTime

  // The pie will only be updated when a new block arrives. Since that happens
  // in average 4 times per minute and the pie shows time in days timespan, this
  // should be a non-issue.
  return (
    <div className="AuctionCounterSm">
      {isAuctionActive && <VictoryPie
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
        {!loading
          ? <Countdown
            date={isAuctionActive ? currentAuctionEndTime : nextAuctionStartTime}
            renderer={TimeString}/>
          : <span className="blink">...</span>}
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionActive
          ? 'Remaining'
          : 'Until Next Auction'}
      </span>
    </div>
  )
}

const mapStateToProps = state => state.auction

export default connect(mapStateToProps)(AuctionCounterSm)
