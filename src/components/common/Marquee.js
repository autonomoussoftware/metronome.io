import React, { Component } from 'react'
import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import PropTypes from 'prop-types'

import AuctionCounterSm from './AuctionCounterSm'
import DollarValue from '../common/DollarValue'
import MetValue from '../common/MetValue'

const smartRound = smartRounder(6, 0, 0)

const Item = ({ label, children, isLast, isCopy }) => (
  <span className={`met-stat${isLast ? ' last' : ''}${isCopy ? ' copy' : ''}`}>
    <label>{label}:</label>
    <span className="data">{children}</span>
  </span>
)

Item.propTypes = {
  children: PropTypes.node.isRequired,
  isLast: PropTypes.bool,
  isCopy: PropTypes.bool,
  label: PropTypes.string.isRequired
}

const DataRow = ({
  circulatingSupply,
  lastPurchasePrice,
  isAuctionActive,
  currentPrice,
  marketCapUsd,
  isCopy,
  tvl
}) => (
  <React.Fragment>
    {marketCapUsd && (
      <Item isCopy={isCopy} label="Market Cap">
        ${smartRound(marketCapUsd, true)} USD
      </Item>
    )}
    {circulatingSupply && (
      <Item isCopy={isCopy} label="Circulating Supply">
        <MetValue>{circulatingSupply}</MetValue>
      </Item>
    )}
    {currentPrice && (
      <Item
        isCopy={isCopy}
        label={isAuctionActive ? 'Time Available' : 'Next Auction'}
      >
        <AuctionCounterSm />
      </Item>
    )}
    {currentPrice && (
      <Item
        isCopy={isCopy}
        label={
          isAuctionActive
            ? 'Current Auction Price'
            : 'Last Auction Closing Price'
        }
      >
        <DollarValue>
          {isAuctionActive ? currentPrice : lastPurchasePrice}
        </DollarValue>
      </Item>
    )}
    {tvl && (
      <Item label="TVL" isLast={!isCopy} isCopy={isCopy}>
        ${tvl} USD
      </Item>
    )}
  </React.Fragment>
)

DataRow.propTypes = {
  circulatingSupply: PropTypes.string,
  lastPurchasePrice: PropTypes.string,
  isAuctionActive: PropTypes.bool,
  marketCapUsd: PropTypes.string,
  currentPrice: PropTypes.string,
  isCopy: PropTypes.bool,
  tvl: PropTypes.string
}

class Marquee extends Component {
  render() {
    return (
      <div className="met-marquee bg-dark d-flex align-items-center">
        <div className="container">
          <div className="mover">
            <DataRow {...this.props} />
            <DataRow {...this.props} isCopy />
          </div>
        </div>
      </div>
    )
  }
}

function getTvl(state) {
  const ethRate = state.rates[state.config.chains[state.chain.active].symbol]
  const metRate = state.rates.MET

  if (
    !state.converter.status.availableMet ||
    !state.converter.status.availableEth ||
    !state.proceeds.status.balance ||
    !ethRate ||
    !metRate
  ) {
    return null
  }

  return smartRound(
    fromWei(state.proceeds.status.balance) * ethRate +
      fromWei(state.converter.status.availableEth) * ethRate +
      fromWei(state.converter.status.availableMet) * metRate,
    true
  )
}

const mapStateToProps = state => ({
  circulatingSupply: state.market.circulatingSupply,
  lastPurchasePrice: state.auction.status.lastPurchasePrice,
  isAuctionActive: state.auction.status.isAuctionActive,
  currentPrice: state.auction.status.currentPrice,
  marketCapUsd: state.market.marketCapUsd,
  tvl: getTvl(state)
})

export default connect(mapStateToProps)(Marquee)
