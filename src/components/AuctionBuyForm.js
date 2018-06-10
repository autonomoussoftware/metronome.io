import { connect } from 'react-redux'
import React, { Component } from 'react'

import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'

class AuctionBuyForm extends Component {
  render () {
    const {
      status: { currentPrice }
    } = this.props

    return (
      <div className={this.props.showPanelMetaMask ? 'panel__buy-meta-mask --showMetaMask' : 'panel__buy-meta-mask'}>
        <section className="buy-meta-mask__section">
          <div className="buy-meta-mask__current-price">
            <span>Current Auction Price</span>
          </div>
          <div className="buy-meta-mask__current-price-numeral">
            <EthValue>{currentPrice}</EthValue>
          </div>
        </section>
        <section className="buy-meta-mask__section">
          <form>
            <div className="buy-meta-mask__form-group">
              <label>Amount (MET)</label>
              {/* <label className="right">MAX</label> */}
              <input type="number" placeholder="0" />
              <span className="label_overlay">MET</span>
            </div>
            <div className="buy-meta-mask__form-group">
              <label>Cost (ETH)</label>
              <input type="number" placeholder="0" />
              <span className="label_overlay">ETH</span>
            </div>
          </form>
        </section>
        <section className="buy-meta-mask__form-totals">
          <span>Buying <MetValue>{20}</MetValue> @ <EthValue>{currentPrice}</EthValue> = <FiatValue suffix="USD">1534.04</FiatValue></span>
        </section>
        <section className="buy-meta-mask__review-order">
          <span> By choosing "Review Purchase" you are agreeing to our disclaimer and terms of service</span>
          <a className="btn --disabled">Review Purchase</a>
          <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in your web wallet</span>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.auction.status
})

export default connect(mapStateToProps)(AuctionBuyForm)
