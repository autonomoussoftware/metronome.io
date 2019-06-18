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

const ChainWarning = ({ isCorrectChain, chains }) =>
  !isCorrectChain && (
    <Container>
      Unsupported chain. Connect wallet to a valid chain:{' '}
      {chains
        .map(({ displayName, chainId }) => `${displayName} (id: ${chainId})`)
        .join(', ')}
    </Container>
  )

const mapStateToProps = state => ({
  isCorrectChain:
    state.wallet.chainId === null ||
    Object.keys(state.config.chains).includes(state.wallet.chainId),
  chains: Object.values(state.config.chains)
})

export default connect(mapStateToProps)(ChainWarning)
