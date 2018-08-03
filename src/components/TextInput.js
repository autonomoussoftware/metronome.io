import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Label = styled.label`
  display: block;
  margin: 0;
  line-height: 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${p => (p.hasErrors ? p.theme.colors.danger : p.theme.colors.light)};
  text-shadow: ${p => p.theme.textShadow};
`

const Input = styled.input`
  // trick to beat Bootstrap specificity
  && {
    border: none;
    display: block;
    height: ${({ rows }) => (rows ? `${40 * rows + 8}px` : '48px')};
    padding: 8px 16px;
    padding-right: ${({ hasSuffix }) => (hasSuffix ? '64px' : '16px')};
    background-color: ${p => p.theme.colors.translucentPrimary};
    margin-top: 8px;
    width: 100%;
    line-height: 40px;
    color: ${p => p.theme.colors.light};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-shadow: ${p => p.theme.textShadow};
    transition: box-shadow 300ms;
    resize: vertical;
    box-shadow: 0 2px 0 0px
      ${p => (p.hasErrors ? p.theme.colors.danger : 'transparent')};
  }

  &[type='number'] {
    -moz-appearance: textfield; //remove numeral arrows
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 0 0px ${p => p.theme.colors.primary};
    box-shadow: ${p =>
      p.noFocus && p.value.length > 0
        ? 'none'
        : `0 2px 0 0px ${p.theme.colors.primary}`};
  }

  @media (min-height: 600px) {
    height: ${({ rows }) => (rows ? `${40 * rows + 16}px` : '56px')};
  }
`

const ErrorMsg = styled.div`
  color: ${p => p.theme.colors.danger};
  line-height: 16px;
  font-size: 13px;
  font-weight: 600;
  text-align: right;
  text-shadow: ${p => p.theme.textShadow};
  margin-top: 4px;
  width: 100%;
  margin-bottom: -20px;
`

const InputContainer = styled.div`
  position: relative;
`

const Suffix = styled.div`
  top: 50%;
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #fff;
  right: 15px;
  margin-top: -8px;
`

export default class TextInput extends React.Component {
  static propTypes = {
    'data-testid': PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    suffix: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'password', 'url']),
    rows: PropTypes.number,
    cols: PropTypes.number,
    id: PropTypes.string.isRequired
  }

  InputControl =
    this.props.rows || this.props.cols ? Input.withComponent('textarea') : Input

  // eslint-disable-next-line complexity
  render() {
    const { label, value, type, id, error, suffix, ...other } = this.props

    const hasErrors = error && error.length > 0

    return (
      <div>
        <Label hasErrors={hasErrors} htmlFor={id}>
          {label}
        </Label>
        <InputContainer>
          <this.InputControl
            autoComplete="off"
            hasErrors={hasErrors}
            hasSuffix={!!suffix}
            value={value || ''}
            type={type || 'text'}
            id={id}
            {...other}
          />
          {suffix && <Suffix>{suffix}</Suffix>}
        </InputContainer>
        {hasErrors && (
          <ErrorMsg data-testid={`${this.props['data-testid']}-error`}>
            {typeof error === 'string' ? error : error.join('. ')}
          </ErrorMsg>
        )}
      </div>
    )
  }
}
