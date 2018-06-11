import Contracts from 'metronome-contracts'

const {
  REACT_APP_CHAIN,
  REACT_APP_MET_API_URL
} = process.env

export default {
  auctionsAddress: Contracts.addresses[REACT_APP_CHAIN || 'mainnet'].auctions,
  defaultGasPrice: '1000000000',
  metApiUrl: REACT_APP_MET_API_URL || 'https://api.metronome.io'
}
