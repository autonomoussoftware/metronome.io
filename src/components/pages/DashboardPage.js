import { connect } from 'react-redux'
import React from 'react'

import MainDashboard from '../MainDashboard'
import METLoader from '../METLoader'

const DashboardPage = function ({ loadingAuctionStatus }) {
  return (
    loadingAuctionStatus
      ? <METLoader height="100px" />
      : <MainDashboard />
  )
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(DashboardPage)
