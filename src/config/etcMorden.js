import MetronomeContracts from 'metronome-contracts'

const contracts = MetronomeContracts.morden

const {
  REACT_APP_MORDEN_INDEXER_URL,
  REACT_APP_MORDEN_API_URL,
  REACT_APP_MORDEN_NODE_URL
} = process.env

const indexerUrl = REACT_APP_MORDEN_INDEXER_URL || 'http://localhost:3015'
const metApiUrl = REACT_APP_MORDEN_API_URL || 'http://localhost:3012/'
const wsApiUrl = REACT_APP_MORDEN_NODE_URL || 'ws://localhost:8556'

export default {
  displayName: 'Morden',
  coincapId: 'ethereum-classic',
  chainId: '2',
  symbol: 'ETC',

  // contracts addresses
  tokenPorterAddress: contracts.TokenPorter.address,
  converterAddress: contracts.AutonomousConverter.address,
  validatorAddress: contracts.Validator.address,
  metTokenAddress: contracts.METToken.address,
  auctionAddress: contracts.Auctions.address,

  // urls
  explorerUrl: 'https://mordenexplorer.ethertrack.io/tx/{{hash}}',
  indexerUrl,
  metApiUrl,
  wsApiUrl,

  // defaults
  coinDefaultGasLimit: '21000',
  metDefaultGasLimit: '250000',
  defaultGasPrice: '1000000000',
  maxGasPrice: '20000000000000000'
}
