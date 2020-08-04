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
  justify-content: space-between;
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
  & + & {
    margin-top: 64px;

    @media (min-width: 992px) {
      margin-top: 0;
      margin-left: 60px;
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

const SecondaryTitle = styled.h3`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #333335;
`
const AuctionProcessImage = styled.img`
  display: none;
  @media (min-width: 1200px) {
    display: block;
    width: 628px;
    height: 349px;
  }
`

const Lead = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #333335;
`

const CountdownContainer = styled.div`
  border-top: 1px solid #d1d1d1;
  margin-top: 32px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  font-weight: 500;
`

const Label = styled.div`
  flex-grow: 1;
  color: #333335;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.3px;
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

const AuctionProcessContainer = styled.div`
  @media (min-width: 992px) {
    max-width: 688px;
    padding-right: 60px;
    border-right: 2px solid #d1d1d1;
  }
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
          <Title>Daily Auction</Title>
          <ProviderInfo />
        </Header>
        <Lead>
          Metronome has a daily supply of 2880 MET minted and auctioned.
        </Lead>
        <Row>
          <Col>
            <AuctionProcessContainer>
              <AuctionProcessImage
                alt="Auction process"
                src="../dist/images/metronome-contracts-updated@2x.png"
              />
              <SecondaryTitle>
                Purchase Metronome During the Daily Auction
              </SecondaryTitle>
              <p>
                Metronome (MET) is more than a token — it’s an{' '}
                <a
                  href="https://medium.com/@MetronomeToken/metronome-defined-abaee7aab2e3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  entire monetary system built for DeFi
                </a>
                . The daily auction provides users with the opportunity to
                purchase MET.
              </p>
              <p>
                <a
                  href="https://medium.com/@MetronomeToken/on-metronome-author-retention-and-contract-behavior-73dad8f16494"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The proceeds from this daily auction stay within the ecosystem
                </a>{' '}
                in the form of the{' '}
                <a
                  href="https://medium.com/@MetronomeToken/contract-focus-pt-2-of-3-the-proceeds-contract-fb7801a9127c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proceeds contract
                </a>
                , which provides liquidity to the{' '}
                <a
                  href="https://medium.com/@MetronomeToken/contract-focus-pt-3-of-3-the-autonomous-converter-contract-d41b5141c49b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MET DEX
                </a>
                , where you can freely exchange ETH for MET and vice versa.
              </p>
              <SecondaryTitle>Here’s How It Works:</SecondaryTitle>
              <p>
                Every day, the Auction Contract autonomously mints 2,880 MET,
                which are sold through a descending price auction with a
                starting price set at 2x the previous day’s auction closing
                price.
              </p>
              <p>
                Once the Daily Supply Lot starts, purchasers purchase at the
                price they deem fair via the{' '}
                <a
                  href="https://medium.com/@MetronomeToken/how-to-purchase-metronome-from-the-metronome-wallet-51457f22239e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Metronome Wallet, Metamask or the smart contract address on
                  the website
                </a>
                .
              </p>
            </AuctionProcessContainer>
          </Col>
          <Col>
            <BuyForm />
            <DisclaimerMessage>
              By choosing “Review Purchase” you are agreeing to our{' '}
              <a href="../privacy">disclaimer</a> and{' '}
              <a href="../privacy">terms of service</a>.
            </DisclaimerMessage>
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
