import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyFormHeader from './AuctionBuyFormHeader'
import AuctionBuyOptions from './AuctionBuyOptions'
import AuctionBuyOptionsHeader from './AuctionBuyOptionsHeader'
import CoinCapRate from '../providers/CoinCapRate'
import UserInfo from '../providers/UserInfo'
import withWeb3 from '../hocs/withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)
const UserInfoWithWeb3 = withWeb3(UserInfo)

class AuctionPanel extends Component {
  render () {
    return (
      <div className={this.props.showBuyPanelEdit ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <UserInfoWithWeb3 onAccounts={this.props.updateAccounts} />
        <CoinCapRate onData={this.props.updateEthUsdRate}/>
        <AuctionBuyOptionsHeader showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        <AuctionBuyFormHeader backBuyMetPanel={this.props.backBuyMetPanel} showPanelMetaMask={this.props.showPanelMetaMask} hideBuyPanel={this.props.hideBuyPanel} />
        {this.props.showPanelBuyMet && <AuctionBuyOptions buyMetaMask={this.props.buyMetaMask} />}
        {this.props.showPanelMetaMask && <AuctionBuyFormWithWeb3 />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showBuyPanelEdit: state.buyPanel.show,
  showPanelBuyMet: state.buyPanel.showStep === 'options',
  showPanelMetaMask: state.buyPanel.showStep === 'form'
})

const mapDispatchToProps = dispatch => ({
  backBuyMetPanel: () => dispatch({
    type: 'SHOW_BUY_OPTIONS'
  }),
  buyMetaMask: () => dispatch({
    type: 'SHOW_BUY_FORM'
  }),
  hideBuyPanel: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: false
  }),
  updateAccounts: accounts => dispatch({
    type: 'UPDATE_USER_ACCOUNTS',
    payload: accounts
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPanel)
