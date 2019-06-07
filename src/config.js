import Contracts from 'metronome-contracts'

const {
  REACT_APP_CHAIN,
  REACT_APP_GA_TRACKING_ID,
  REACT_APP_MET_API_URL,
  REACT_APP_MET_EXPLORER_URL,
  REACT_APP_SENTRY_DNS,
  NODE_ENV
} = process.env

const defaultChain = REACT_APP_CHAIN || 'mainnet'

export default {
  auctionsAddress: Contracts.addresses[defaultChain].auctions,
  chain: defaultChain,
  defaultGasPrice: '1000000000',
  gaTrackingId: REACT_APP_GA_TRACKING_ID || 'UA-116275666-1',
  metApiUrl: REACT_APP_MET_API_URL || 'https://api.metronome.io',
  metExplorerUrl: REACT_APP_MET_EXPLORER_URL || 'https://explorer.metronome.io',
  sentryDns:
    REACT_APP_SENTRY_DNS ||
    'https://1365248ca55742a9aa18902e80db608b@sentry.io/1231118',
  googlePlayUrl:
    'https://play.google.com/store/apps/details?id=sh.autonomous.wallet.mobile',
  appStoreUrl: 'https://itunes.apple.com/app/id1434362697',
  env: NODE_ENV
}
