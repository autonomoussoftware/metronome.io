import { fromWei } from 'web3-utils'
import { connect } from 'react-redux'
import smartRounder from 'smart-round'
import React, { Component } from 'react'

import CoinCapRate from '../providers/CoinCapRate'

const smartRound = smartRounder(6, 0, 6)

class DollarValue extends Component {
  render () {
    const { updateEthUsdRate, children, rates } = this.props
    return (
      <span>
        <CoinCapRate onData={updateEthUsdRate}/>
        {rates.ETH_USD &&
          children &&
          `$${smartRound(fromWei(children) * rates.ETH_USD)} USD`}
      </span>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

const mapStateToProps = state => ({
  rates: state.rates
})

export default connect(mapStateToProps, mapDispatchToProps)(DollarValue)
