import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import config from '../../config'

const Container = styled.div`
  position: relative;
`

const Chevron = styled.i`
  color: #7e61f8;
  font-size: 14px;
  margin: -4px 0 0 8px;
  vertical-align: middle;

  [disabled] & {
    color: #aaa;
  }
`

const Toggle = styled.button`
  font-family: inherit;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.8px;
  color: rgb(51, 51, 53);
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover:not([disabled]),
  &:focus:not([disabled]),
  &:active:not([disabled]) {
    outline: none;
    color: #7e61f8;
  }

  &[disabled] {
    cursor: not-allowed;
    color: #aaa;
  }
`

const OptionsContainer = styled.div`
  background-color: #333335;
  position: absolute;
  left: -16px;
  right: -16px;
  min-width: 160px;
  padding: 4px 0;
`

const Option = styled.button`
  font-family: inherit;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.8px;
  background-color: transparent;
  border: none;
  padding: 8px 16px;
  margin: 0;
  cursor: pointer;
  display: block;
  width: 100%;
  color: #b2b2b2;
  text-align: left;

  &:hover:not([disabled]),
  &:focus:not([disabled]),
  &:active:not([disabled]) {
    outline: none;
    color: white;
  }

  &[disabled] {
    cursor: auto;
    color: #7e61f8;
  }
`

class ChainSelector extends React.Component {
  static propTypes = {
    onChainSelected: PropTypes.func.isRequired,
    canChangeChain: PropTypes.bool.isRequired,
    activeChain: PropTypes.string
  }

  state = { isOpen: false }

  handleChainSelected = chainId => {
    this.setState({ isOpen: false }, () => this.props.onChainSelected(chainId))
  }

  handleSelectorClick = () =>
    this.setState(state => ({ ...state, isOpen: !state.isOpen }))

  render() {
    return (
      <Container>
        <Toggle
          disabled={!this.props.canChangeChain}
          onClick={this.handleSelectorClick}
          type="button"
        >
          MET:{config.chains[this.props.activeChain].symbol}
          <Chevron
            className={`fas fa-chevron-${this.state.isOpen ? 'up' : 'down'}`}
          />
        </Toggle>

        {this.state.isOpen && (
          <OptionsContainer>
            {Object.keys(config.chains).map(chainId => (
              <Option
                data-chain={chainId}
                disabled={chainId === this.props.activeChain}
                onClick={() => this.handleChainSelected(chainId)}
                type="button"
                key={`chain-${chainId}`}
              >
                MET:{config.chains[chainId].symbol}
              </Option>
            ))}
          </OptionsContainer>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  canChangeChain: !state.wallet.chainId,
  activeChain: state.chain.active
})

const mapDispatchToProps = dispatch => ({
  onChainSelected: chainId =>
    dispatch({ type: 'ACTIVE_CHAIN_CHANGED', payload: { chainId } })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChainSelector)
