import { Component } from 'react'
import promiseAllProps from 'promise-all-props'
import startInterval from 'startinterval2'

function chainIdToName (id) {
  return [null, 'mainnet', null, 'ropsten'][id]
}

class WalletInfo extends Component {
  componentDidMount () {
    const { onWalletInfo, web3 } = this.props

    if (!web3) {
      return
    }

    this.interval = startInterval(function () {
      promiseAllProps({
        accounts: web3.eth.getAccounts(),
        chain: web3.eth.net.getId().then(chainIdToName)
      })
        .then(onWalletInfo)
        .catch(function (err) {
          // eslint-disable-next-line no-console
          console.error('Could not get wallet info', err.message)
        })
    }, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return null
  }
}

export default WalletInfo
