import { connect } from 'react-redux'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 9999;
  right: 0;
  left: 0;
  padding: 4px;
  background: rgba(248, 123, 97, 1);
  text-align: center;
  font-size: 12px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
`

const ChainWarning = ({ isCorrectChain, configChain }) => !isCorrectChain && (
  <Container>
    Wrong chain - Connect wallet to {configChain}.
  </Container>
)

const mapStateToProps = state => ({
  isCorrectChain: typeof state.wallet.chain === 'undefined' ||
    state.wallet.chain === state.config.chain,
  configChain: state.config.chain
})

export default connect(mapStateToProps)(ChainWarning)
