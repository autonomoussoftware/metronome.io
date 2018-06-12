'use strict'

const auctionsAbi = require('metronome-contracts/src/abis/Auctions')
const Web3 = require('web3')

const web3 = new Web3()

const LogAuctionFundsIn = auctionsAbi.find(function (e) {
  return e.name === 'LogAuctionFundsIn'
})

function encodeEventSignature (event) {
  return web3.eth.abi.encodeEventSignature(event)
}

// '0xa3d6792be56a61c872a8e6d733ef6efe5e391cece4d5e9d2f37208fdab7dddfd'
LogAuctionFundsIn.signature = encodeEventSignature(LogAuctionFundsIn)

function decodeLog (event, log) {
  return web3.eth.abi.decodeLog(event.inputs, log.data, log.topics.slice(1))
}

function auctionLogsParser (logs) {
  return logs
    .filter(function (log) {
      return log.topics[0] === LogAuctionFundsIn.signature
    })
    .map(function (log) {
      return Object.assign(log, { decoded: decodeLog(LogAuctionFundsIn, log) })
    })
}

module.exports = auctionLogsParser
