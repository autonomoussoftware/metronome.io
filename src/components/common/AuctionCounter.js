import React, { Component } from 'react'
import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Counter = styled.div`
  display: flex;
`

const Value = styled.div`
  font-family: Roboto Mono;
  font-size: 24px;
  font-weight: 500;
  line-height: 48px;
  text-align: center;
  color: #7e61f8;
  background-color: rgba(126, 97, 248, 0.1);
  min-width: 64px;
`

const Cell = styled.div`
  flex-grow: 1;
  flex-basis: 0;

  & + & > ${Value} {
    border-left: 1px solid white;
  }

  &:first-child > ${Value} {
    border-radius: 12px 0 0 12px;
  }

  &:last-child > ${Value} {
    border-radius: 0 12px 12px 0;
  }
`

const Label = styled.div`
  font-family: Roboto;
  font-size: 13px;
  line-height: 1.69;
  letter-spacing: 0.4px;
  text-align: center;
  color: rgb(98, 98, 98);
`

const renderer = ({ hours, minutes, seconds }) => (
  <Counter>
    <Cell>
      <Value>{hours}</Value>
      <Label>Hours</Label>
    </Cell>
    <Cell>
      <Value>{minutes}</Value>
      <Label>Mins</Label>
    </Cell>
    <Cell>
      <Value>{seconds}</Value>
      <Label>Secs</Label>
    </Cell>
  </Counter>
)

renderer.propTypes = {
  seconds: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired
}

class AuctionCounter extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    status: PropTypes.shape({
      currentAuctionEndTime: PropTypes.number,
      nextAuctionStartTime: PropTypes.number,
      isAuctionActive: PropTypes.bool
    }).isRequired
  }

  render() {
    const { loading } = this.props
    const {
      currentAuctionEndTime,
      nextAuctionStartTime,
      isAuctionActive
    } = this.props.status

    const targetTime = isAuctionActive
      ? currentAuctionEndTime
      : nextAuctionStartTime

    return (
      <div>
        {!loading && targetTime && (
          <Countdown date={targetTime} renderer={renderer} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state.auction

export default connect(mapStateToProps)(AuctionCounter)
