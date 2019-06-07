import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import ValueInput from './ValueInput'

const Container = styled.div`
  position: relative;
  background-color: silver;

  & input {
    border: none;
    padding: ${p => (p.hasSuffix ? '10px 64px 10px 16px' : '10px 16px')};
    display: block;
    margin: 0;
    width: 100%;
    font-size: 16px;
    line-height: 1.8;
    letter-spacing: 0.3px;
    color: rgb(51, 51, 53);
    box-shadow: 0 0 0 1px #d1d1d1 inset;
  }

  & input:focus {
    box-shadow: 0 0 0 2px #7e61f8 inset;
    outline: none;
  }
`

const Label = styled.label`
  pointer-events: none;
  color: rgb(98, 98, 98);
  margin: 0;
  background: white;
  position: absolute;
  z-index: 1;
  padding: 0 4px;
  transition: 0.3s;
  transform: ${p =>
    !p.isEmpty ? 'translate3d(14px, -11px, 0)' : 'translate3d(12px, 10px, 0)'};
  font-size: ${p => (!p.isEmpty ? '13px' : '16px')};
  line-height: ${p => (!p.isEmpty ? '1.69' : '1.8')};
  letter-spacing: ${p => (!p.isEmpty ? '0.4' : '0.3px')};
`

const SuffixContainer = styled.div`
  position: relative;
`

const Suffix = styled.span`
  font-family: Roboto Mono;
  font-size: 16px;
  line-height: 1.8;
  color: rgb(98, 98, 98);
  position: absolute;
  right: 18px;
  top: 10px;
`

export default function TextInput(props) {
  const { label, suffix, value, id, ...other } = props

  return (
    <Container hasSuffix={Boolean(suffix)}>
      <Label htmlFor={id} isEmpty={value.length === 0}>
        {label}
      </Label>
      <SuffixContainer>
        <ValueInput id={id} value={value} {...other} />
        {suffix && <Suffix>{suffix}</Suffix>}
      </SuffixContainer>
    </Container>
  )
}

TextInput.propTypes = {
  suffix: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
