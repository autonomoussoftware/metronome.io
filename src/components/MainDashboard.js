import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ConverterStatCard from './ConverterStatCard'
import AuctionStatCard from './AuctionStatCard'
import HeaderDashboard from './HeaderDashboard'
import MetPriceAreaBar from './MetPriceAreaBar'
import GeneralStats from './GeneralStats'
import METLoader from './METLoader'

const Container = styled.section`
  margin-top: 32px;
`

const Title = styled.h2`
  margin: 24px 0 8px 0;
  font-size: 24px;
  font-weight: 500;
`

class MainDashboard extends Component {
  render() {
    const { auction, converter } = this.props

    return (
      <div>
        {auction.loading || converter.loading ? (
          <div className="loader">
            <METLoader />
          </div>
        ) : (
          <div>
            <GeneralStats />

            <HeaderDashboard />

            <MetPriceAreaBar />

            <Container className="container-fluid">
              <Title>Stats</Title>
              <div className="row my-4">
                <div className="col-lg-4 col-md-6">
                  <AuctionStatCard />
                </div>
                <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                  <ConverterStatCard />
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  converter: state.converter,
  auction: state.auction
})

export default connect(mapStateToProps)(MainDashboard)
