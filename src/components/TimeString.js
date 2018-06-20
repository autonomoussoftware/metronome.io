import React from 'react'

const TimeString = ({ days, hours, minutes, seconds, completed }) =>
  <span>
    {completed
      ? <span class="blink">...</span>
      : `${days ? `${days}:` : ''}${hours}:${minutes}:${seconds}`}
  </span>

export default TimeString
