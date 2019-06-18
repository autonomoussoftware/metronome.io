import auctionLogsParser from 'metronome-auction-logs-parser'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'
import arrow from '../../img/arrow-forward-24-px.svg'
import metro from '../../img/metro-icon.svg'
import close from '../../img/cancel.svg'
import check from '../../img/check.svg'

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
`

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    opacity: 0.9;
  }

  & > img {
    display: block;
  }
`

const SuccessIcon = styled.img`
  display: block;
  margin: 8px auto 16px;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  text-align: center;
  color: rgb(51, 51, 53);
  max-width: 200px;
  text-align: center;
  margin: 0 auto 24px;
`

const Box = styled.div`
  pointer-events: initial;
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
`

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.69;
  letter-spacing: 0.4px;
  color: rgb(98, 98, 98);
  border-top: 1px solid #d1d1d1;
  padding: 13px 0;

  &:last-child {
    border-bottom: 1px solid #d1d1d1;
  }
`

const Label = styled.div`
  flex-grow: 1;
  white-space: nowrap;
`

const Value = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 16px;
  text-align: right;
`

const MakeAnother = styled.button`
  background-color: rgb(126, 97, 248);
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.06;
  letter-spacing: 0.3px;
  text-align: center;
  color: rgb(255, 255, 255);
  border: none;
  display: block;
  width: 100%;
  padding: 10px 28px;
  margin-top: 32px;
`

const FooterBox = styled(Box)`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(98, 98, 98);

  &:hover {
    text-decoration: none;
    color: rgb(126, 97, 248);
    opacity: 0.95;
  }
`

const GetStartedMessage = styled.div`
  flex-grow: 1;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.3px;
  padding: 0 16px;
  font-weight: normal;

  & > b {
    font-weight: normal;
    color: rgb(126, 97, 248);
  }
`

const ExplorerLink = styled.div`
  margin-top: 10px;
  margin-bottom: 16px;
  text-align: center;
`

class Receipt extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    receipt: PropTypes.shape({
      transactionIndex: PropTypes.number.isRequired,
      blockNumber: PropTypes.number.isRequired,
      blockHash: PropTypes.string.isRequired,
      gasUsed: PropTypes.number.isRequired,
      logs: PropTypes.array.isRequired
    }).isRequired,
    defaultGasPrice: PropTypes.string.isRequired,
    explorerUrl: PropTypes.string.isRequired,
    chainId: PropTypes.string.isRequired,
    tx: PropTypes.shape({
      gasPrice: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {
      defaultGasPrice,
      explorerUrl,
      receipt: { blockHash, blockNumber, gasUsed, logs, transactionIndex },
      chainId,
      tx: { from, gasPrice, hash }
    } = this.props

    const auctionLogs = auctionLogsParser(logs, chainId)

    const auctionLog = auctionLogs.find(log => log.decoded.sender === from)

    const value = new BigNumber(auctionLog.decoded.amount).toString()

    const totalValue = new BigNumber(gasUsed)
      .times(gasPrice || defaultGasPrice)
      .plus(value)
      .toString()

    return (
      <React.Fragment>
        <Box>
          <Header>
            <CloseBtn onClick={this.props.onRequestClose}>
              <img src={close} alt="" />
            </CloseBtn>
          </Header>
          <SuccessIcon src={check} alt="" />
          <Title>Purchase Complete</Title>
          <div>
            <Row>
              <Label>Amount Purchased</Label>
              <Value>
                <MetValue>{auctionLog.decoded.tokens}</MetValue>
              </Value>
            </Row>
            <Row>
              <Label>Cost</Label>
              <Value>
                <EthValue>{totalValue}</EthValue> (<EthValue>{value}</EthValue>{' '}
                + {gasUsed} gas)
              </Value>
            </Row>
            <Row>
              <Label>Transaction Hash</Label>
              <Value>{hash}</Value>
            </Row>
            <Row>
              <Label>Block Number</Label>
              <Value>{blockNumber}</Value>
            </Row>
            <Row>
              <Label>Transaction Index</Label>
              <Value>{transactionIndex}</Value>
            </Row>
            <Row>
              <Label>Block Hash</Label>
              <Value>{blockHash}</Value>
            </Row>
          </div>
          <MakeAnother onClick={this.props.onRequestClose}>
            MAKE ANOTHER PURCHASE
          </MakeAnother>
          <ExplorerLink>
            <a href={explorerUrl.replace('{{hash}}', hash)} target="_blank">
              View is Explorer
            </a>
          </ExplorerLink>
        </Box>

        <FooterBox as="a" href="../wallet">
          <img src={metro} alt="" />
          <GetStartedMessage>
            Get Started with the <b>Metronome Wallet</b>
          </GetStartedMessage>
          <img src={arrow} alt="" />
        </FooterBox>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  defaultGasPrice: state.config.chains[state.chain.active].defaultGasPrice,
  currentPrice: state.auction.status.currentPrice,
  explorerUrl: state.config.chains[state.chain.active].explorerUrl,
  receipt: state.buyPanel.receipt,
  chainId: state.chain.active,
  rates: state.rates,
  tx: state.buyPanel.ongoingTx
  // receipt: {
  // transactionIndex: 12,
  // blockNumber: 123987123,
  // blockHash: '0x12386123',
  // gasUsed: '123',
  // logs: []
  // },
  // tx: {
  // gasPrice: 12,
  // from: '0x12222234567898765434567',
  // hash: '0x123978123723712876123'
  // }
})

export default connect(mapStateToProps)(Receipt)
