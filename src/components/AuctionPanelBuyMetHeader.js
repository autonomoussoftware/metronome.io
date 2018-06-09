import React, { Component } from 'react'

import metIcon from '../img/light.svg'
import closeIcon from '../img/close.svg'

class AuctionPanelBuyMetHeader extends Component {
  render () {
    return (
      <div className={this.props.showPanelMetaMask ? 'auction-panel__header header__buy-met ' : 'auction-panel__header header__buy-met --showBuyMetHeader'}>
        <div className="auction-panel__header--inner">
          <img alt="" className="auction-panel__metIcon" src={metIcon} />
          <h2>Buy Metronome</h2>
          <a onClick={this.props.hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
        </div>
      </div>
    )
  }
}
export default AuctionPanelBuyMetHeader
