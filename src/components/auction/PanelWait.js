import React, { Component } from 'react'
import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import { toWei } from 'web3-utils'
import PropTypes from 'prop-types'

import closeIcon from '../../img/close.svg'
import FiatValue from '../common/FiatValue'
import METLoader from '../common/METLoader'
import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

const web3Provider = detectProvider('your web wallet')

class AuctionPanelWait extends Component {
  static propTypes = {
    currentPrice: PropTypes.string.isRequired,
    hideBuyPanel: PropTypes.func.isRequired,
    rates: PropTypes.shape({
      ETH_USD: PropTypes.number.isRequired
    }).isRequired,
    hash: PropTypes.string,
    eth: PropTypes.string
  }

  render() {
    const { currentPrice, eth, hash, rates } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()
    const metAmount = new BigNumber(toWei(eth)).div(currentPrice).toString()

    return (
      <React.Fragment>
        <div className="auction-panel__header header__buy-met --showBuyMetHeader">
          <div className="auction-panel__header--inner">
            <h2>Waiting for your purchase</h2>
            <a
              onClick={this.props.hideBuyPanel}
              className="auction-panel__close"
            >
              <img alt="" src={closeIcon} />
            </a>
          </div>
        </div>
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-metronome --showBuyMet">
              <section>
                <METLoader height="100px" />
                <h2>
                  {hash
                    ? `Waiting for transaction ${hash.substr(
                        0,
                        6
                      )}* to be confirmed`
                    : `Confim this purchase in ${web3Provider}`}
                </h2>
                <span>
                  Buying <MetValue unit="met">{metAmount}</MetValue> @{' '}
                  <EthValue>{currentPrice}</EthValue> ={' '}
                  <FiatValue suffix="USD">{fiatValue}</FiatValue>
                </span>
              </section>
              <span className="alert-text-warning">
                Note: Do not change the network or general configuration of{' '}
                {web3Provider} while your purchase is completing.
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  currentPrice: state.auction.status.currentPrice,
  rates: state.rates,
  hash: state.buyPanel.ongoingTx.hash
})

export default connect(mapStateToProps)(AuctionPanelWait)
