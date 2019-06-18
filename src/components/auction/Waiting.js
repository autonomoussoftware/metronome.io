import detectProvider from 'web3-detect-provider'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import METLoader from '../common/METLoader'
import close from '../../img/cancel.svg'

const web3Provider = detectProvider('web wallet')

const Container = styled.div`
  pointer-events: initial;
  background-color: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
`

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
`

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    opacity: 0.9;
  }

  & > img {
    display: block;
  }
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  text-align: center;
  color: rgb(51, 51, 53);
  max-width: 200px;
  text-align: center;
  margin: 8px auto 32px;
`

const Note = styled.div`
  font-size: 13px;
  font-weight: normal;
  line-height: 1.69;
  letter-spacing: 0.4px;
  text-align: center;
  color: rgb(126, 97, 248);
  padding: 32px 0 8px;
  border-top: 1px solid #d1d1d1;
`

export default class Waiting extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired
  }

  render() {
    return (
      <Container>
        <Header>
          <CloseBtn onClick={this.props.onRequestClose}>
            <img src={close} alt="" />
          </CloseBtn>
        </Header>
        <METLoader size={44} />
        <Title>Finish this Purchase in {web3Provider}</Title>
        <Note>
          Note: Do not change the network or general configuration of{' '}
          {web3Provider} while your purchase is completing.
        </Note>
      </Container>
    )
  }
}
