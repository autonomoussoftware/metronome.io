import React, { Component } from 'react'
import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CoinCapRate from '../../providers/CoinCapRate'
import MetValue from '../common/MetValue'

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1140px;
  flex-direction: column;

  @media (min-width: 840px) {
    align-items: center;
    flex-direction: row;
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
  padding: ${p => (p.first ? '15px 30px 15px 0' : '15px 30px')};
`

const Label = styled.div`
  position: relative;
  margin: 5px 0 0 0;
  font-size: 16px;
`

const Value = styled.div`
  color: #7e61f8;
  font-size: 18px;
  font-weight: 500;
  font-family: Roboto Mono;
`

const Btn = styled.a`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.06;
  letter-spacing: 0.3px;
  text-align: center;
  color: #ffffff;
  background-color: #7e61f8;
  display: block;
  text-transform: uppercase;
  padding: 10px 28px;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.9;
    text-decoration: none;
    color: #ffffff;
  }
`

const smartRound = smartRounder(3, 0, 10)

class GeneralStats extends Component {
  static propTypes = {
    updateEthUsdRate: PropTypes.func.isRequired,
    auction: PropTypes.shape({
      remainingPercentage: PropTypes.string.isRequired,
      auctionSupply: PropTypes.string.isRequired,
      tokenSupply: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {
      updateEthUsdRate,
      auction: { remainingPercentage, auctionSupply, tokenSupply }
    } = this.props

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
          <Btn href="../buy">Buy Metronome</Btn>
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
