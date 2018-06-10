import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyOptions from './AuctionBuyOptions'
import AuctionBuyOptionsHeader from './AuctionBuyOptionsHeader'
import AuctionBuyFormHeader from './AuctionBuyFormHeader'
import withUserInfo from './withUserInfo'

const AuctionBuyFormHeaderWithUserInfo = withUserInfo(AuctionBuyFormHeader)

class AuctionPanel extends Component {
  render () {
    return (
      <div className={this.props.showBuyPanelEdit ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <AuctionBuyOptionsHeader showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <AuctionBuyFormHeaderWithUserInfo backBuyMetPanel={this.props.backBuyMetPanel} showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <AuctionBuyOptions showPanelBuyMet={this.props.showPanelBuyMet} buyMetaMask={this.props.buyMetaMask} />
            <AuctionBuyForm showPanelMetaMask={this.props.showPanelMetaMask} />
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
