import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import withWeb3 from '../hocs/withWeb3'

const LOCALSTORAGE_KEY = 'tokenIsRegistered'

class RegisterToken extends React.Component {
  static propTypes = {
    metTokenAddress: PropTypes.string.isRequired,
    web3: PropTypes.shape({
      currentProvider: PropTypes.shape({
        sendAsync: PropTypes.func.isRequired
      }).isRequired
    })
  }

  componentDidMount() {
    const { metTokenAddress, web3 } = this.props

    // Avoid registering MET token if no MetaMask or if already registered
    if (!web3 || window.localStorage.getItem(LOCALSTORAGE_KEY) === 'true') {
      return
    }

    web3.currentProvider.sendAsync(
      {
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            decimals: 18,
            address: metTokenAddress,
            symbol: 'MET',
            image: `${
              process.env.NODE_ENV === 'production' ? 'https' : 'http'
            }://${window.location.host}/MET.svg`,
            id: Math.round(Math.random() * 100000)
          }
        }
      },
      (err, { result }) => {
        // eslint-disable-next-line no-console
        if (err) return console.warn(err)

        if (result) {
          window.localStorage.setItem(LOCALSTORAGE_KEY, 'true')
          // eslint-disable-next-line no-console
          console.log('Token successfully registered on MetaMask.')
        }
      }
    )
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  metTokenAddress: state.config.chains[state.chain.active].metTokenAddress
})

export default connect(mapStateToProps)(withWeb3(RegisterToken))
