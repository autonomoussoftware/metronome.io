import React, { Component } from 'react'

import linuxIcon from '../img/linux.png'
import windowsIcon from '../img/windows.png'
import macIcon from '../img/macos.svg'

class AuctionPanelDetectOS extends Component {
  render () {
    const platform = window.navigator.platform
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
    const os = null

    let detectedOS
    let OSv

    if (macosPlatforms.indexOf(platform) !== -1) {
      detectedOS = macIcon
      OSv = 'macOS'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      detectedOS = windowsIcon
      OSv = 'Windows'
    } else if (!os && /Linux/.test(platform)) {
      detectedOS = linuxIcon
      OSv = 'Linux'
    }

    return (
      <div className="auction-panel__os-container">
        <div className="auction__os-icon">
          <img alt="" src={detectedOS} />
        </div>
        <div className="auction__osv">
          <span>{OSv}</span>
        </div>
        <div className="auction__all-options">
          <a>See all download options</a>
        </div>
      </div>
    )
  }
}

export default AuctionPanelDetectOS
