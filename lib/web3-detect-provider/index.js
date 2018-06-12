'use strict'

// eslint-disable-next-line complexity
function detectProvider () {
  if (typeof window !== 'object' ||
    typeof window.web3 !== 'object' ||
    typeof window.web3.currentProvider !== 'object') {
    return 'none'
  }

  if (window.web3.currentProvider.isMetaMask) {
    return 'MetaMask'
  }

  if (window.web3.currentProvider.isTrust) {
    return 'Trust'
  }

  if (typeof window.SOFA !== 'undefined') {
    return 'Toshi'
  }

  if (typeof window.__CIPHER__ !== 'undefined') {
    return 'Cipher'
  }

  if (window.web3.currentProvider.constructor.name === 'EthereumProvider') {
    return 'Mist'
  }

  if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider') {
    return 'Parity'
  }

  if (window.web3.currentProvider.host &&
    window.web3.currentProvider.host.indexOf('infura') !== -1) {
    return 'Infura'
  }

  return 'unknown'
}

module.exports = detectProvider
