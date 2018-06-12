import { connect } from 'react-redux'
import detectProvider from 'web3-detect-provider'
import React, { Component } from 'react'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import AuctionCopyClipboard from './AuctionCopyClipboard'
import DownloadWalletForm from './DownloadWalletForm'

const web3Provder = detectProvider()
const isWeb3Available = web3Provder !== 'none'

class AuctionBuyOptions extends Component {
  render () {
    const { auctionsAddress } = this.props

    return (
      <div className={this.props.showPanelBuyMet ? 'panel__buy-metronome --showBuyMet' : 'panel__buy-metronome'}>
        <h2>How would you like to buy Metronome?</h2>
        {isWeb3Available && <section>
          <a onClick={this.props.buyMetaMask} className="btn btn-lrg">
            <span className="btn-text">Buy with {web3Provder}</span> <span className="btn-icon"><img alt="" src={arrowIcon} /></span>
          </a>
        </section>}
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
    )
  }
}

const mapStateToProps = state => ({
  auctionsAddress: state.config.auctionsAddress
})

export default connect(mapStateToProps)(AuctionBuyOptions)
