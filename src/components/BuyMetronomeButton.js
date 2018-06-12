import React from 'react'

const BuyMetronomeButton = ({ disabled, onClick }) => (
  <button
    className={`btn ${disabled ? 'btn-disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}>
    Buy Metronome
  </button>
)

export default BuyMetronomeButton
