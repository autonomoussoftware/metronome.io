import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import AddressCopyClipboard from './AddressCopyClipboard'
import DownloadWalletBlock from './DownloadWalletBlock'
import { useWallet } from '../utils.js'
import { Link, Btn } from './Btn.js'
import arrowIcon from '../img/arrow-forward-24-px.svg'
import QrBlock from './QrBlock'

const Container = styled.div`
  padding: 40px 20px;
`

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.6px;
  color: #fff;
`

const Message = styled.p`
  color: #c2c4c6;
  font-size: 13px;
`

const BuyWithBtn = styled(Btn)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
`

const BuyWithLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
`

const Arrow = styled.img.attrs({
  src: arrowIcon
})`
  margin -5px 0;
`

const Separator = styled.div`
  border-bottom: 1px solid #202020;
  margin: 15px 0;
`

const OrSeparator = styled.div`
  border-bottom: 1px solid #202020;
  height: 16px;
  margin-top: 30px;
  margin-bottom: 45px;

  &:after {
    content: 'or';
    font-size: 13px;
    color: white;
    display: block;
    background: #41434c;
    border-radius: 32px;
    width: 32px;
    text-align: center;
    line-height: 1;
    padding: 8px 0 10px;
    margin: 0 auto;
  }
`

const web3Provider = detectProvider('web wallet')

const isWeb3Available = web3Provider !== 'none'

class BuyPanelOptions extends React.Component {
  static propTypes = {
    contractAddress: PropTypes.string.isRequired,
    showForm: PropTypes.func.isRequired
  }

  render() {
    const { contractAddress, showForm } = this.props

    return (
      <Container>
        <Subtitle>How would you like to buy Metronome?</Subtitle>

        <section>
          {isWeb3Available ? (
            <BuyWithBtn onClick={showForm} block>
              Buy with {web3Provider} <Arrow />
            </BuyWithBtn>
          ) : (
            <BuyWithLink href={useWallet.url} target="_blank" block>
              Buy with {useWallet.name} <Arrow />
            </BuyWithLink>
          )}
        </section>

        <Separator />

        <DownloadWalletBlock />

        <OrSeparator />

        <section>
          <Subtitle>Buy With Your Own Wallet</Subtitle>
          <Message>
            To make a purchase, send ETH to the address below. Make sure the
            address you use is that one. We recommend copying it or scanning the
            QR code.
          </Message>
          <AddressCopyClipboard address={contractAddress} />
        </section>

        <Separator />

        <QrBlock
          imgSrc={`https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=${contractAddress}&choe=UTF-8`}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  contractAddress: state.config.auctionsAddress
})

const mapDispatchToProps = dispatch => ({
  showForm: () => dispatch({ type: 'SHOW_BUY_FORM' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyPanelOptions)
