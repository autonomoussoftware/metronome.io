import React from 'react'

const TimeString = ({ days, hours, minutes, seconds }) =>
  <span>{days ? `${days}:` : ''}{hours}:{minutes}:{seconds}</span>

export default TimeString
