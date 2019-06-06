import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AuctionCounter from './AuctionCounter'
import AuctionTokens from './AuctionTokens'

const Container = styled.section`
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  @media (min-width: 840px) {
    flex-direction: row;
  }
`

const Cell = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  margin-top: ${p => (p.first ? '0' : '30px')};

  @media (min-width: 840px) {
    margin-top: 0;
    margin-left: ${p => (p.first ? '0' : '60px')};
    flex-grow: ${p => (p.grow ? '1' : '0')};
  }
`

const Label = styled.div`
  position: relative;
  margin: 0 0 8px 0;
  font-size: 16px;
`

class HeaderDashboard extends Component {
  render() {
    return (
      <Container>
        <Cell first>
          <Label>
            {this.props.isAuctionActive
              ? 'Auction Time Remaining'
              : 'Next Auction Starts In'}
          </Label>
          <AuctionCounter />
        </Cell>
        <Cell grow>
          <Label>Auction Tokens Available</Label>
          <AuctionTokens />
        </Cell>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isAuctionActive: state.auction.status.isAuctionActive
})

export default connect(mapStateToProps)(HeaderDashboard)
