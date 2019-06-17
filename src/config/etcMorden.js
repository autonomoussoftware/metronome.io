import MetronomeContracts from 'metronome-contracts'

const contracts = MetronomeContracts.morden

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
  metApiUrl: process.env.REACT_APP_MORDEN_API_URL || 'http://localhost:3012/',

  gasOverestimation: 1.1,

  // defaults
  coinDefaultGasLimit: '21000',
  metDefaultGasLimit: '250000',
  defaultGasPrice: '1000000000',
  maxGasPrice: '20000000000000000'
}
