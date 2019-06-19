import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reactDOM from 'react-dom'

const ROOT_NODE_ID = 'desktop-downloads'

export default class DesktopDownloads extends Component {
  static propTypes = {
    walletInstallers: PropTypes.shape({
      'Mac OS': PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired,
      Windows: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired,
      Ubuntu: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    baseReleaseUrl: PropTypes.string.isRequired
  }

  render() {
    const { walletInstallers, baseReleaseUrl } = this.props

    const element = document.getElementById(ROOT_NODE_ID)

    if (!element) {
      // eslint-disable-next-line no-console
      console.warn(
        `A node with id "${ROOT_NODE_ID}" could not be found in the document. Desktop downloads links were not rendered.`
      )
      return null
    }

    return reactDOM.createPortal(
      <ul className="list-unstyled">
        <li className="mb-2">
          <a
            href={walletInstallers['Mac OS'].url}
            className="btn btn-primary w-75 text-left"
          >
            Download for Mac OS &raquo;
          </a>
        </li>
        <li className="mb-2">
          <a
            href={walletInstallers['Windows'].url}
            className="btn btn-primary w-75 text-left"
          >
            Download for Windows &raquo;
          </a>
        </li>
        <li className="mb-2">
          <a
            href={walletInstallers['Ubuntu'].url}
            className="btn btn-primary w-75 text-left"
          >
            Download for Linux &raquo;
          </a>
        </li>
        <li className="mb-2">
          <a
            href={baseReleaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-default w-75 text-left txt-mute"
          >
            View All Releases &raquo;
          </a>
        </li>
      </ul>,
      element
    )
  }
}
