import React, { Component } from 'react'

import lock from '../img/lock-outline-24-px.svg'

class AuctionCopyClipboard extends Component {
  constructor (props) {
    super(props)
    this.state = { copied: false }
  }

  // eslint-disable-next-line arrow-body-style
  copyMyClipboard = () => {
    const copyText = document.getElementById('copyAddress')
    copyText.select()
    document.execCommand('copy')

    const component = this
    component.setState({ copied: true })
    setTimeout(function () {
      component.setState({ copied: false })
    }, 500)
  }

  render () {
    const { publicAddress } = this.props

    return (
      <div className="AuctionCopyClipboard">
        <div className="auction__address-label">
          <div className="auction__address-icon">
            <img alt="" src={lock} />
          </div>
          <div className="auction__address-text">
            <h2>Address</h2>
          </div>
        </div>

        <input
          id="copyAddress"
          type="text"
          className="auction__address-input"
          value={publicAddress}
          readOnly>
        </input>

        <a className="btn btn-copy-address" onClick={this.copyMyClipboard}>
          <span>{this.state.copied
            ? 'Address Copied!'
            : 'Copy Address to Clipboard'
          }</span>
        </a>
      </div>
    )
  }
}

export default AuctionCopyClipboard
