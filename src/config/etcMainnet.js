import MetronomeContracts from 'metronome-contracts'

const contracts = MetronomeContracts['classic']

module.exports = {
  displayName: 'Classic',
  coincapId: 'ethereum-classic',
  chainId: '61',
  symbol: 'ETC',

  // contracts addresses
  tokenPorterAddress: contracts.TokenPorter.address,
  converterAddress: contracts.AutonomousConverter.address,
  validatorAddress: contracts.Validator.address,
  metTokenAddress: contracts.METToken.address,
  auctionAddress: contracts.Auctions.address,

  // urls
  explorerUrl:
    'https://blockscout.com/etc/mainnet/tx/{{hash}}/internal_transactions',
  metApiUrl: 'https://etc.api.metronome.io/',

  gasOverestimation: 1.1,

  // defauls
  coinDefaultGasLimit: '21000',
  metDefaultGasLimit: '250000',
  defaultGasPrice: '10000000000',
  maxGasPrice: '200000000000000000'
}
