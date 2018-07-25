import styled, { keyframes } from 'styled-components'
import smartRounder from 'smart-round'
import { fromWei } from 'web3-utils'
import PropTypes from 'prop-types'
import React from 'react'

const Container = styled.span`
  white-space: nowrap;
`

const blink = keyframes`
  50% {
    opacity: 0;
  }
`

const Pending = styled.span`
  animation: ${blink} 1s linear infinite;
`

const smartRound = smartRounder(6, 0, 6)

const EthValue = ({ children }) =>
  !children && children !== 0 ? (
    <Pending>...</Pending>
  ) : (
    <Container>{smartRound(fromWei(children), true)} ETH</Container>
  )

EthValue.propTypes = {
  children: PropTypes.string
}

export default EthValue
