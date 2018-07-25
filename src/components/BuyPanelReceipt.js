import auctionLogsParser from 'metronome-auction-logs-parser'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import { Link, Btn } from './Btn'
import checkIcon from '../img/check.svg'
import EthValue from './EthValue'
import MetValue from './MetValue'
import Sp from './Spacing'

const Container = styled.div`
  padding: 40px 20px;
`

const Icon = styled.img`
  display: block;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0 35px;
  letter-spacing: 0.6px;
  color: #fff;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Label = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
`

const Value = styled.div`
  font-size: ${p => (p.small ? '13px' : '20px')};
  letter-spacing: ${p => (p.small ? '0.4px' : '0.6px')};
  text-align: right;
  color: #ffffff;
  opacity: ${p => (p.small ? 0.7 : 1)};
`

const Hash = styled.div`
  font-size: 13px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.7;
  margin-top: 5px;
`

const Separator = styled.div`
  border-bottom: 1px solid #202020;
  margin: 15px 0;
`

class BuyPanelReceipt extends React.Component {
  static propTypes = {
    showForm: PropTypes.func.isRequired,
    receipt: PropTypes.shape({
      transactionIndex: PropTypes.number.isRequired,
      blockNumber: PropTypes.number.isRequired,
      blockHash: PropTypes.string.isRequired,
      gasUsed: PropTypes.number.isRequired,
      logs: PropTypes.array.isRequired
    }).isRequired,
    config: PropTypes.shape({
      defaultGasPrice: PropTypes.string.isRequired,
      metExplorerUrl: PropTypes.string.isRequired
    }).isRequired,
    tx: PropTypes.shape({
      gasPrice: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {
      showForm,
      receipt: { blockHash, blockNumber, gasUsed, logs, transactionIndex },
      config: { defaultGasPrice, metExplorerUrl },
      tx: { from, gasPrice, hash }
    } = this.props

    const auctionLogs = auctionLogsParser(logs)

    const auctionLog = auctionLogs.find(log => log.decoded.sender === from)

    const value = new BigNumber(auctionLog.decoded.amount).toString()

    const totalValue = new BigNumber(gasUsed)
      .times(gasPrice || defaultGasPrice)
      .plus(value)
      .toString()

    return (
      <Container>
        <Icon src={checkIcon} alt="" />
        <Title>Purchase Complete!</Title>

        <Separator />

        <Row>
          <Label>Amount</Label>
          <Value>
            <MetValue>{auctionLog.decoded.tokens}</MetValue>
          </Value>
        </Row>

        <Separator />

        <Row>
          <Label>Cost</Label>
          <div>
            <Value>
              <EthValue>{totalValue}</EthValue>
              {!gasPrice && <span title="Gas price was estimated">*</span>}
            </Value>
            <Value small>
              <EthValue>{value}</EthValue> + {gasUsed} gas units
            </Value>
          </div>
        </Row>

        <Separator />

        <Label>Transaction Hash</Label>
        <Hash title={hash}>{hash}</Hash>

        <Separator />

        <Row>
          <Label>Block Number</Label>
          <Value>{blockNumber}</Value>
        </Row>

        <Separator />

        <Row>
          <Label>Transaction Index</Label>
          <Value>{transactionIndex}</Value>
        </Row>

        <Separator />

        <Label>Block Hash</Label>
        <Hash title={blockHash}>{blockHash}</Hash>

        <Separator />

        <Sp my={2}>
          <Btn block onClick={showForm}>
            Make Another Purchase
          </Btn>
        </Sp>
        <Link
          negative
          target="_blank"
          block
          href={`${metExplorerUrl}/transactions/${hash}`}
        >
          View in Explorer
        </Link>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  currentPrice: state.auction.status.currentPrice,
  receipt: state.buyPanel.receipt,
  config: state.config,
  rates: state.rates,
  tx: state.buyPanel.ongoingTx
})

const mapDispatchToProps = dispatch => ({
  showForm: () => dispatch({ type: 'SHOW_BUY_FORM' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyPanelReceipt)
