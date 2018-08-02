import UAParser from 'ua-parser-js'

export const isMobile = ['mobile', 'tablet'].includes(
  new UAParser().getDevice().type
)

export const useWallet = isMobile
  ? { name: 'Cipher', url: 'https://www.cipherbrowser.com/' }
  : { name: 'MetaMask', url: 'https://metamask.io' }

export function throwIfNull(obj) {
  if (!obj) {
    throw new Error('Object should not be null')
  }
  return obj
}

const chainNames = [null, 'mainnet', null, 'ropsten']

export function chainIdToName(id) {
  return chainNames[id]
}

export function chainNameToId(chainName) {
  const chainId = chainNames.findIndex(item => item === chainName)
  return chainId > -1 ? chainId : null
}
