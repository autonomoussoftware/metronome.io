import React, { Component } from 'react'

import closeIcon from '../img/close.svg'
import arrowIcon from '../img/arrow-forward-24-px.svg'

class AuctionBuyFormHeader extends Component {
  render () {
    const account = this.props.user.accounts[0] || ''
    return (
      <div className={this.props.showPanelMetaMask ? 'auction-panel__header header__meta-mask --showMetaMask' : 'auction-panel__header header__meta-mask'} >
        <div className="auction-panel__header--inner">
          <a onClick={this.props.backBuyMetPanel}><img alt="" className="auction-panel__back-arrow" src={arrowIcon} /></a>
          <h2>Buy with account {account.substr(0, 6)}{account ? '*' : ''}</h2>
          <a onClick={this.props.hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
        </div>
      </div>
    )
  }
}

export default AuctionBuyFormHeader
