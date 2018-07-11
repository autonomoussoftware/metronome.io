import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import MetValue from './MetValue'
import styled from 'styled-components'

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`

const ProgressBar = styled.div`
  position: relative;
  background-color: #292929;
  border-radius: 15px;
  height: 7px;
  border: 3px solid #292929;
  flex-grow: 1;
`

const ProgressBarActive = styled.div`
  background: #7e61f8;
  position: relative;
  height: 7px;
  border-radius: 15px;
  top: -2px;
`

const Arrow = styled.div`
  position: absolute;
  right: 0px;
  border-right: 1px solid #fff;
  width: 1px;
  height: 15px;

  &:after {
    content: "";
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
    border-bottom: 4px solid #fff;
  }
`

const Marker = styled.div`
  position: relative;
  padding-top: 15px;
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  text-align: right;
`

const MarkerLabel = styled.span`
  white-space: nowrap;
  position: absolute;
  right: ${({ value }) =>
    value < 5 ? '-30px'
      : value < 10 ? '-15px'
        : value < 90 ? 0
          : value < 95 ? '15px' : '30px'};
  width: 110px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-weight: 200;
  margin-right: -55px;
`

const ProgressBarLabel = styled.div`
  font-size: 21px;
  color: #fff;
  font-weight: 100;
  margin-left: 20px;
`

class AuctionTokens extends Component {
  render () {
    const {
      remainingPercentage,
      tokensRemaining,
      auctionSupply
    } = this.props

    const tokensSold = BigNumber.max(
      new BigNumber(auctionSupply).minus(tokensRemaining),
      0
    ).toString()

    const divStyle = {
      width: `${remainingPercentage}%`
    }

    return (
      <div className="container__tokens">
        <span className="label__title">Auction Tokens Available</span>
        <div className="container__auction--inner">
          <ProgressBarContainer>
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
          </ProgressBarContainer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionTokens)
