'use strict';

var BigNumber = require('bignumber.js');

var smartRounder = function smartRounder(maxPrecision, minDecimals, maxDecimals) {
  return function (number) {
    var bn = new BigNumber(number);

    // Calculate how much to reduce the precision
    var adjustment = Math.max(bn.precision() - maxPrecision, 0);

    // Calculate how much to reduce the decimals
    var decimals = Math.max(bn.decimalPlaces() - adjustment, minDecimals);

    return bn.toFixed(Math.min(decimals, maxDecimals));
  };
};

module.exports = smartRounder;
