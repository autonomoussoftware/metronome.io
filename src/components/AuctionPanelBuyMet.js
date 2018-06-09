import { connect } from 'react-redux'
import React, { Component } from 'react'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import AuctionCopyClipboard from './AuctionCopyClipboard'
import AuctionPanelDetectOS from './AuctionPanelDetectOS'

class AuctionPanelBuyMet extends Component {
  render () {
    const { publicAddress } = this.props

    const QRcode = `https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=${publicAddress}&choe=UTF-8`

    return (
      <div className={this.props.showPanelBuyMet ? 'panel__buy-metronome --showBuyMet' : 'panel__buy-metronome'}>
        <section>
          <h2>How would you like to buy Metronome?</h2>
          <a onClick={this.props.buyMetaMask} className="btn btn-lrg"><span className="btn-text">Buy with Metamask</span> <span className="btn-icon"><img alt="" src={arrowIcon} /></span></a>
        </section>
        <section className="auction__option-section">
          <a className="btn btn-lrg"><span className="btn-text">Download Metronome Wallet</span> <span className="btn-icon --down"><img alt="" src={arrowIcon} /></span></a>
          <AuctionPanelDetectOS />
          <div className="auction--or-oval"><span className="auction--or-text">or</span></div>
        </section>
        <section className="auction__contact-address">
          <h2>Use the Metronome Contract Address</h2>
          <p>To make a purchase, send ETH to the address below. Make sure the address is correct. We reccomend using “Copy Address to Clipboard”, or scanning the barcode.</p>
          <AuctionCopyClipboard publicAddress={publicAddress}/>
        </section>
        <section className="auction__qr-code-scanner" style={{ textAlign: 'center' }}>
          <div className="auction__qr-code">
            <img alt="" src={QRcode} />
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
  publicAddress: state.config.auctionsAddress
})

export default connect(mapStateToProps)(AuctionPanelBuyMet)
