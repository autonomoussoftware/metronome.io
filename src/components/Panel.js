import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import { BaseBtn } from './Btn'
import arrowIcon from '../img/arrow-forward-24-px.svg'
import closeIcon from '../img/close.svg'
import metIcon from '../img/light.svg'

const Container = styled.div`
  @media only screen and (max-device-width: 640px),
    only screen and (max-device-width: 667px),
    only screen and (max-width: 480px) {
    width: 90%;
  }
`

const Overlay = styled.div`
  transition: all 0.2s ease-in;
  position: fixed;
  z-index: ${p => (p.isOpen ? 10000 : -1)};
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  cursor: ${p => (p.isOpen ? 'pointer' : 'auto')};
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = styled.div`
  transition: all 0.2s ease-in;
  height: 100%;
  opacity: ${p => (p.isOpen ? 1 : 0)};

  position: fixed;
  right: ${p => (p.isOpen ? '0px' : '-460px')};
  top: 0;
  width: 460px;
  z-index: 10001;
  background-color: #343434;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);

  @media only screen and (max-device-width: 640px),
    only screen and (max-device-width: 667px),
    only screen and (max-width: 480px) {
    width: 360px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: ${p => p.theme.colors.primary};
  height: 64px;
  padding: 0 20px;
  box-shadow: 0 0 16px 0 ${p => p.theme.colors.darkShade};
  z-index: 1;
  position: relative;
`

const Title = styled.div`
  flex-grow: 1;
  font-size: 20px;
`

const BackBtn = styled(BaseBtn)`
  transform: rotate(180deg);
  margin-right: 15px;

  &:focus,
  &:hover {
    opacity: 0.5;
  }
`

const MetIcon = styled.img`
  margin-right: 15px;
`

const CloseBtn = styled(BaseBtn)`
  &:focus,
  &:hover {
    opacity: 0.5;
  }
`

const Body = styled.div`
  height: calc(100% - 64px);
  overflow-y: auto;
`

export default class Panel extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onBackClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { onRequestClose, onBackClick, children, isOpen, title } = this.props

    return (
      <Container>
        <Overlay isOpen={isOpen} onClick={onRequestClose} />
        <Content isOpen={isOpen}>
          <Header>
            {onBackClick ? (
              <BackBtn onClick={onBackClick}>
                <img alt="" src={arrowIcon} />
              </BackBtn>
            ) : (
              <MetIcon alt="" src={metIcon} />
            )}
            <Title>{title}</Title>
            <CloseBtn onClick={onRequestClose}>
              <img alt="" src={closeIcon} />
            </CloseBtn>
          </Header>
          <Body>{children}</Body>
        </Content>
      </Container>
    )
  }
}
