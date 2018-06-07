'use strict'

const EventEmitter = require('events')
const io = require('socket.io-client')
const MetronomeContracts = require('metronome-contracts')
const Web3 = require('web3')
const promiseAllProps = require('promise-all-props')

function getNetworkName (id) {
  return [undefined, 'mainnet', undefined, 'ropsten'][id]
}

function initWeb3BlockSubscription (web3, handler) {
  const subscription = web3.eth.subscribe('newBlockHeaders')
  subscription.on('data', handler)
  subscription.on('error', handler)

  return function () {
    subscription.unsubscribe()
  }
}

function initWeb3Polling (handler) {
  // Test the status every 5 secs so sampling rate > 2 * block frequency
  const id = setInterval(handler, 5000)

  return function () {
    clearInterval(id)
  }
}

const toInt = str => Number.parseInt(str, 10)

function getAuctionStatus (auctions) {
  const defaultHeartbeat = { minting: 0, nextAuctionGMT: 0 }

  return promiseAllProps({
    heartbeat: auctions.methods.heartbeat().call().catch(() => defaultHeartbeat),
    lastPurchasePrice: auctions.methods.lastPurchasePrice().call(),
    lastPurchaseTick: auctions.methods.lastPurchaseTick().call().then(toInt)
  })
    .then(({
      heartbeat,
      lastPurchasePrice,
      lastPurchaseTick
    }) => ({
      currentAuction: toInt(heartbeat.currAuction),
      currentPrice: heartbeat.currentAuctionPrice,
      genesisTime: toInt(heartbeat.genesisGMT),
      lastPurchasePrice,
      lastPurchaseTime: toInt(heartbeat.genesisGMT) + (lastPurchaseTick * 60),
      nextAuctionStartTime: toInt(heartbeat.nextAuctionGMT),
      tokensRemaining: heartbeat.minting
    }))
}

function createWeb3Stream (currentProvider) {
  const web3 = new Web3(currentProvider)

  const stream = new EventEmitter()

  const getAuctionsContract = web3.eth.net.getId()
    .then(function (id) {
      return new MetronomeContracts(web3, getNetworkName(id))
    })
    .then(function (metronomeContracts) {
      return metronomeContracts.auctions
    })

  function getAndEmitAuctionsStatus (err) {
    if (err) {
      stream.emit('error', err)
      return
    }

    getAuctionsContract
      .then(getAuctionStatus)
      .then(function (status) {
        stream.emit('data', status)
      })
      .catch(function (err) {
        stream.emit('error', err)
      })
  }

  getAndEmitAuctionsStatus()

  let destroy

  try {
    destroy = initWeb3BlockSubscription(web3, getAndEmitAuctionsStatus)
  } catch (err) {
    destroy = initWeb3Polling(getAndEmitAuctionsStatus)
  }

  stream.destroy = function (err) {
    destroy()

    stream.emit('error', err)
    stream.emit('close')
  }

  return stream
}

function createMetApiStream (url) {
  const socket = io(url)

  const stream = new EventEmitter()

  socket.on('AUCTION_STATUS_TASK', function (status) {
    // Fix property name coming from the API
    status.tokensRemaining = status.tokenRemaining

    stream.emit('data', status)
  })

  stream.destroy = function (err) {
    socket.close()

    stream.emit('error', err)
    stream.emit('close')
  }

  return stream
}

function createAuctionStatusStream ({ web3currentProvider, metApiUrl }) {
  return web3currentProvider
    ? createWeb3Stream(web3currentProvider)
    : createMetApiStream(metApiUrl)
}

module.exports = createAuctionStatusStream
