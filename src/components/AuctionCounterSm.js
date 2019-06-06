import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import React from 'react'

import TimeString from './TimeString'

function AuctionCounterSm(props) {
  // eslint-disable-line complexity
  const { loading } = props
  const {
    currentAuctionEndTime,
    nextAuctionStartTime,
    isAuctionActive
  } = props.status

  // The pie will only be updated when a new block arrives. Since that happens
  // in average 4 times per minute and the pie shows time in days timespan, this
  // should be a non-issue.
  return (
    <div>
      {!loading ? (
        <Countdown
          date={isAuctionActive ? currentAuctionEndTime : nextAuctionStartTime}
          renderer={TimeString}
        />
      ) : (
        <span className="blink">...</span>
      )}
    </div>
  )
}

const mapStateToProps = state => state.auction

export default connect(mapStateToProps)(AuctionCounterSm)
