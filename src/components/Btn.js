import styled from 'styled-components'

export const BaseBtn = styled.button.attrs({
  type: ({ submit }) => (submit ? 'submit' : 'button')
})`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  width: ${({ block }) => (block ? '100%' : 'auto')};
  font: inherit;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  background-color: transparent;
  padding: 0;
  color: ${p => p.theme.colors.light} !important;
  outline: none;

  &:focus {
    outline: none;
  }

  &[data-disabled='true'],
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Btn = BaseBtn.extend`
  text-transform: uppercase;
  letter-spacing: 1.6px;
  line-height: 1.14;
  font-size: 13px;
  font-weight: 600;
  border-radius: 2px;
  background-color: ${p =>
    p.negative ? 'white' : p.theme.colors.bg.primary} !important;
  color: ${p =>
    p.negative ? p.theme.colors.primary : p.theme.colors.light} !important;
  padding: 19px;

  &:not([disabled]):active,
  &:not([disabled]):focus,
  &:not([disabled]):hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

export const FieldBtn = BaseBtn.extend`
  float: ${p => (p.float ? 'right' : 'none')};
  line-height: 1.8rem;
  opacity: 0.5;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-shadow: 0 1px 1px ${p => p.theme.colors.darkShade};
  margin-top: ${p => (p.float ? '0.4rem' : 0)};
  white-space: nowrap;

  &:hover {
    opacity: 1;
  }
`

export const Link = Btn.withComponent('a').extend`
  -webkit-appearance: initial !important;
`
