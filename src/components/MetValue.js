import styled, { keyframes } from 'styled-components'
import smartRounder from 'smart-round'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import React from 'react'

const Container = styled.span`
  white-space: nowrap;
`

const blink = keyframes`
  50% {
    opacity: 0;
  }
`

const Pending = styled.span`
  animation: ${blink} 1s linear infinite;
`

// Metronome decimal places is hardcoded to 18 in the contract so it is safe and
// simpler to hardcode it here too
const DECIMAL_PLACES = 18

// Ensure all division operations are properly rounded by the library
BigNumber.config({ DECIMAL_PLACES })

const smartRound = smartRounder(6, 0, 6)

const fromUnit = {
  met: 1,
  atto: Math.pow(10, DECIMAL_PLACES)
}

const MetValue = ({ children, unit = 'atto' }) =>
  !children && children !== 0 ? (
    <Pending>...</Pending>
  ) : (
    <Container>
      {smartRound(new BigNumber(children).div(fromUnit[unit]), true)} MET
    </Container>
  )

MetValue.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string
}

export default MetValue
