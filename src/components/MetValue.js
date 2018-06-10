import BigNumber from 'bignumber.js'
import React from 'react'
import smartRounder from 'smart-round'

const smartRound = smartRounder(6, 0, 6)

const fromUnit = {
  ether: 1,
  wei: 1e18
}

const MetValue = ({ children, unit = 'wei' }) => (
  <span>{smartRound(new BigNumber(children).div(fromUnit[unit]))} MET</span>
)

export default MetValue
