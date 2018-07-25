import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import { Btn } from './Btn.js'
import lock from '../img/lock-outline-24-px.svg'

const Header = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`

const Icon = styled.img`
  vertical-align: middle;
  width: 20px;
  position: relative;
  top: -2px;
`

const Input = styled.input`
  font-size: 13px !important;
  letter-spacing: 1px;
  background-color: #3e3956 !important;
  width: 100%;
  margin: 0px 0px 15px 0px !important;
  background-color: #292929 !important;
  border: none !important;
  color: white !important;
  padding: 8px 0px 8px 15px !important;
  display: inline-block;
  line-height: 12px;
  box-sizing: border-box;
  vertical-align: middle;
  border-radius: 0;
  pointer-events: auto;

  &::selection {
    background-color: transparent;
  }
`

export default class AddressCopyClipboard extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired
  }

  state = { copied: false }

  addressField = React.createRef()

  // eslint-disable-next-line arrow-body-style
  copyMyClipboard = () => {
    if (!this.addressField.current) return
    this.addressField.current.select()
    document.execCommand('copy')
    this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 500)
  }

  render() {
    return (
      <div>
        <Header>
          <Icon alt="" src={lock} /> Address
        </Header>
        <Input
          innerRef={this.addressField}
          readOnly
          value={this.props.address}
          type="text"
        />
        <Btn block onClick={this.copyMyClipboard}>
          {this.state.copied ? 'Address Copied!' : 'Copy Address to Clipboard'}
        </Btn>
      </div>
    )
  }
}
