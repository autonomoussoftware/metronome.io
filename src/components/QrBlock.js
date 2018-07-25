import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.section`
  text-align: center;
`

const Label = styled.div`
  color: white;
  font-size: 13px;
  margin-top: 4px;
`

export default class QrBlock extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired
  }

  render() {
    return (
      <Container>
        <img alt="" src={this.props.imgSrc} />
        <Label>Scan Address</Label>
      </Container>
    )
  }
}
