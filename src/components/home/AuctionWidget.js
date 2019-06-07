import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import AuctionMetAvailableSm from './AuctionMetAvailableSm'
import AuctionCounterSm from './AuctionCounterSm'
import DollarValue from '../common/DollarValue'
import EthValue from '../common/EthValue'

const Container = styled.section`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #333335;
  border-bottom: 2px solid #d1d1d1;
  padding: 16px 24px;
`

const Body = styled.div`
  padding: 16px 24px 24px 24px;
`

const UsdPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.8px;
  color: #7e61f8;
`

const EthPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: normal;
  color: #7e61f8;
`

const RowContainer = styled.div`
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  padding: 8px 0;
  margin-top: 16px;
  margin-bottom: 24px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: #626262;
`

const Value = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: normal;
  color: #7e61f8;
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

function AuctionWidget(props) {
  const { lastPurchasePrice, isAuctionActive, currentPrice } = props

  return (
    <Container>
      <Title>Daily Auction</Title>
      <Body>
        <div>Price per MET</div>

        <UsdPrice>
          <DollarValue>
            {isAuctionActive ? currentPrice : lastPurchasePrice}
          </DollarValue>
        </UsdPrice>
        <EthPrice>
          <EthValue>
            {isAuctionActive ? currentPrice : lastPurchasePrice}
          </EthValue>
        </EthPrice>

        <RowContainer>
          <Row>
            <Label>
              {isAuctionActive ? 'Time Available' : 'Time Until Next Auction'}
            </Label>
            <Value>
              <AuctionCounterSm />
            </Value>
          </Row>
          <Row>
            <Label>
              {isAuctionActive ? 'Available Supply' : 'Next Starting Price'}
            </Label>
            <Value>
              <AuctionMetAvailableSm />
            </Value>
          </Row>
        </RowContainer>

        <Btn href="./buy">Buy Metronome</Btn>
      </Body>
    </Container>
  )
}

AuctionWidget.propTypes = {
  lastPurchasePrice: PropTypes.string.isRequired,
  isAuctionActive: PropTypes.bool.isRequired,
  currentPrice: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionWidget)
