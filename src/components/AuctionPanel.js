import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionPanelBuyMet from './AuctionPanelBuyMet'
import AuctionPanelBuyMetHeader from './AuctionPanelBuyMetHeader'
import AuctionPanelMetaMask from './AuctionPanelMetaMask'
import AuctionPanelMetaMaskHeader from './AuctionPanelMetaMaskHeader'

class AuctionPanel extends Component {
  render () {
    return (
      <div className={this.props.showBuyPanelEdit ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <AuctionPanelBuyMetHeader showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <AuctionPanelMetaMaskHeader backBuyMetPanel={this.props.backBuyMetPanel} showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <AuctionPanelBuyMet showPanelBuyMet={this.props.showPanelBuyMet} buyMetaMask={this.props.buyMetaMask} />
            <AuctionPanelMetaMask showPanelMetaMask={this.props.showPanelMetaMask} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showPanelBuyMet: !state.buyPanel.showBuyForm,
  showPanelMetaMask: state.buyPanel.showBuyForm
})

const mapDispatchToProps = dispatch => ({
  hideBuyPanel: () => dispatch({ type: 'SHOW_BUY_PANEL', payload: false }),
  buyMetaMask: () => dispatch({ type: 'SHOW_BUY_FORM', payload: true }),
  backBuyMetPanel: () => dispatch({ type: 'SHOW_BUY_FORM', payload: false })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPanel)
