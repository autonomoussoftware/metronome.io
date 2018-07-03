import { connect } from 'react-redux'
import React, { Component } from 'react'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import downloadHelper from '../download-helper'

class AuctionPanelDetectOS extends Component {
  render () {
    const {
      currentOS,
      downloadWalletUrl,
      walletInstaller
    } = downloadHelper(this.props.desktopAppVersion)

    return (
      <div className="auction-panel__os-container">
        {walletInstaller
          ? <React.Fragment>
            <a className="btn btn-lrg" {...{ href: `${downloadWalletUrl}.${walletInstaller.ext}` }}>
              <span className="btn-text">Download Metronome Wallet</span>
              <span className="btn-icon --down"><img alt="" src={arrowIcon} /></span>
            </a>
            <div className="auction__os-icon">
              <img alt="" src={walletInstaller.icon} />
            </div>
            <div className="auction__osv">
              <span>{currentOS.version}</span>
            </div>
            <div className="auction__all-options">
              <a href="/apps">See all download options</a>
            </div>
          </React.Fragment>
          : <a className="btn btn-lrg" href="/apps">
            <span className="btn-text">Download Metronome Wallet</span>
            <span className="btn-icon --down"><img alt="" src={arrowIcon} /></span>
          </a>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(AuctionPanelDetectOS)
