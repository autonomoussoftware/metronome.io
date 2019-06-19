import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reactDOM from 'react-dom'

const ROOT_NODE_ID = 'mobile-downloads'

export default class MobileDownloads extends Component {
  static propTypes = {
    walletInstallers: PropTypes.shape({
      Android: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
      iOS: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired
    }).isRequired
  }

  render() {
    const { walletInstallers } = this.props

    const element = document.getElementById(ROOT_NODE_ID)

    if (!element) {
      // eslint-disable-next-line no-console
      console.warn(
        `A node with id "${ROOT_NODE_ID}" could not be found in the document. Mobile downloads links were not rendered.`
      )
      return null
    }

    return reactDOM.createPortal(
      <React.Fragment>
        <a
          className="mr-2"
          href={walletInstallers.iOS.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../dist/images/apple-download.png"
            alt="Apple app download"
          />
        </a>
        <a
          href={walletInstallers.Android.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../dist/images/android-download.png"
            alt="Android app download"
          />
        </a>
      </React.Fragment>,
      element
    )
  }
}
