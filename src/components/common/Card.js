import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  height: 100%;
`

const Title = styled.div`
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
  text-align: left;
`

export const CardAccent = styled.div`
  background-color: rgba(126, 97, 248, 0.1);
`

export default class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
  }

  render() {
    return (
      <Container>
        {this.props.title && <Title>{this.props.title}</Title>}
        <Body>{this.props.children}</Body>
      </Container>
    )
  }
}
