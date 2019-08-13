import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import downloadHelper from '../../download-helper'

class Wallet extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const { walletInstallers, walletInstaller, currentOS } = downloadHelper(
      this.props.desktopAppVersion
    )

    return (
      walletInstaller && (
        <React.Fragment>
          <div className="my-4" id="mobile-downloads">
            <a
              href={walletInstallers.iOS.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Apple download"
                className="img-fluid mb-2 mb-sm-0"
                src="../dist/images/apple-download.png"
                srcSet="../dist/images/appstore-btn.svg"
              />
            </a>
            &nbsp;
            <a
              href={walletInstallers.Android.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Android Download"
                className="img-fluid"
                src="../dist/images/android-download.png"
                srcSet="../dist/images/gplay-btn.svg"
              />
            </a>
          </div>
          <a
            className="font-weight-500"
            href={walletInstaller.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD FOR {currentOS.name.toUpperCase()} &raquo;
          </a>
        </React.Fragment>
      )
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion,
  walletInstallers: PropTypes.shape({
    Android: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
    iOS: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired
  }).isRequired
})

export default connect(mapStateToProps)(Wallet)
