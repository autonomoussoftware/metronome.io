import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import MetValue from './MetValue'

class AuctionMetAvailableSm extends Component {
  render () {
    const metSupply = this.props.currentAuction === 0 ? 8000000 : 2880
    const auctionSupply = new BigNumber(metSupply).times(1e18)
    const remainingPercentage = new BigNumber(this.props.tokensRemaining)
      .div(auctionSupply)
      .times(100)
      .toNumber()

    const divStyle = {
      height: `${Math.min(remainingPercentage, 100)}%`
    }

    return (
      <div className="AuctionMetAvailableSm">
        <div className="auction__met-remaining-sm">
          <div
            className="auction__met-remaining-sm--fill"
            style={divStyle}>
          </div>
        </div>
        <span className="auction__counter-sm">
          <MetValue>
            {this.props.tokensRemaining}
          </MetValue>
        </span>
      </div>
    )
  }
}

export default AuctionMetAvailableSm
