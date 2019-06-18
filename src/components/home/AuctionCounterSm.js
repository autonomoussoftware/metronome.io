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
