import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  border-radius: 4px;
  background-color: #3b3b3b;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  height: 100%;
`

const Title = styled.div`
  padding: 16px 24px;
  font-family: Muli;
  font-size: 14px;
  line-height: 1.14;
  letter-spacing: 2px;
  color: #c1c1c1;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2)
`

const Body = styled.div`
  font-family: Muli;
  text-align: left;
`

export const CardAccent = styled.div`
  border-top: ${p => p.bt ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'};
  border-bottom: ${p => p.bb ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'};
  background-color: rgba(0, 0, 0, 0.1);
`

export default class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
  }

  render () {
    return (
      <Container>
        {this.props.title && <Title>{this.props.title}</Title>}
        <Body>
          {this.props.children}
        </Body>
      </Container>
    )
  }
}
