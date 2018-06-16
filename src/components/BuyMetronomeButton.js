import React from 'react'

const BuyMetronomeButton = ({ disabled, onClick }) => (
  <button
    { ...(disabled ? { 'data-tooltip': 'Next auction has not started' } : {}) }
    className={`btn ${disabled ? 'btn-disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}>
    Buy Metronome
  </button>
)

export default BuyMetronomeButton
