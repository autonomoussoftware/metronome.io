import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.section`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #333335;
  border-bottom: 2px solid #d1d1d1;
  padding: 16px 24px;
`

const Body = styled.div`
  padding: 16px 24px 24px 24px;
`

const Btn = styled.a`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.06;
  letter-spacing: 0.3px;
  text-align: center;
  color: #ffffff;
  background-color: #7e61f8;
  display: block;
  text-transform: uppercase;
  padding: 10px 28px;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.9;
    text-decoration: none;
    color: #ffffff;
  }
`

export default function Widget(props) {
  const { title, children, btnUrl, btnLabel } = props

  return (
    <Container>
      <Title>{title}</Title>
      <Body>
        {children}
        <Btn href={btnUrl}>{btnLabel}</Btn>
      </Body>
    </Container>
  )
}

Widget.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  btnUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
