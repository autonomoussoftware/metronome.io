const {
  REACT_APP_GA_TRACKING_ID,
  REACT_APP_ENABLED_CHAINS,
  REACT_APP_SENTRY_DNS,
  NODE_ENV
} = process.env

const enabledChains = (REACT_APP_ENABLED_CHAINS || 'ethMainnet')
  .split(',')
  .map(name => name.trim())

const chains = enabledChains.reduce(function(allChains, chainName) {
  const cfg = require(`./${chainName}`).default
  allChains[cfg.chainId] = cfg
  return allChains
}, {})

module.exports = {
  ratesUpdateMs: 30000,
  enabledChains,
  chains,
  env: NODE_ENV,
  gaTrackingId: REACT_APP_GA_TRACKING_ID || 'UA-116275666-1',
  sentryDns:
    REACT_APP_SENTRY_DNS ||
    'https://1365248ca55742a9aa18902e80db608b@sentry.io/1231118',
  googlePlayUrl:
    'https://play.google.com/store/apps/details?id=sh.autonomous.wallet.mobile',
  appStoreUrl: 'https://itunes.apple.com/app/id1434362697'
}
