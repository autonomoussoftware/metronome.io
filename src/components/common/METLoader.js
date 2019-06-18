import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

const Triangle = styled.path`
  fill: none;
  stroke-width: 5;
`

const animation = keyframes`
  0%, 100%  {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(-45deg);
  }
`

const Line = styled.line`
  animation: ${animation} 2s ease-in-out infinite;
  fill: none;
  stroke-linecap: round;
  stroke-width: 5;
  transform-origin: 50% 85%;
`

// eslint-disable-next-line complexity
const METLoader = ({ color, height, inline, size, style }) => (
  <svg
    height={size}
    style={{
      display: inline ? 'inline-block' : 'block',
      height: inline ? 'auto' : height || size * 1.5,
      margin: inline ? 0 : '0 auto',
      verticalAlign: inline ? 'middle' : 'inherit',
      ...style
    }}
    version="1.1"
    viewBox="0 0 88 88"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Triangle
      d="M75.2,78.5H12.8c-3.8,0-6.2-4.1-4.4-7.4l31.2-58.1c1.9-3.5,7-3.5,8.9,0l31.2,58.1C81.4,74.4,79,78.5,75.2,78.5z"
      stroke={color}
    />
    <Line x1="44" y1="22.5" x2="44" y2="78.5" stroke={color} />
  </svg>
)

METLoader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  inline: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object
}

METLoader.defaultProps = {
  color: '#7e61f8',
  inline: false,
  size: 88
}

export default METLoader
