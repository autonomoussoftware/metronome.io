import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DesktopDownloads from './DesktopDownloads'
import MobileDownloads from './MobileDownloads'
import downloadHelper from '../../download-helper'

class Wallet extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const {
      walletInstallers,
      walletInstaller,
      baseReleaseUrl,
      currentOS
    } = downloadHelper(this.props.desktopAppVersion)

    return (
      walletInstaller && (
        <React.Fragment>
          <a className="btn btn-primary mr-4 mb-2" href={walletInstaller.url}>
            Download For {currentOS.name} &raquo;
          </a>
          <DesktopDownloads
            walletInstallers={walletInstallers}
            baseReleaseUrl={baseReleaseUrl}
          />
          <MobileDownloads walletInstallers={walletInstallers} />
        </React.Fragment>
      )
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(Wallet)
