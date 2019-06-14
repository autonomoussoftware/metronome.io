import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import AuctionMetAvailableSm from './AuctionMetAvailableSm'
import AuctionCounterSm from './AuctionCounterSm'
import DollarValue from '../common/DollarValue'
import EthValue from '../common/EthValue'
import Widget from '../common/Widget'

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

function AuctionWidget(props) {
  const { lastPurchasePrice, isAuctionActive, currentPrice } = props

  return (
    <Widget title="Daily Auction" btnUrl="./auction" btnLabel="Buy Metronome">
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
    </Widget>
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
