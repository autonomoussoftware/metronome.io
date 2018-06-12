import { Component } from 'react'
import coincap from 'coincap-lib'
import throttle from 'lodash.throttle'

class CoinCapRate extends Component {
  componentDidMount () {
    const emitPrice = throttle(
      this.props.onData,
      15000,
      { leading: true, trailing: false }
    )

    coincap.on('trades', function (trade) {
      const { coin, market_id: marketId, msg: { price } } = trade

      if (coin !== 'ETH' || marketId !== 'ETH_USD') {
        return
      }
      if (typeof price !== 'number') {
        return
      }

      emitPrice(price)
    })

    coincap.open()
  }

  componentWillUnmount () {
    coincap.off('trades')

    coincap.close()
  }

  render () {
    return null
  }
}

export default CoinCapRate
