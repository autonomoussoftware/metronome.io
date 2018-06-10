import { connect } from 'react-redux'
import React, { Component } from 'react'
import Web3 from 'web3'
import startInterval from 'startinterval2'

function withUserInfo (WrappedComponent) {
  class Container extends Component {
    componentDidMount () {
      const { updateAccounts } = this.props

      if (!window.web3 || !window.web3.currentProvider) {
        return
      }

      const localWeb3 = new Web3(window.web3.currentProvider)

      this.interval = startInterval(function () {
        localWeb3.eth.getAccounts()
          .then(updateAccounts)
          .catch(function (err) {
            // eslint-disable-next-line no-console
            console.error('Could not get user accounts', err.message)
          })
      }, 2000)
    }

    componentWillUnmount () {
      clearInterval(this.interval)
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  function mapStateToProps (state) {
    return {
      user: state.user
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      updateAccounts: accounts => dispatch({
        type: 'UPDATE_USER_ACCOUNTS',
        payload: accounts
      })
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Container)
}

export default withUserInfo
