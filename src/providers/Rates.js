import startInterval from 'startinterval2'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toWei } from 'web3-utils'
import React from 'react'

import config from '../config'

class Rates extends React.Component {
  static propTypes = {
    onData: PropTypes.func.isRequired
  }

  intervals = []

  fetchData = id =>
    fetch(`https://api.coincap.io/v2/assets/${id}`)
      .then(res => res.json())
      .then(({ data }) => {
        if (data && data.symbol && data.priceUsd) {
          return {
            type: data.symbol,
            value: parseFloat(data.priceUsd, 10),
            supply: data.supply ? toWei(data.supply) : null,
            marketCapUsd: data.marketCapUsd
          }
        }
        Promise.reject(new Error('Invalid rate API response'))
      })
      .then(this.props.onData)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(`Could not get ${id} rate: `, err.message)
      })

  componentDidMount() {
    this.intervals = Object.keys(config.chains)
      .map(chainId =>
        startInterval(
          () => this.fetchData(config.chains[chainId].coincapId),
          config.ratesUpdateMs
        )
      )
      .concat(
        startInterval(() => this.fetchData('metronome'), config.ratesUpdateMs)
      )
  }

  componentWillMount() {
    this.intervals.map(interval => clearInterval(interval))
    this.intervals = []
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  onData: payload => dispatch({ type: 'UPDATE_RATE', payload })
})

export default connect(
  null,
  mapDispatchToProps
)(Rates)
