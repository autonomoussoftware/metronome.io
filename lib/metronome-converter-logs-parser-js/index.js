'use strict'

const converterAbi = require('metronome-contracts/src/abis/AutonomousConverter')
const Web3 = require('web3')

const web3 = new Web3()

const ConvertEthToMet = converterAbi.find(function (e) {
  return e.name === 'ConvertEthToMet'
})

function encodeEventSignature (event) {
  return web3.eth.abi.encodeEventSignature(event)
}

ConvertEthToMet.signature = encodeEventSignature(ConvertEthToMet)

function decodeLog (event, log) {
  return web3.eth.abi.decodeLog(event.inputs, log.data, log.topics.slice(1))
}

function converterLogsParser (logs) {
  return logs
    .filter(function (log) {
      return log.topics[0] === ConvertEthToMet.signature
    })
    .map(function (log) {
      return Object.assign(log, { decoded: decodeLog(ConvertEthToMet, log) })
    })
}

module.exports = converterLogsParser
