import smartRounder from 'smart-round'
import { fromWei } from 'web3-utils'
import PropTypes from 'prop-types'
import React from 'react'

const smartRound = smartRounder(6, 0, 6)

const EthValue = ({ children }) =>
  !children && children !== 0 ? (
    <span className="blink">...</span>
  ) : (
    <span>{smartRound(fromWei(children), true)} ETH</span>
  )

EthValue.propTypes = {
  children: PropTypes.node
}

export default EthValue
