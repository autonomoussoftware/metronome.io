import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import reactDOM from 'react-dom'

const ROOT_NODE_ID = 'quick-buy'

class QuickBuyButton extends Component {
  static propTypes = {
    shouldConvert: PropTypes.bool.isRequired
  }

  render() {
    const { shouldConvert } = this.props

    const element = document.getElementById(ROOT_NODE_ID)

    if (!element) {
      // eslint-disable-next-line no-console
      console.warn(
        `A node with id "${ROOT_NODE_ID}" could not be found in the document. Quick Buy button was not rendered.`
      )
      return null
    }

    return reactDOM.createPortal(
      <div className="mt-5">
        <p className="font-weight-bold mb-1">
          <a href={shouldConvert ? '/converter' : '/auction'}>
            QUICK BUY &raquo;
          </a>
        </p>
        <p className="txt-purple font-italic">
          (selects the best buying option available)
        </p>
      </div>,
      element
    )
  }
}

const mapStateToProps = state => ({
  shouldConvert:
    !state.auction.status.isAuctionActive ||
    new BigNumber(state.auction.status.currentPrice).isGreaterThan(
      new BigNumber(state.converter.status.currentPrice)
    )
})

export default connect(mapStateToProps)(QuickBuyButton)
