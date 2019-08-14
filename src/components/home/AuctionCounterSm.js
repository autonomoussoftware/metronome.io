import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import PropTypes from 'prop-types'
import React from 'react'

import TimeString from './TimeString'

function AuctionCounterSm(props) {
  const { loading } = props
  const {
    currentAuctionEndTime,
    nextAuctionStartTime,
    isAuctionActive
  } = props.status

  return loading ? (
    <span className="blink">...</span>
  ) : (
    <span>
      <Countdown
        renderer={TimeString}
        date={isAuctionActive ? currentAuctionEndTime : nextAuctionStartTime}
      />
    </span>
  )
}

AuctionCounterSm.propTypes = {
  loading: PropTypes.bool.isRequired,
  status: PropTypes.shape({
    currentAuctionEndTime: PropTypes.number.isRequired,
    nextAuctionStartTime: PropTypes.number.isRequired,
    isAuctionActive: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => state.auction

export default connect(mapStateToProps)(AuctionCounterSm)
