import promiseAllProps from 'promise-all-props'
import startInterval from 'startinterval2'
import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withWeb3 from '../hocs/withWeb3'

function chainIdToName(id) {
  return [null, 'mainnet', null, 'ropsten'][id]
}

class WalletInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    web3: PropTypes.shape({
      eth: PropTypes.shape({
        getAccounts: PropTypes.func.isRequired,
        net: PropTypes.shape({
          getId: PropTypes.func.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }

  componentDidMount() {
    const { dispatch, web3 } = this.props

    if (!web3) {
      return
    }

    this.interval = startInterval(function() {
      promiseAllProps({
        accounts: web3.eth.getAccounts(),
        chain: web3.eth.net.getId().then(chainIdToName)
      })
        .then(payload => dispatch({ type: 'UPDATE_WALLET_INFO', payload }))
        .catch(function(err) {
          // eslint-disable-next-line no-console
          console.error('Could not get wallet info', err.message)
        })
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return null
  }
}

export default connect()(withWeb3(WalletInfo))
