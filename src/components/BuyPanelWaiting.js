import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import { toWei } from 'web3-utils'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import FiatValue from './FiatValue'
import METLoader from './METLoader'
import EthValue from './EthValue'
import MetValue from './MetValue'

const Container = styled.div`
  padding: 100px 20px;
`

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0;
  letter-spacing: 0.6px;
  text-align: center;
  color: #fff;
`

const Message = styled.div`
  text-align: center;
  color: #c2c4c6;
  font-size: 13px;
`

const Separator = styled.div`
  border-bottom: 1px solid #202020;
  margin: 15px 0;
`

const WarningMessage = styled.div`
  color: #45d48d;
  margin-top: 10px;
  font-size: 13px;
  text-align: center;
`

const web3Provider = detectProvider('your web wallet')

class BuyPanelWaiting extends React.Component {
  static propTypes = {
    currentPrice: PropTypes.string.isRequired,
    rates: PropTypes.shape({
      ETH_USD: PropTypes.number.isRequired
    }).isRequired,
    hash: PropTypes.string,
    eth: PropTypes.string.isRequired
  }

  render() {
    const { currentPrice, eth, hash, rates } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()
    const metAmount = new BigNumber(toWei(eth)).div(currentPrice).toString()

    return (
      <Container>
        <METLoader height="100px" />

        <Subtitle>
          {hash
            ? `Waiting for transaction ${hash.substr(0, 6)}* to be confirmed`
            : `Confim this purchase in ${web3Provider}`}
        </Subtitle>

        <Message>
          Buying <MetValue unit="met">{metAmount}</MetValue> @{' '}
          <EthValue>{currentPrice}</EthValue> ={' '}
          <FiatValue suffix="USD">{fiatValue}</FiatValue>
        </Message>

        <Separator />

        <WarningMessage>
          Note: Do not change the network or general configuration of{' '}
          {web3Provider} while your purchase is completing.
        </WarningMessage>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  currentPrice: state.auction.status.currentPrice,
  rates: state.rates,
  hash: state.buyPanel.ongoingTx.hash
})

export default connect(mapStateToProps)(BuyPanelWaiting)
