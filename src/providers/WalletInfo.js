import MetronomeContracts from 'metronome-contracts'
import promiseAllProps from 'promise-all-props'
import startInterval from 'startinterval2'
import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withWeb3 from '../hocs/withWeb3'

class WalletInfo extends Component {
  static propTypes = {
    metTokenAddress: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    chainId: PropTypes.string.isRequired,
    web3: PropTypes.shape({
      eth: PropTypes.shape({
        getAccounts: PropTypes.func.isRequired,
        Contract: PropTypes.func.isRequired,
        net: PropTypes.shape({
          getId: PropTypes.func.isRequired
        }).isRequired
      }).isRequired
    })
  }

  constructor(props) {
    super(props)
    const abi = MetronomeContracts[props.chainId].METToken.abi
    this.contract = props.web3
      ? new props.web3.eth.Contract(abi, props.metTokenAddress)
      : null
  }

  componentDidMount() {
    const { dispatch, web3 } = this.props

    if (!web3) {
      return
    }

    this.interval = startInterval(() => {
      promiseAllProps({
        address: web3.eth
          .getAccounts()
          .then(acc => (acc && acc.length > 0 ? acc[0] : null)),
        chainId: web3.eth.net.getId().then(id => id.toString())
      })
        .then(payload =>
          // wallet might be not logged in
          payload.address
            ? Promise.all([
                web3.eth.getBalance(payload.address),
                this.contract
                  ? this.contract.methods.balanceOf(payload.address).call()
                  : Promise.resolve('0')
              ]).then(([balance, metBalance]) => ({
                metBalance,
                balance,
                ...payload
              }))
            : payload
        )
        .then(payload => dispatch({ type: 'UPDATE_WALLET_INFO', payload }))
        .catch(function(err) {
          // eslint-disable-next-line no-console
          console.error('Could not get wallet info', err.message)
        })
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  metTokenAddress: state.config.chains[state.chain.active].metTokenAddress,
  chainId: state.chain.active
})

export default connect(mapStateToProps)(withWeb3(WalletInfo))
