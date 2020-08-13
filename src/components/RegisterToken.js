import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import withWeb3 from '../hocs/withWeb3'

class RegisterToken extends React.Component {
  static propTypes = {
    metTokenAddress: PropTypes.string.isRequired,
    address: PropTypes.string,
    chainId: PropTypes.string,
    web3: PropTypes.shape({
      currentProvider: PropTypes.shape({
        request: PropTypes.func.isRequired
      }).isRequired
    })
  }

  getStorageKey = () =>
    `isTokenRegistered-${this.props.chainId}-${this.props.address}`

  shouldRegisterToken = () =>
    this.props.address &&
    this.props.chainId &&
    this.props.web3 &&
    window.localStorage.getItem(this.getStorageKey()) !== 'true'

  registerToken = () => {
    // Avoid registering MET token if no MetaMask, not logged in to MM,
    // incorrect network or if token is already registered.
    if (
      !this.props.address ||
      !this.props.chainId ||
      !this.props.web3 ||
      window.localStorage.getItem(this.getStorageKey()) === 'true'
    ) {
      return
    }

    this.props.web3.currentProvider.request(
      {
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            decimals: 18,
            address: this.props.metTokenAddress,
            symbol: 'MET',
            image: `${window.location.origin}/MET.svg`,
            id: Math.round(Math.random() * 100000)
          }
        }
      }).then(() => {
        window.localStorage.setItem(this.getStorageKey(), 'true')
        // eslint-disable-next-line no-console
        console.log('Token successfully registered on MetaMask.')
      }).catch(err =>
        // eslint-disable-next-line no-console
        console.warn(err))

  }

  componentDidMount() {
    this.registerToken()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.chainId !== this.props.chainId ||
      prevProps.address !== this.props.address
    ) {
      this.registerToken()
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  metTokenAddress: state.config.chains[state.chain.active].metTokenAddress,
  chainId:
    state.chain.active === state.wallet.chainId ? state.wallet.chainId : null,
  address: state.wallet.address
})

export default connect(mapStateToProps)(withWeb3(RegisterToken))
