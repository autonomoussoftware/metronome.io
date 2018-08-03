import smartRounder from 'smart-round'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.span`
  white-space: nowrap;
`

const smartRound = smartRounder(10, 2, 2)

const FiatValue = ({ children, suffix }) => (
  <Container>
    {smartRound(new BigNumber(children), true)} {suffix}
  </Container>
)

FiatValue.propTypes = {
  children: PropTypes.node.isRequired,
  suffix: PropTypes.string.isRequired
}

export default FiatValue
