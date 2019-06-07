import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AuctionBuyOptions from './BuyOptions'
import AuctionPanelWait from './PanelWait'
import AuctionReceipt from './Receipt'
import AuctionBuyForm from './BuyForm'
import CoinCapRate from '../../providers/CoinCapRate'
import withWeb3 from '../../hocs/withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)

class AuctionPanel extends Component {
  static propTypes = {
    backToBuyOptions: PropTypes.func.isRequired,
    updateEthUsdRate: PropTypes.func.isRequired,
    showBuyForm: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    showReceipt: PropTypes.bool.isRequired,
    showWaiting: PropTypes.bool.isRequired,
    showBuy: PropTypes.bool.isRequired
  }

  render() {
    const {
      backToBuyOptions,
      updateEthUsdRate,
      showBuyForm,
      showOptions,
      showReceipt,
      showWaiting,
      showBuy
    } = this.props

    return (
      <div>
        <CoinCapRate onData={updateEthUsdRate} />
        {showOptions && <AuctionBuyOptions showBuyForm={showBuyForm} />}
        {showBuy && (
          <AuctionBuyFormWithWeb3 backToBuyOptions={backToBuyOptions} />
        )}
        {showWaiting && <AuctionPanelWait />}
        {showReceipt && <AuctionReceipt showBuyForm={showBuyForm} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showOptions: state.buyPanel.showStep === 'options',
  showWaiting: state.buyPanel.showStep === 'waiting',
  showReceipt: state.buyPanel.showStep === 'receipt',
  showError: state.buyPanel.showStep === 'error',
  showBuy: state.buyPanel.showStep === 'form'
})

const mapDispatchToProps = dispatch => ({
  backToBuyOptions: () => dispatch({ type: 'SHOW_BUY_OPTIONS' }),
  updateEthUsdRate: value =>
    dispatch({ type: 'UPDATE_RATE', payload: { type: 'ETH_USD', value } })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionPanel)
