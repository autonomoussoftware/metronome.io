import BigNumber from 'bignumber.js'
import React from 'react'
import smartRounder from 'smart-round'

const smartRound = smartRounder(6, 0, 6)

const MetValue = ({ children }) => (
  <span>{smartRound(new BigNumber(children).div(1e18))} MET</span>
)

export default MetValue
