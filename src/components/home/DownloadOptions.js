import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import downloadHelper from '../../download-helper'
import Portal from '../common/Portal'

class DownloadOptions extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const { walletInstallers, walletInstaller } = downloadHelper(
      this.props.desktopAppVersion
    )

    return (
      walletInstaller && (
        <Portal selector="#download-options">
          <p className="my-4">
            Metronome Desktop Wallet is available on{' '}
            <a
              href={walletInstallers['Mac OS'].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mac
            </a>
            ,{' '}
            <a
              href={walletInstallers.Windows.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Windows
            </a>{' '}
            and{' '}
            <a
              href={walletInstallers.Ubuntu.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linux
            </a>
            . Metronome Mobile Wallet is available on{' '}
            <a
              href={walletInstallers.iOS.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              iOS
            </a>{' '}
            and{' '}
            <a
              href={walletInstallers.Android.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Android
            </a>
            .
          </p>
          <div className="my-4" id="mobile-downloads">
            <a
              href={walletInstallers.iOS.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Apple download"
                className="img-fluid mb-2"
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
                className="img-fluid mb-2"
                src="../dist/images/android-download.png"
                srcSet="../dist/images/gplay-btn.svg"
              />
            </a>
          </div>
        </Portal>
      )
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(DownloadOptions)
