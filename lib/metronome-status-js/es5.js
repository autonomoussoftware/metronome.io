'use strict';

var _require = require('promise-timeout'),
    timeout = _require.timeout;

var debug = require('debug')('metronome-status');
var EventEmitter = require('events');
var io = require('socket.io-client');
var MetronomeContracts = require('metronome-contracts');
var promiseAllProps = require('promise-all-props');
var Web3 = require('web3');

var _require2 = require('web3-utils'),
    toWei = _require2.toWei;

var CALL_TIMEOUT = 10000;
var POLL_INTERVAL = 5000;

var toInt = function toInt(str) {
  return Number.parseInt(str, 10);
};

var toMs = function toMs(secs) {
  return secs * 1000;
};

function initWeb3BlockSubscription(web3, handler) {
  var subscription = web3.eth.subscribe('newBlockHeaders');
  subscription.on('data', function () {
    return handler();
  });
  subscription.on('error', handler);

  return function () {
    subscription.unsubscribe();
  };
}

function initWeb3Polling(handler) {
  // Test the status every 5 secs so sampling rate > 2 * block frequency
  var id = setInterval(handler, POLL_INTERVAL);

  return function () {
    clearInterval(id);
  };
}

var defaultHeartbeat = {
  currAuction: 0,
  currentAuctionPrice: '0',
  minting: '0',
  nextAuctionGMT: 0
};

function getStatus(_ref) {
  var auctions = _ref.auctions,
      metToken = _ref.metToken,
      autonomousConverter = _ref.autonomousConverter;

  return promiseAllProps({
    genesisTime: auctions.methods.genesisTime().call(),
    heartbeat: auctions.methods.heartbeat().call().catch(function () {
      return defaultHeartbeat;
    }),
    lastPurchasePrice: auctions.methods.lastPurchasePrice().call(),
    lastPurchaseTick: auctions.methods.lastPurchaseTick().call().then(toInt),
    tokenSupply: metToken.methods.totalSupply().call(),
    availableMet: autonomousConverter.methods.getMetBalance().call(),
    availableEth: autonomousConverter.methods.getEthBalance().call(),
    currentPrice: autonomousConverter.methods.getEthForMetResult(toWei('1')).call()
  }).then(function (_ref2) {
    var genesisTime = _ref2.genesisTime,
        _ref2$heartbeat = _ref2.heartbeat,
        currAuction = _ref2$heartbeat.currAuction,
        currentAuctionPrice = _ref2$heartbeat.currentAuctionPrice,
        minting = _ref2$heartbeat.minting,
        nextAuctionGMT = _ref2$heartbeat.nextAuctionGMT,
        lastPurchasePrice = _ref2.lastPurchasePrice,
        lastPurchaseTick = _ref2.lastPurchaseTick,
        tokenSupply = _ref2.tokenSupply,
        availableMet = _ref2.availableMet,
        availableEth = _ref2.availableEth,
        currentPrice = _ref2.currentPrice;
    return {
      auction: {
        currentAuction: toInt(currAuction),
        currentPrice: currentAuctionPrice,
        genesisTime: toMs(toInt(genesisTime)),
        lastPurchasePrice: lastPurchasePrice,
        lastPurchaseTime: toMs(toInt(genesisTime) + lastPurchaseTick * 60),
        nextAuctionStartTime: toMs(toInt(nextAuctionGMT)),
        tokenSupply: tokenSupply,
        tokensRemaining: minting
      },
      converter: {
        availableMet: availableMet,
        availableEth: availableEth,
        currentPrice: currentPrice
      }
    };
  });
}

function createWeb3Stream(currentProvider) {
  var web3 = new Web3(currentProvider);

  var stream = new EventEmitter();

  var getContract = timeout(web3.eth.net.getId(), CALL_TIMEOUT).then(function (id) {
    return new MetronomeContracts(web3, id);
  }).catch(function (err) {
    debug('Could not get Auctions contract: %s', err.message);
    stream.destroy(err);
  });

  function getAndEmitStatus(err) {
    if (err) {
      stream.emit('error', err);
      return;
    }

    getContract.then(getStatus).then(function (status) {
      stream.emit('data', status);
    }).catch(function (err) {
      stream.emit('error', err);
    });
  }

  getAndEmitStatus();

  var destroy = void 0;

  try {
    destroy = initWeb3BlockSubscription(web3, getAndEmitStatus);
  } catch (err) {
    debug('Could not subscribe to web3 block events: %s', err.message);

    destroy = initWeb3Polling(getAndEmitStatus);
  }

  stream.destroy = function (err) {
    destroy();

    stream.emit('error', err);
    stream.emit('close');
  };

  return stream;
}

function createMetApiStream(url) {
  var socket = io(url);

  var stream = new EventEmitter();

  socket.on('status-updated', function (status) {
    var auction = status.auction;

    // Fix property names coming from the API

    auction.tokensRemaining = auction.tokenRemaining;

    // Fix property types
    auction.currentAuction = toInt(auction.currentAuction);

    // Transform sec times in ms as times in JS are all ms
    auction.genesisTime = toMs(auction.genesisTime);
    auction.lastPurchaseTime = toMs(auction.lastPurchaseTime);
    auction.nextAuctionStartTime = toMs(auction.nextAuctionStartTime);

    stream.emit('data', status);
  });

  socket.on('error', function (err) {
    stream.emit('error', err);
  });

  stream.destroy = function (err) {
    socket.close();

    stream.emit('error', err);
    stream.emit('close');
  };

  return stream;
}

function createStatusStream(_ref3) {
  var web3currentProvider = _ref3.web3currentProvider,
      metApiUrl = _ref3.metApiUrl;

  return web3currentProvider ? createWeb3Stream(web3currentProvider) : createMetApiStream(metApiUrl);
}

module.exports = createStatusStream;
