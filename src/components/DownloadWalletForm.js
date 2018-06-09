import React, { Component } from 'react'
import UAParser from 'ua-parser-js'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import linuxIcon from '../img/linux.png'
import macOsIcon from '../img/macos.svg'
import windowsIcon from '../img/windows.png'

const currentOS = new UAParser().getOS()
const walletInstallers = [
  { os: 'Debian', icon: linuxIcon, ext: 'deb' },
  { os: 'Mac OS', icon: macOsIcon, ext: 'dmg' },
  { os: 'Ubuntu', icon: linuxIcon, ext: 'deb' },
  { os: 'Windows', icon: windowsIcon, ext: 'exe' }
]
const latestWalletVersion = 'v0.11.0'
const baseWalletURL = `https://github.com/autonomoussoftware/metronome-wallet-desktop/releases/download/${latestWalletVersion}/metronome-desktop-wallet_v0.11.0`
const walletInstaller = walletInstallers
  .find(installer => installer.os === currentOS.name)

class AuctionPanelDetectOS extends Component {
  render () {
    return (
      <div className="auction-panel__os-container">
        {walletInstaller
          ? <React.Fragment>
            <a className="btn btn-lrg" {...{ href: `${baseWalletURL}.${walletInstaller.ext}` }}>
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
              <a>See all download options</a>
            </div>
          </React.Fragment>
          : <a className="btn btn-lrg">
            <span className="btn-text">Download Metronome Wallet</span>
            <span className="btn-icon --down"><img alt="" src={arrowIcon} /></span>
          </a>}
      </div>
    )
  }
}

export default AuctionPanelDetectOS
