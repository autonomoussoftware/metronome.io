import { Component } from 'react'
import startInterval from 'startinterval2'

class UserInfo extends Component {
  componentDidMount () {
    const { onAccounts, web3 } = this.props

    if (!web3) {
      return
    }

    this.interval = startInterval(function () {
      web3.eth.getAccounts()
        .then(onAccounts)
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
    return null
  }
}

export default UserInfo
