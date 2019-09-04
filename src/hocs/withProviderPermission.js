import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  background: #ff00001f;
  font-size: 13px;
  color: #bc1818;
  padding: 8px;
  line-height: 1.5;
  margin-top: 24px;
  border-radius: 2px;

  button {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    text-decoration: underline;
    outline: none;
  }
`

function withProviderPermission(WrappedComponent) {
  class Container extends Component {
    static propTypes = {
      updatePermissionStatus: PropTypes.func.isRequired,
      permissionStatus: PropTypes.oneOf(['not-asked', 'granted', 'denied'])
        .isRequired
    }

    askForPermission = () => {
      if (window.ethereum) {
        window.ethereum
          .enable()
          .then(() => this.props.updatePermissionStatus('granted'))
          .catch(() => this.props.updatePermissionStatus('denied'))
      }
    }

    componentDidMount() {
      if (this.props.permissionStatus === 'not-asked') {
        this.askForPermission()
      }
    }

    PermissionMessage = ({ web3Provider }) =>
      this.props.permissionStatus === 'denied' ? (
        <ErrorMessage>
          You must grant {web3Provider} permission to connect to your account.{' '}
          <button onClick={this.askForPermission} type="button">
            Connect Now
          </button>
        </ErrorMessage>
      ) : null

    render() {
      return (
        <WrappedComponent
          PermissionMessage={this.PermissionMessage}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = state => ({
    permissionStatus: state.wallet.permissionStatus
  })

  const mapDispatchToProps = dispatch => ({
    updatePermissionStatus: permissionStatus =>
      dispatch({ type: 'UPDATE_WALLET_INFO', payload: { permissionStatus } })
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Container)
}

export default withProviderPermission
