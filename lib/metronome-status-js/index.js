'use strict'

const { timeout } = require('promise-timeout')
const debug = require('debug')('metronome-status')
const EventEmitter = require('events')
const io = require('socket.io-client')
const MetronomeContracts = require('metronome-contracts')
const promiseAllProps = require('promise-all-props')
const Web3 = require('web3')
const { toWei } = require('web3-utils')

const CALL_TIMEOUT = 10000
const POLL_INTERVAL = 5000

const toInt = str => Number.parseInt(str, 10)

const toMs = secs => secs * 1000

function initWeb3BlockSubscription(web3, handler) {
  const subscription = web3.eth.subscribe('newBlockHeaders')
  subscription.on('data', () => handler())
  subscription.on('error', handler)

  return function() {
    subscription.unsubscribe()
  }
}

function initWeb3Polling(handler) {
  // Test the status every 5 secs so sampling rate > 2 * block frequency
  const id = setInterval(handler, POLL_INTERVAL)

  return function() {
    clearInterval(id)
  }
}

const defaultHeartbeat = {
  currAuction: 0,
  currentAuctionPrice: '0',
  minting: '0',
  nextAuctionGMT: 0
}

function getStatus({ auctions, metToken, autonomousConverter }) {
  return promiseAllProps({
    genesisTime: auctions.methods.genesisTime().call(),
    heartbeat: auctions.methods
      .heartbeat()
      .call()
      .catch(() => defaultHeartbeat),
    lastPurchasePrice: auctions.methods.lastPurchasePrice().call(),
    lastPurchaseTick: auctions.methods
      .lastPurchaseTick()
      .call()
      .then(toInt),
    tokenSupply: metToken.methods.totalSupply().call(),
    availableMet: autonomousConverter.methods.getMetBalance().call(),
    availableEth: autonomousConverter.methods.getEthBalance().call(),
    currentPrice: autonomousConverter.methods
      .getEthForMetResult(toWei('1'))
      .call()
  }).then(
    ({
      genesisTime,
      heartbeat: { currAuction, currentAuctionPrice, minting, nextAuctionGMT },
      lastPurchasePrice,
      lastPurchaseTick,
      tokenSupply,
      availableMet,
      availableEth,
      currentPrice
    }) => ({
      auction: {
        currentAuction: toInt(currAuction),
        currentPrice: currentAuctionPrice,
        genesisTime: toMs(toInt(genesisTime)),
        lastPurchasePrice,
        lastPurchaseTime: toMs(toInt(genesisTime) + lastPurchaseTick * 60),
        nextAuctionStartTime: toMs(toInt(nextAuctionGMT)),
        tokenSupply,
        tokensRemaining: minting
      },
      converter: {
        availableMet,
        availableEth,
        currentPrice
      }
    })
  )
}

function createWeb3Stream(currentProvider) {
  const web3 = new Web3(currentProvider)

  const stream = new EventEmitter()

  const getContract = timeout(web3.eth.net.getId(), CALL_TIMEOUT)
    .then(function(id) {
      return new MetronomeContracts(web3, id)
    })
    .catch(function(err) {
      debug('Could not get Auctions contract: %s', err.message)
      stream.destroy(err)
    })

  function getAndEmitStatus(err) {
    if (err) {
      stream.emit('error', err)
      return
    }

    getContract
      .then(getStatus)
      .then(function(status) {
        stream.emit('data', status)
      })
      .catch(function(err) {
        stream.emit('error', err)
      })
  }

  getAndEmitStatus()

  let destroy

  try {
    destroy = initWeb3BlockSubscription(web3, getAndEmitStatus)
  } catch (err) {
    debug('Could not subscribe to web3 block events: %s', err.message)

    destroy = initWeb3Polling(getAndEmitStatus)
  }

  stream.destroy = function(err) {
    destroy()

    stream.emit('error', err)
    stream.emit('close')
  }

  return stream
}

function createMetApiStream(url) {
  const socket = io(url)

  const stream = new EventEmitter()

  socket.on('status-updated', function(status) {
    const { auction } = status

    // Fix property names coming from the API
    auction.tokensRemaining = auction.tokenRemaining

    // Fix property types
    auction.currentAuction = toInt(auction.currentAuction)

    // Transform sec times in ms as times in JS are all ms
    auction.genesisTime = toMs(auction.genesisTime)
    auction.lastPurchaseTime = toMs(auction.lastPurchaseTime)
    auction.nextAuctionStartTime = toMs(auction.nextAuctionStartTime)

    stream.emit('data', status)
  })

  socket.on('error', function(err) {
    stream.emit('error', err)
  })

  stream.destroy = function(err) {
    socket.close()

    stream.emit('error', err)
    stream.emit('close')
  }

  return stream
}

function createStatusStream({ web3currentProvider, metApiUrl }) {
  return web3currentProvider
    ? createWeb3Stream(web3currentProvider)
    : createMetApiStream(metApiUrl)
}

module.exports = createStatusStream
