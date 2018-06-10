'use strict'

const BigNumber = require('bignumber.js')

const smartRounder = (maxPrecision, minDecimals, maxDecimals) =>
  function (number) {
    const bn = new BigNumber(number)

    // Calculate how much to reduce the precision
    const adjustment = Math.max(bn.precision() - maxPrecision, 0)

    // Calculate how much to reduce the decimals
    const decimals = Math.max(bn.decimalPlaces() - adjustment, minDecimals)

    return bn.toFixed(Math.min(decimals, maxDecimals))
  }

module.exports = smartRounder
