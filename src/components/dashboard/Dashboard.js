import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ConverterStatCard from './ConverterStatCard'
import AuctionStatCard from './AuctionStatCard'
import HeaderDashboard from './HeaderDashboard'
import MetPriceAreaBar from './MetPriceAreaBar'
import GeneralStats from './GeneralStats'
import METLoader from '../common/METLoader'

const Container = styled.section`
  margin-top: 32px;
`

const Title = styled.h2`
  margin: 24px 0 8px 0;
  font-size: 24px;
  font-weight: 500;
`

class DashboardPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  }

  render() {
    const { isLoading } = this.props

    return isLoading ? (
      <METLoader />
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
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading || state.converter.loading
})

export default connect(mapStateToProps)(DashboardPage)