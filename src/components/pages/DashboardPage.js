import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import MainDashboard from '../MainDashboard'
import METLoader from '../METLoader'

const DashboardPage = function({ isLoading }) {
  return isLoading ? <METLoader height="100px" /> : <MainDashboard />
}

DashboardPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading
})

export default connect(mapStateToProps)(DashboardPage)
