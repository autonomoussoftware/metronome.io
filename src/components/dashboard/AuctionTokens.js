import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MetValue from '../common/MetValue'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const ProgressBar = styled.div`
  position: relative;
  height: 7px;
  flex-grow: 1;
  border-radius: 4px;
  background-color: rgba(126, 97, 248, 0.3);
`

const ProgressBarActive = styled.div`
  background: #7e61f8;
  position: relative;
  height: 7px;
  border-radius: 4px;
  top: 0;
`

const Arrow = styled.div`
  position: absolute;
  right: 0px;
  border-right: 1px solid #7e61f8;
  width: 1px;
  height: 15px;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: -3.5px;
    width: 0;
    height: 0;
    top: 14px;
    margin: 0 auto;
    position: relative;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #7e61f8;
  }
`

const Marker = styled.div`
  position: relative;
  padding-top: 15px;
  font-size: 14px;
  color: #7e61f8;
  font-weight: 400;
  text-align: right;
`

const MarkerLabel = styled.span`
  white-space: nowrap;
  position: absolute;
  right: ${({ value }) =>
    value < 5
      ? '-30px'
      : value < 10
      ? '-15px'
      : value < 90
      ? 0
      : value < 95
      ? '15px'
      : '30px'};
  width: 110px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  margin-right: -55px;
  font-family: Roboto Mono;
  font-weight: 500;
  color: #7e61f8;
`

const ProgressBarLabel = styled.div`
  margin-left: 20px;
  font-family: Roboto Mono;
  font-size: 24px;
  font-weight: 500;
  color: #7e61f8;
`

class AuctionTokens extends Component {
  static propTypes = {
    remainingPercentage: PropTypes.string,
    tokensRemaining: PropTypes.string,
    auctionSupply: PropTypes.string
  }

  render() {
    const { remainingPercentage, tokensRemaining, auctionSupply } = this.props

    const tokensSold = BigNumber.max(
      new BigNumber(auctionSupply).minus(tokensRemaining),
      0
    ).toString()

    const divStyle = {
      width: `${remainingPercentage}%`
    }

    return (
      <Container>
        <ProgressBar>
          <ProgressBarActive style={divStyle}>
            <Arrow />
          </ProgressBarActive>
          <Marker style={divStyle}>
            <MarkerLabel value={remainingPercentage}>
              <MetValue>{tokensSold}</MetValue> sold
            </MarkerLabel>
          </Marker>
        </ProgressBar>
        <ProgressBarLabel>
          <MetValue>{tokensRemaining}</MetValue>
        </ProgressBarLabel>
      </Container>
    )
  }
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionTokens)
