import MetronomeContracts from 'metronome-contracts'

const contracts = MetronomeContracts.ropsten

const {
  REACT_APP_ROPSTEN_INDEXER_URL,
  REACT_APP_ROPSTEN_API_URL,
  REACT_APP_ROPSTEN_NODE_URL
} = process.env

const indexerUrl = REACT_APP_ROPSTEN_INDEXER_URL || 'http://localhost:3005'
const metApiUrl = REACT_APP_ROPSTEN_API_URL || 'http://localhost:3002/'
const wsApiUrl = REACT_APP_ROPSTEN_NODE_URL || 'ws://localhost:8546'

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
  indexerUrl,
  metApiUrl,
  wsApiUrl,

  gasOverestimation: 1.1,

  // defaults
  coinDefaultGasLimit: '21000',
  metDefaultGasLimit: '250000',
  defaultGasPrice: '1000000000',
  maxGasPrice: '20000000000000000'
}
