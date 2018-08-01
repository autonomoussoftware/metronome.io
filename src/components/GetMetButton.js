import styled, { keyframes } from 'styled-components'
import { BaseBtn } from './Btn'
import PropTypes from 'prop-types'
import React from 'react'

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Container = styled.div`
  position: relative;
  z-index: 3;
  animation: ${fade} 0.3s;
`

const BtnContainer = styled.div`
  display: flex;
`

const ActionBtn = styled(BaseBtn)`
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  line-height: 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: ${p => (p.isOpen ? '2px 0 0 0' : '2px 0 0 2px')};
  background-color: ${p => p.theme.colors.bg.primary} !important;
  color: ${p => p.theme.colors.light} !important;
  padding: 19px 20px;
  min-width: 230px;

  &:not([disabled]):active,
  &:not([disabled]):focus,
  &:not([disabled]):hover {
    opacity: 0.9;
    text-decoration: none;
  }
`

const CaretBtn = styled(BaseBtn)`
  text-transform: uppercase;
  letter-spacing: 1.6px;
  line-height: 1.14;
  font-size: 13px;
  font-weight: 600;
  border-radius: 0 2px 2px 0;
  border-radius: ${p => (p.isOpen ? '0 2px 0 0' : '0 2px 2px 0')};
  background-color: ${p => p.theme.colors.bg.primary} !important;
  color: ${p => p.theme.colors.light} !important;
  border-left: ${p => `1px solid ${p.theme.colors.lightShade}`};
  padding: 0 20px;

  &:not([disabled]):active,
  &:not([disabled]):focus,
  &:not([disabled]):hover {
    opacity: 0.9;
    text-decoration: none;
  }
`

const Arrow = styled.svg`
  transition: 0.3s transform;
  transform: rotateX(${p => (p.isOpen ? '180deg' : '0deg')});
`

const down = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const Menu = styled.div`
  position: absolute;
  z-index: -2;
  width: 100%;
  border-radius: 0 0 2px 2px;
  background-color: white;
  padding: 6px 0;
  box-shadow: ${p => `0 2px 2px ${p.theme.colors.darkShade}`};
  animation: 0.3s ${down};
`

const Item = styled(BaseBtn)`
  background-color: white;
  text-align: left;
  padding: 8px 19px;
  font-size: 13px;
  letter-spacing: 0.4px;
  color: ${p => p.theme.colors.copy} !important;

  &:hover {
    color: ${p => p.theme.colors.primary} !important;
  }
`

export default class GetMetButton extends React.Component {
  static propTypes = {
    defaultActive: PropTypes.string,
    items: PropTypes.objectOf(PropTypes.func).isRequired
  }

  state = {
    active: this.props.defaultActive || Object.keys(this.props.items)[0],
    isOpen: false
  }

  // eslint-disable-next-line
  onActionClick = () => {
    this.setState({ isOpen: false })
    this.props.items[this.state.active]()
  }

  onToggle = () => this.setState(state => ({ ...state, isOpen: !state.isOpen }))

  // eslint-disable-next-line
  onSelect = e => {
    this.setState({ isOpen: false })
    this.props.items[e.target.id]()
  }

  render() {
    return (
      <Container>
        <BtnContainer>
          <ActionBtn
            onClick={this.onActionClick}
            isOpen={this.state.isOpen}
            block
          >
            {this.state.active}
          </ActionBtn>
          <CaretBtn onClick={this.onToggle} isOpen={this.state.isOpen}>
            <Arrow
              viewBox="0 0 4 4"
              isOpen={this.state.isOpen}
              height="10"
              width="10"
              stroke="0"
              fill="white"
            >
              <path d="M 0 1, H 4, L 2 3, Z" />
            </Arrow>
          </CaretBtn>
        </BtnContainer>
        {this.state.isOpen && (
          <Menu>
            {Object.keys(this.props.items)
              .filter(i => i !== this.state.active)
              .map(i => (
                <Item key={i} id={i} onClick={this.onSelect} block>
                  {i}
                </Item>
              ))}
          </Menu>
        )}
      </Container>
    )
  }
}
