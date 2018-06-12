import React, { Component } from 'react'

import { baseWalletURL, walletInstaller } from '../download-helper'

class AppsDownloadButton extends Component {
  render () {
    return (
      <a {...{ href: `${baseWalletURL}.${walletInstaller.ext}` }} className="btn">Download For {walletInstaller.os}</a>
    )
  }
}

export default AppsDownloadButton
