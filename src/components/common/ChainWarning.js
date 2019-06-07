import { connect } from 'react-redux'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  right: 0;
  left: 0;
  padding: 4px;
  text-align: center;
  font-size: 14px;
  color: #ae5b11;
  background: rgb(255, 185, 122);

  .site-header.fixed-top + #top & {
    top: 54px;
  }
`

const ChainWarning = ({ isCorrectChain, configChain }) =>
  !isCorrectChain && (
    <Container>Wrong chain - Connect wallet to {configChain}</Container>
  )

const mapStateToProps = state => ({
  isCorrectChain:
    typeof state.wallet.chain === 'undefined' ||
    state.wallet.chain === state.config.chain,
  configChain: state.config.chain
})

export default connect(mapStateToProps)(ChainWarning)
