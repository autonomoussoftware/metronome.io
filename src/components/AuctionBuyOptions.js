import { connect } from 'react-redux'
import detectProvider from 'web3-detect-provider'
import React, { Component } from 'react'
import UAParser from 'ua-parser-js'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import AuctionCopyClipboard from './AuctionCopyClipboard'
import closeIcon from '../img/close.svg'
import DownloadWalletForm from './DownloadWalletForm'
import metIcon from '../img/light.svg'

const web3Provider = detectProvider('web wallet')
const isWeb3Available = web3Provider !== 'none'

const isMobile = ['mobile', 'tablet'].includes(new UAParser().getDevice().type)
const useWallet = isMobile
  ? { name: 'Cipher', url: 'https://www.cipherbrowser.com/' }
  : { name: 'MetaMask', url: 'https://metamask.io' }

class AuctionBuyOptions extends Component {
  render () {
    const {
      auctionsAddress,
      hideBuyPanel,
      showBuyForm
    } = this.props

    return (
      <React.Fragment>
        <div className="auction-panel__header header__buy-met --showBuyMetHeader">
          <div className="auction-panel__header--inner">
            <img alt="" className="auction-panel__metIcon" src={metIcon} />
            <h2>Buy Metronome</h2>
            <a onClick={hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
          </div>
        </div>
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-metronome --showBuyMet">
              <h2>How would you like to buy Metronome?</h2>
              <section>
                <a
                  className="btn btn-lrg"
                  {...(isWeb3Available ? { onClick: showBuyForm } : { href: useWallet.url, target: '_blank' })}>
                  <span className="btn-text">
                    Buy with {isWeb3Available ? web3Provider : useWallet.name}</span>
                  <span className="btn-icon">
                    <img alt="" src={arrowIcon} />
                  </span>
                </a>
              </section>
              <section className="auction__option-section">
                <DownloadWalletForm />
                <div className="auction--or-oval"><span className="auction--or-text">or</span></div>
              </section>
              <section className="auction__contact-address">
                <h2>Buy With Your Own Wallet</h2>
                <p>To make a purchase, send ETH to the address below. Make sure the address you use is that one. We recommend copying it or scanning the QR code.</p>
                <AuctionCopyClipboard address={auctionsAddress}/>
              </section>
              <section className="auction__qr-code-scanner" style={{ textAlign: 'center' }}>
                <div className="auction__qr-code">
                  <img alt="" src={`https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=${auctionsAddress}&choe=UTF-8`} />
                </div>
                <div className="auction__qr-code-label">
                  <span>Scan Address</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auctionsAddress: state.config.auctionsAddress
})

export default connect(mapStateToProps)(AuctionBuyOptions)
