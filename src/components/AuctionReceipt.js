import { connect } from 'react-redux'
import auctionLogsParser from 'metronome-auction-logs-parser'
import BigNumber from 'bignumber.js'
import React, { Component } from 'react'

import checkIcon from '../img/check.svg'
import closeIcon from '../img/close.svg'
import EthValue from './EthValue'
import MetValue from './MetValue'

class AuctionReceipt extends Component {
  render () {
    const {
      config: {
        defaultGasPrice,
        metExplorerUrl
      },
      hideBuyPanel,
      receipt: {
        blockHash,
        blockNumber,
        gasUsed,
        logs,
        transactionIndex
      },
      showBuyForm,
      tx: {
        from,
        gasPrice,
        hash
      }
    } = this.props

    const auctionLogs = auctionLogsParser(logs)

    const auctionLog = auctionLogs
      .find(log => log.decoded.sender === from)

    const value = new BigNumber(auctionLog.decoded.amount)
      .toString()

    const totalValue = new BigNumber(gasUsed)
      .times(gasPrice || defaultGasPrice)
      .plus(value)
      .toString()

    return (
      <React.Fragment>
        <div className="auction-panel__header header__buy-met --showBuyMetHeader">
          <div className="auction-panel__header--inner">
            <h2>Receipt</h2>
            <a onClick={hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
          </div>
        </div>
        <div className="auction-panel__body panel__receipt">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-metronome --showBuyMet">
              <section>
                <img src={checkIcon} alt="ok" />
                <h2>Purchase Complete!</h2>
              </section>
              <section>
                <label>Amount</label>
                <span className="amount__total-text"><MetValue>{auctionLog.decoded.tokens}</MetValue></span>
              </section>
              <section className="panel__receipt-cost">
                <label>Cost</label>
                <ul>
                  <li className="amount__total-li"><EthValue>{totalValue}</EthValue>{gasPrice ? '' : <span title="Gas price was estimated">*</span>}</li>
                  <li className="amount__total-li"><EthValue>{value}</EthValue> + {gasUsed} gas</li>
                </ul>
              </section>
              <section>
                <label>Transaction Hash</label>
                <div className="amount__hash">
                  <span>{hash}</span>
                </div>
              </section>
              <section>
                <label>Transaction Details</label>
                <ul className="panel__receipt-details">
                  <li>
                    <label>Block Number</label>
                    <span className="amount__total-text">{blockNumber}</span>
                  </li>
                  <li>
                    <label>Transaction Index</label>
                    <span className="amount__total-text">{transactionIndex}</span>
                  </li>
                  <li>
                    <label>Block Hash</label>
                    <div className="amount__hash">
                      <span>{blockHash}</span>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="panel__purchase-btn-container">
                <a className="btn" onClick={showBuyForm}>
                  Make Another Purchase
                </a>
                <a
                  className="btn btn-inverted"
                  href={`${metExplorerUrl}/transactions/${hash}`}
                  target="_blank">
                  View in Explorer
                </a>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  config: state.config,
  currentPrice: state.auction.status.currentPrice,
  rates: state.rates,
  receipt: state.buyPanel.receipt,
  tx: state.buyPanel.ongoingTx
})

export default connect(mapStateToProps)(AuctionReceipt)
