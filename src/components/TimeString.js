import PropTypes from 'prop-types'
import React from 'react'

const TimeString = ({ days, hours, minutes, seconds, completed }) => (
  <span>
    {completed
      ? 'Waiting...'
      : `${days ? `${days}:` : ''}${hours}:${minutes}:${seconds}`}
  </span>
)

TimeString.propTypes = {
  completed: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired
}

export default TimeString
