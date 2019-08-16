import React, { Component } from 'react'
import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import PropTypes from 'prop-types'

const smartRound = smartRounder(6, 2, 4)

class DollarValue extends Component {
  static propTypes = {
    children: PropTypes.node,
    rate: PropTypes.number
  }

  render() {
    const { children, rate } = this.props

    return (
      <span>
        {rate && children && `$${smartRound(fromWei(children) * rate)} USD`}
      </span>
    )
  }
}

const mapStateToProps = state => ({
  rate: state.rates[state.config.chains[state.chain.active].symbol]
})

export default connect(mapStateToProps)(DollarValue)
