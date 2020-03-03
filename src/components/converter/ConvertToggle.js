import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  display: flex;
  margin: -8px 0 32px;
`

const Item = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  margin: 0;
  outline: none;
  font: inherit;
  width: 0;
  flex-grow: 1;
  color: #626262;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 500;

  &[disabled] {
    background-color: rgba(126, 97, 248, 0.1);
    color: rgb(126, 97, 248);
  }

  &:active,
  &:hover,
  &:focus {
    outline: none;
    color: rgb(126, 97, 248);
  }
`

export default function ConvertToggle({ convertFrom, onToggle }) {
  return (
    <Container>
      <Item type="button" disabled={convertFrom === 'eth'} onClick={onToggle}>
        ETH to MET
      </Item>
      <Item type="button" disabled={convertFrom === 'met'} onClick={onToggle}>
        MET to ETH
      </Item>
    </Container>
  )
}

ConvertToggle.propTypes = {
  convertFrom: PropTypes.oneOf(['eth', 'met']).isRequired,
  onToggle: PropTypes.func.isRequired
}
