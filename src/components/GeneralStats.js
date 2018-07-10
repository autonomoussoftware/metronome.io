import { connect } from 'react-redux'
import React, { Component } from 'react'
import smartRounder from 'smart-round'
import CoinCapRate from '../providers/CoinCapRate'
import MetValue from './MetValue'
import styled from 'styled-components'

const Container = styled.div`
  border-top: solid 1px #463f63;
  display: flex;
  margin: 0 auto;
  max-width: 1140px;
  flex-direction: column;

  @media(min-width: 840px) {
    flex-direction: row;
  }
`

const CellContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  @media(min-width: 840px) {
    justify-content: flex-start;
  }
`

const Cell = styled.div`
  padding: 15px;
  border-right: solid 1px #202020;
  border-left: ${p => p.first ? 'solid 1px #202020' : 'none'};
`

const Label = styled.div`
  position: relative;
  margin: 5px 0 0 0;
  color: #fff;
  font-size: 13px;
`

const Value = styled.div`
  color: #45D48D;
  font-size: 16px;
`

const Button = styled.button`
  margin: 13px 15px;
  display: block;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  background-color: #fff;
  padding: 15px 65px 15px 65px;
  color: #7e61f8;
`

const smartRound = smartRounder(3, 0, 10)

class GeneralStats extends Component {
  render () {
    const {
      auction: {
        auctionSupply,
        isAuctionActive,
        remainingPercentage,
        tokenSupply
      },
      onBuyMetronomeClick,
      updateEthUsdRate
    } = this.props

    return (
      <React.Fragment>
        <CoinCapRate onData={updateEthUsdRate}/>
        <Container>
          <CellContainer>
            <Cell first>
              <Label>Market Supply</Label>
              <Value><MetValue>{tokenSupply}</MetValue></Value>
            </Cell>
            <Cell>
              <Label>Percentage Sold</Label>
              <Value>{smartRound(100 - remainingPercentage)}%</Value>
            </Cell>
            <Cell>
              <Label>Daily Auction Amount</Label>
              <Value><MetValue>{auctionSupply}</MetValue></Value>
            </Cell>
          </CellContainer>
          <Button onClick={onBuyMetronomeClick} disabled={!isAuctionActive}>
            Buy Metronome
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auction: state.auction.status,
  rates: state.rates
})

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: true
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralStats)
