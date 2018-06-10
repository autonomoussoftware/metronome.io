import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyOptions from './AuctionBuyOptions'
import AuctionBuyOptionsHeader from './AuctionBuyOptionsHeader'
import AuctionBuyFormHeader from './AuctionBuyFormHeader'
import UserInfo from './UserInfo'
import withWeb3 from './withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)
const UserInfoWithWeb3 = withWeb3(UserInfo)

class AuctionPanel extends Component {
  render () {
    return (
      <div className={this.props.showBuyPanelEdit ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <UserInfoWithWeb3 onAccounts={this.props.updateAccounts} />
        <AuctionBuyOptionsHeader showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <AuctionBuyFormHeader backBuyMetPanel={this.props.backBuyMetPanel} showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <AuctionBuyOptions showPanelBuyMet={this.props.showPanelBuyMet} buyMetaMask={this.props.buyMetaMask} />
            <AuctionBuyFormWithWeb3 showPanelMetaMask={this.props.showPanelMetaMask} />
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
  backBuyMetPanel: () => dispatch({
    type: 'SHOW_BUY_FORM',
    payload: false
  }),
  buyMetaMask: () => dispatch({
    type: 'SHOW_BUY_FORM',
    payload: true
  }),
  hideBuyPanel: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: false
  }),
  updateAccounts: accounts => dispatch({
    type: 'UPDATE_USER_ACCOUNTS',
    payload: accounts
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPanel)
