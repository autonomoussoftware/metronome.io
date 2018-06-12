import React, { Component } from 'react'

import { currentOS, baseWalletURL, walletInstaller } from '../download-helper'

class AppsDownloadButton extends Component {
  render () {
    return (
      <a {...{ href: `${baseWalletURL}.${walletInstaller.ext}` }} className="btn">
        Download For {walletInstaller.os} {currentOS.version}
      </a>
    )
  }
}

export default AppsDownloadButton
