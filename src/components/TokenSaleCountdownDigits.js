import React from 'react'

function TokenSaleCountdownDigits ({ days, hours, minutes, seconds }) {
  return (
    <React.Fragment>
      <div className="counter-item"><span>{days}</span> days</div>
      <div className="counter-item"><span>{hours}</span> hours</div>
      <div className="counter-item"><span>{minutes}</span> minutes</div>
      <div className="counter-item"><span>{seconds}</span> seconds</div>
    </React.Fragment>
  )
}

export default TokenSaleCountdownDigits
