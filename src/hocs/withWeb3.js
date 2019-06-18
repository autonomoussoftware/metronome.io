import React, { Component } from 'react'
import Web3 from 'web3'

function withWeb3(WrappedComponent) {
  class Container extends Component {
    constructor() {
      super()

      if (!window.web3 || !window.web3.currentProvider) {
        return
      }

      this.localWeb3 = new Web3(window.web3.currentProvider)
    }

    render() {
      return <WrappedComponent web3={this.localWeb3} {...this.props} />
    }
  }

  return Container
}

export default withWeb3
