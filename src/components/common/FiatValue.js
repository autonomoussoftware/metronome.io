import smartRounder from 'smart-round'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import React from 'react'

const smartRound = smartRounder(10, 2, 2)

const FiatValue = ({ children, suffix }) => (
  <span>
    {smartRound(new BigNumber(children), true)} {suffix}
  </span>
)

FiatValue.propTypes = {
  children: PropTypes.node,
  suffix: PropTypes.string
}

export default FiatValue
