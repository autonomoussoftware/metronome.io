import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import PropTypes from 'prop-types'
import React from 'react'

const smartRound = smartRounder(6, 0, 6)

const EthValue = ({ children, symbol }) =>
  !children && children !== 0 ? (
    <span className="blink">...</span>
  ) : (
    <span>
      {smartRound(fromWei(children), true)} {symbol}
    </span>
  )

EthValue.propTypes = {
  children: PropTypes.node,
  symbol: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  symbol: state.config.chains[state.chain.active].symbol
})

export default connect(mapStateToProps)(EthValue)
