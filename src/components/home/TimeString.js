import PropTypes from 'prop-types'
import React from 'react'

const TimeString = ({ hours, minutes, seconds, completed }) => (
  <span>{completed ? 'Waiting...' : `$${hours}:${minutes}:${seconds}`}</span>
)

TimeString.propTypes = {
  completed: PropTypes.bool.isRequired,
  seconds: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired
}

export default TimeString
