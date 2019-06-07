import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import DollarValue from '../common/DollarValue'
import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

const Container = styled.section`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
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

const UsdPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.8px;
  color: #7e61f8;
`

const EthPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: normal;
  color: #7e61f8;
`

const RowContainer = styled.div`
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  padding: 8px 0;
  margin-top: 16px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: #626262;
`

const Value = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: normal;
  color: #7e61f8;
`

function ConverterWidget(props) {
  const { currentPrice, availableEth, availableMet } = props

  return (
    <Container>
      <Title>Autonomous Converter</Title>
      <Body>
        <div>Price per MET</div>

        <UsdPrice>
          <DollarValue>{currentPrice}</DollarValue>
        </UsdPrice>
        <EthPrice>
          <EthValue>{currentPrice}</EthValue>
        </EthPrice>
        <RowContainer>
          <Row>
            <Label>Remaining MET</Label>
            <Value>
              <MetValue>{availableMet}</MetValue>
            </Value>
          </Row>
          <Row>
            <Label>Remaining ETH</Label>
            <Value>
              <EthValue>{availableEth}</EthValue>
            </Value>
          </Row>
        </RowContainer>
      </Body>
    </Container>
  )
}

ConverterWidget.propTypes = {
  currentPrice: PropTypes.string.isRequired,
  availableEth: PropTypes.string.isRequired,
  availableMet: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state.converter.status
}

export default connect(mapStateToProps)(ConverterWidget)
