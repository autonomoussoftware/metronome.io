import React, { Component } from 'react'
import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import PropTypes from 'prop-types'

class AuctionCounter extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    status: PropTypes.shape({
      currentAuctionEndTime: PropTypes.number.isRequired,
      nextAuctionStartTime: PropTypes.number.isRequired,
      isAuctionActive: PropTypes.bool.isRequired
    }).isRequired
  }

  render() {
    const { loading } = this.props
    const {
      currentAuctionEndTime,
      isAuctionActive,
      nextAuctionStartTime
    } = this.props.status

    const renderer = ({ days, hours, minutes, seconds, completed }) => (
      <div>
        <span className="auction-timer__section">{days}</span>
        <span className="auction-timer__section">{hours}</span>
        <span className="auction-timer__section">{minutes}</span>
        <span className="auction-timer__section">{seconds}</span>
      </div>
    )

    const targetTime = isAuctionActive
      ? currentAuctionEndTime
      : nextAuctionStartTime

    return (
      <div className="container__auction-timer">
        {!loading && <Countdown date={targetTime} renderer={renderer} />}
        <ul className="auction-timer__labels">
          <li>Days</li>
          <li>Hours</li>
          <li>Mins</li>
          <li>Secs</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => state.auction

export default connect(mapStateToProps)(AuctionCounter)
