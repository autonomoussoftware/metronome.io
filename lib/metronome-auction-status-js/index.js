'use strict'

const BigNumber = require('bignumber.js')
const debug = require('debug')('metronome-auction-status')
const EventEmitter = require('events')
const io = require('socket.io-client')
const MetronomeContracts = require('metronome-contracts')
const promiseAllProps = require('promise-all-props')
const Web3 = require('web3')

const toInt = str => Number.parseInt(str, 10)

const toMs = secs => secs * 1000

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

const defaultHeartbeat = { minting: 0, nextAuctionGMT: 0 }

function getAuctionStatus (auctions) {
  return promiseAllProps({
    heartbeat: auctions.methods.heartbeat().call().catch(() => defaultHeartbeat),
    lastPurchasePrice: auctions.methods.lastPurchasePrice().call(),
    lastPurchaseTick: auctions.methods.lastPurchaseTick().call().then(toInt)
  })
    .then(({
      heartbeat: {
        currAuction,
        currentAuctionPrice,
        genesisGMT,
        minting,
        nextAuctionGMT
      },
      lastPurchasePrice,
      lastPurchaseTick
    }) => ({
      currentAuction: toInt(currAuction),
      currentPrice: currentAuctionPrice,
      genesisTime: toMs(toInt(genesisGMT)),
      lastPurchasePrice,
      lastPurchaseTime: toMs(toInt(genesisGMT) + (lastPurchaseTick * 60)),
      // Next auction start price will be 2x last purchase price unless the last
      // auction ended with unsold tokens. Contract functions that calculate
      // this as private so that logic should be replicated here.
      nextAuctionStartPrice: new BigNumber(lastPurchasePrice).times(2).toString(),
      nextAuctionStartTime: toMs(toInt(nextAuctionGMT)),
      tokensRemaining: minting
    }))
}

function createWeb3Stream (currentProvider) {
  const web3 = new Web3(currentProvider)

  const stream = new EventEmitter()

  const getAuctionsContract = web3.eth.net.getId()
    .catch(function (err) {
      debug('Could not get network id: %s', err.message)

      // Should default to the mainnet id if error?
      return 1
    })
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
    debug('Could not subscribe to web3 block events: %s', err.message)

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

    // Transform sec times in ms as times in JS are all ms
    status.genesisTime = toMs(status.genesisTime)
    status.lastPurchaseTime = toMs(status.lastPurchaseTime)
    status.nextAuctionStartTime = toMs(status.nextAuctionStartTime)

    stream.emit('data', status)
  })

  socket.on('error', function (err) {
    stream.emit('error', err)
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
