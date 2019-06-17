import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import AuctionCounter from '../common/AuctionCounter'
import ProviderInfo from '../common/ProviderInfo'
import METLoader from '../common/METLoader'
import MetValue from '../common/MetValue'
import BuyForm from './BuyForm'
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

const CountdownContainer = styled.div`
  border-top: 1px solid #d1d1d1;
  margin-top: 32px;
  padding: 16px 0;
  display: flex;
  align-items: center;
`

const Label = styled.div`
  flex-grow: 1;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: rgb(98, 98, 98);
  padding-bottom: 21px;
  padding-right: 42px;
`

const DepletedMessage = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: rgba(126, 97, 248, 0.08);
  border-top: 4px solid rgb(126, 97, 248);
  padding: 16px;
  margin-top: 8px;
  font-size: 13px;
  line-height: 22px;
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

const SupplyContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const SupplyLabel = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: rgb(98, 98, 98);
  flex-grow: 1;
  padding-right: 24px;
`

const SupplyValue = styled.div`
  text-align: right;
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: rgb(126, 97, 248);
  text-align: right;
  white-space: nowrap;
`

class AuctionsPage extends React.Component {
  static propTypes = {
    tokensRemaining: PropTypes.string,
    isAuctionActive: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  render() {
    return this.props.isLoading ? (
      <METLoader height="200px" />
    ) : (
      <Container>
        <NavBar activePage="auction" />
        <Header>
          <ProviderInfo />
        </Header>
        <Row>
          <Col>
            <Subtitle>BUY METRONOME</Subtitle>
            <Title>Daily Auction</Title>
            <Lead>
              Metronome has a daily supply of 2880 MET minted and auctioned.
            </Lead>
            <CountdownContainer>
              <Label>
                {this.props.isAuctionActive
                  ? 'Auction Time Remaining'
                  : 'Next Auction Starts In'}
              </Label>
              <AuctionCounter />
            </CountdownContainer>
            {this.props.isAuctionActive ? (
              <SupplyContainer>
                <SupplyLabel>Available Supply</SupplyLabel>
                <SupplyValue>
                  <MetValue>{this.props.tokensRemaining}</MetValue>
                </SupplyValue>
              </SupplyContainer>
            ) : (
              <DepletedMessage>
                This auction supply has all been purchased. Each daily auction
                begins at Midnight UTC.
                <br />
                <a
                  href="https://twitter.com/METAuction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow Metronome Auction
                </a>{' '}
                on Twitter for <strong>auction updates</strong>.
              </DepletedMessage>
            )}
            <LearnMore href="../buy">Learn more about The Auction</LearnMore>
          </Col>
          <Col>
            <BuyForm />
            <DisclaimerMessage>
              By choosing “Review Purchase” you are agreeing to our{' '}
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
  isAuctionActive: state.auction.status.isAuctionActive,
  tokensRemaining: state.auction.status.tokensRemaining,
  isLoading:
    state.auction.loading ||
    !state.auction.status.currentPrice ||
    typeof state.rates[state.config.chains[state.chain.active].symbol] !==
      'number'
})

export default connect(mapStateToProps)(AuctionsPage)
