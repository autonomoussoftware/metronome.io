import React, { Component } from 'react'

class AuctionPanelMetaMask extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showPanelMetaMask: true
    }
  }

  render () {
    return (
      <div className={this.props.showPanelMetaMask ? 'panel__buy-meta-mask --showMetaMask' : 'panel__buy-meta-mask'}>
        <section className="buy-meta-mask__section">
          <div className="buy-meta-mask__current-price">
            <span>Current Auction Price</span>
          </div>
          <div className="buy-meta-mask__current-price-numeral">
            <span>.0274 ETH</span>
          </div>
        </section>
        <section className="buy-meta-mask__section">
          <form>
            <div className="buy-meta-mask__form-group">
              <label>Amount (MET)</label>
              <label className="right">MAX</label>
              <input type="number" placeholder="00" />
              <span className="label_overlay">MET</span>
            </div>
            <div className="buy-meta-mask__form-group">
              <label>Cost (ETH)</label>
              <input type="number" placeholder="00" />
              <span className="label_overlay">ETH</span>
            </div>
          </form>
        </section>
        <section className="buy-meta-mask__form-totals">
          <span>Buying 20 MET @ .0274 ETH = $1,534.04 USD</span>
        </section>
        <section className="buy-meta-mask__review-order">
          <span> By choosing "Review Metamask Purchase" you are agreeing to our disclaimer and terms of service</span>
          <a className="btn --disabled">Review Metamask Purchase</a>
          <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in Metamask</span>
        </section>
      </div>
    )
  }
}
export default AuctionPanelMetaMask
