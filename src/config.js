import Contracts from 'metronome-contracts'

export default {
  auctionsAddress: Contracts.addresses[process.env.REACT_APP_NET_ID].auctions,
  defaultGasPrice: '1000000000',
  metApiUrl: process.env.REACT_APP_MET_API_URL
}
