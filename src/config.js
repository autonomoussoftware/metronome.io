import Contracts from 'metronome-contracts'

const {
  REACT_APP_CHAIN,
  REACT_APP_DESKTOP_APP_VERSION,
  REACT_APP_GA_TRACKING_ID,
  REACT_APP_MET_API_URL,
  REACT_APP_MET_EXPLORER_URL,
  REACT_APP_MET_HISTORY_URL
} = process.env

export default {
  auctionsAddress: Contracts.addresses[REACT_APP_CHAIN || 'mainnet'].auctions,
  defaultGasPrice: '1000000000',
  desktopAppVersion: REACT_APP_DESKTOP_APP_VERSION || 'v1.0.0',
  gaTrackingId: REACT_APP_GA_TRACKING_ID || 'UA-116275666-1',
  metApiUrl: REACT_APP_MET_API_URL || 'https://api.metronome.io',
  metExplorerUrl: REACT_APP_MET_EXPLORER_URL || 'https://explorer.metronome.io',
  metHistoryUrl: REACT_APP_MET_HISTORY_URL || 'https://api.metronome.io/history'
}
