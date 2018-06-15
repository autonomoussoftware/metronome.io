import BigNumber from 'bignumber.js'
import React from 'react'
import smartRounder from 'smart-round'

const smartRound = smartRounder(10, 2, 2)

const FiatValue = ({ children, suffix }) => (
  <span>{smartRound(new BigNumber(children))} {suffix}</span>
)

export default FiatValue
