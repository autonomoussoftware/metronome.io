import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import ConvertEthForm from './ConvertEthForm'
import ConvertMetForm from './ConvertMetForm'
import ProviderInfo from '../common/ProviderInfo'
import METLoader from '../common/METLoader'
import NavBar from '../common/NavBar'
import Modal from './Modal'

const Container = styled.div`
  margin-top: 48px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 48px;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`

const Col = styled.div`
  max-width: 352px;

  & + & {
    margin-top: 64px;

    @media (min-width: 992px) {
      margin-top: 0;
      margin-left: 118px;
    }
  }
`

const Title = styled.h1`
  font-size: 45px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: rgb(51, 51, 53);
  margin-top: 16px;
`

const Subtitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: rgb(98, 98, 98);
`

const Lead = styled.div`
  margin-top: 8px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: rgb(51, 51, 53);
`

const DisclaimerMessage = styled.div`
  font-size: 13px;
  line-height: 1.69;
  letter-spacing: 0.4px;
  color: rgb(98, 98, 98);
  margin-top: 16px;
`

const LearnMore = styled.a`
  font-size: 16px;
  margin-top: 24px;
  display: inline-block;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: rgb(126, 97, 248);
`

class ConverterPage extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    clearForm: PropTypes.func.isRequired
  }

  state = { convertFromEth: true }

  toggleConversion = () =>
    this.setState(
      s => ({ convertFromEth: !s.convertFromEth }),
      this.props.clearForm
    )

  render() {
    return this.props.isLoading ? (
      <METLoader height="200px" />
    ) : (
      <Container>
        <NavBar activePage="converter" />
        <Header>
          <ProviderInfo />
        </Header>
        <Row>
          <Col>
            <Subtitle>GET METRONOME</Subtitle>
            <Title>Converter</Title>
            <Lead>
              Convert ETH and MET via the Autonomous Converter Contract.
            </Lead>
            <LearnMore href="../buy">Learn more about The Converter</LearnMore>
          </Col>
          <Col>
            {this.state.convertFromEth ? (
              <ConvertEthForm onToggle={this.toggleConversion} />
            ) : (
              <ConvertMetForm onToggle={this.toggleConversion} />
            )}
            <DisclaimerMessage>
              By choosing “Review Conversion you are agreeing to our{' '}
              <a href="../privacy">disclaimer</a> and{' '}
              <a href="../privacy">terms of service</a>.
            </DisclaimerMessage>
          </Col>
        </Row>
        <Modal />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLoading:
    state.converter.loading ||
    !state.converter.status.currentPrice ||
    typeof state.rates[state.config.chains[state.chain.active].symbol] !==
      'number'
})

const mapDispatchToProps = dispatch => ({
  clearForm: () => dispatch({ type: 'CLEAR_CONVERT_FORM' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverterPage)
