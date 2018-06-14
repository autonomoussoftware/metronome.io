'use strict';

var _require = require('promise-timeout'),
    timeout = _require.timeout;

var BigNumber = require('bignumber.js');
var debug = require('debug')('metronome-auction-status');
var EventEmitter = require('events');
var io = require('socket.io-client');
var MetronomeContracts = require('metronome-contracts');
var promiseAllProps = require('promise-all-props');
var Web3 = require('web3');

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
  subscription.on('data', handler);
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

var defaultHeartbeat = { minting: 0, nextAuctionGMT: 0 };

function getAuctionStatus(_ref) {
  var auctions = _ref.auctions,
      metToken = _ref.metToken;

  return promiseAllProps({
    heartbeat: auctions.methods.heartbeat().call().catch(function () {
      return defaultHeartbeat;
    }),
    lastPurchasePrice: auctions.methods.lastPurchasePrice().call(),
    lastPurchaseTick: auctions.methods.lastPurchaseTick().call().then(toInt),
    tokenSupply: metToken.methods.totalSupply().call()
  }).then(function (_ref2) {
    var _ref2$heartbeat = _ref2.heartbeat,
        currAuction = _ref2$heartbeat.currAuction,
        currentAuctionPrice = _ref2$heartbeat.currentAuctionPrice,
        genesisGMT = _ref2$heartbeat.genesisGMT,
        minting = _ref2$heartbeat.minting,
        nextAuctionGMT = _ref2$heartbeat.nextAuctionGMT,
        lastPurchasePrice = _ref2.lastPurchasePrice,
        lastPurchaseTick = _ref2.lastPurchaseTick,
        tokenSupply = _ref2.tokenSupply;
    return {
      currentAuction: toInt(currAuction),
      currentPrice: currentAuctionPrice,
      genesisTime: toMs(toInt(genesisGMT)),
      lastPurchasePrice: lastPurchasePrice,
      lastPurchaseTime: toMs(toInt(genesisGMT) + lastPurchaseTick * 60),
      // Next auction start price will be 2x last purchase price unless the last
      // auction ended with unsold tokens. Contract functions that calculate
      // this as private so that logic should be replicated here.
      nextAuctionStartPrice: new BigNumber(lastPurchasePrice).times(2).toString(),
      nextAuctionStartTime: toMs(toInt(nextAuctionGMT)),
      tokenSupply: tokenSupply,
      tokensRemaining: minting
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

  function getAndEmitAuctionsStatus(err) {
    if (err) {
      stream.emit('error', err);
      return;
    }

    getContract.then(getAuctionStatus).then(function (status) {
      stream.emit('data', status);
    }).catch(function (err) {
      stream.emit('error', err);
    });
  }

  getAndEmitAuctionsStatus();

  var destroy = void 0;

  try {
    destroy = initWeb3BlockSubscription(web3, getAndEmitAuctionsStatus);
  } catch (err) {
    debug('Could not subscribe to web3 block events: %s', err.message);

    destroy = initWeb3Polling(getAndEmitAuctionsStatus);
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

  socket.on('AUCTION_STATUS_TASK', function (status) {
    // Fix property names coming from the API
    status.tokensRemaining = status.tokenRemaining;
    status.tokenSupply = status.tokenCirculation;

    // Transform sec times in ms as times in JS are all ms
    status.genesisTime = toMs(status.genesisTime);
    status.lastPurchaseTime = toMs(status.lastPurchaseTime);
    status.nextAuctionStartTime = toMs(status.nextAuctionStartTime);
    // See comments above on nextAuctionStartPrice calculation
    status.nextAuctionStartPrice = new BigNumber(status.lastPurchasePrice).times(2).toString();

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

function createAuctionStatusStream(_ref3) {
  var web3currentProvider = _ref3.web3currentProvider,
      metApiUrl = _ref3.metApiUrl;

  return web3currentProvider ? createWeb3Stream(web3currentProvider) : createMetApiStream(metApiUrl);
}

module.exports = createAuctionStatusStream;
