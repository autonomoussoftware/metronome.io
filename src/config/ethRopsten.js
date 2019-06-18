import MetronomeContracts from 'metronome-contracts'

const contracts = MetronomeContracts.ropsten

export default {
  displayName: 'Ropsten',
  coincapId: 'ethereum',
  chainId: '3',
  symbol: 'ETH',

  // contracts addresses
  tokenPorterAddress: contracts.TokenPorter.address,
  converterAddress: contracts.AutonomousConverter.address,
  validatorAddress: contracts.Validator.address,
  metTokenAddress: contracts.METToken.address,
  auctionAddress: contracts.Auctions.address,

  // urls
  explorerUrl: 'https://ropsten.etherscan.io/tx/{{hash}}',
  metApiUrl: process.env.REACT_APP_ROPSTEN_API_URL || 'http://localhost:3002/',

  gasOverestimation: 1.1,

  // defaults
  coinDefaultGasLimit: '21000',
  metDefaultGasLimit: '250000',
  defaultGasPrice: '1000000000',
  maxGasPrice: '20000000000000000'
}
