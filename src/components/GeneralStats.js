import React, { Component } from 'react'
import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GetMetButton from './GetMetButton'
import CoinCapRate from '../providers/CoinCapRate'
import MetValue from './MetValue'
import { Btn } from './Btn'

const Container = styled.div`
  border-top: solid 1px #463f63;
  display: flex;
  margin: 0 auto;
  max-width: 1140px;
  flex-direction: column;

  @media (min-width: 840px) {
    flex-direction: row;
    align-items: center;
  }
`

const CellContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  @media (min-width: 840px) {
    justify-content: flex-start;
  }
`

const Cell = styled.div`
  padding: 15px;
  border-right: solid 1px #202020;
  border-left: ${p => (p.first ? 'solid 1px #202020' : 'none')};
`

const Label = styled.div`
  position: relative;
  margin: 5px 0 0 0;
  color: #fff;
  font-size: 13px;
`

const Value = styled.div`
  color: #45d48d;
  font-size: 16px;
`

const ButtonContainer = styled.div`
  margin: 13px 15px;
`

const smartRound = smartRounder(3, 0, 10)

class GeneralStats extends Component {
  static propTypes = {
    onConvertMetronomeClick: PropTypes.func.isRequired,
    onBuyMetronomeClick: PropTypes.func.isRequired,
    updateEthUsdRate: PropTypes.func.isRequired,
    converter: PropTypes.shape({
      currentPrice: PropTypes.string.isRequired
    }).isRequired,
    auction: PropTypes.shape({
      remainingPercentage: PropTypes.number.isRequired,
      isAuctionActive: PropTypes.bool.isRequired,
      auctionSupply: PropTypes.number.isRequired,
      currentPrice: PropTypes.string.isRequired,
      tokenSupply: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {
      onConvertMetronomeClick,
      onBuyMetronomeClick,
      updateEthUsdRate,
      converter: { currentPrice: converterPrice },
      auction: {
        remainingPercentage,
        isAuctionActive,
        auctionSupply,
        currentPrice: auctionPrice,
        tokenSupply
      }
    } = this.props

    const isAuctionCheaper = new BigNumber(auctionPrice).lt(
      new BigNumber(converterPrice)
    )

    return (
      <React.Fragment>
        <CoinCapRate onData={updateEthUsdRate} />
        <Container>
          <CellContainer>
            <Cell first>
              <Label>Market Supply</Label>
              <Value>
                <MetValue>{tokenSupply}</MetValue>
              </Value>
            </Cell>
            <Cell>
              <Label>Percentage Sold</Label>
              <Value>{smartRound(100 - remainingPercentage)}%</Value>
            </Cell>
            <Cell>
              <Label>Daily Auction Amount</Label>
              <Value>
                <MetValue>{auctionSupply}</MetValue>
              </Value>
            </Cell>
          </CellContainer>
          <ButtonContainer>
            {isAuctionActive ? (
              <GetMetButton
                defaultActive={
                  isAuctionCheaper ? 'Buy Metronome' : 'Convert Metronome'
                }
                items={{
                  'Convert Metronome': onConvertMetronomeClick,
                  'Buy Metronome': onBuyMetronomeClick
                }}
              />
            ) : (
              <Btn onClick={onConvertMetronomeClick}>Convert Metronome</Btn>
            )}
          </ButtonContainer>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  converter: state.converter.status,
  auction: state.auction.status,
  rates: state.rates
})

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () =>
    dispatch({
      type: 'SHOW_BUY_PANEL',
      payload: true
    }),
  onConvertMetronomeClick: () =>
    dispatch({
      type: 'SHOW_CONVERT_PANEL',
      payload: true
    }),
  updateEthUsdRate: value =>
    dispatch({
      type: 'UPDATE_RATE',
      payload: { type: 'ETH_USD', value }
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralStats)
