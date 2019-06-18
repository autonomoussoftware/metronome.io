import React, { Component } from 'react'
import shrinkArray from 'shrink-array'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import last from 'shrink-array/last'

import StatCard from '../common/StatCard'

class AuctionStatCard extends Component {
  static propTypes = {
    metApiUrl: PropTypes.string.isRequired,
    auction: PropTypes.shape({
      currentPrice: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    chartStatus: 'pending',
    chartError: null,
    chartData: []
  }

  // eslint-disable-next-line arrow-body-style
  retrieveData = () => {
    this.setState({ chartStatus: 'pending', chartError: null, chartData: [] })

    const { metApiUrl } = this.props
    const from = moment()
      .subtract({ days: 7 })
      .unix()
    const now = moment().unix()

    fetch(`${metApiUrl}history?from=${from}&to=${now}`)
      .then(response => response.json())
      .then(chartData =>
        this.setState({
          chartStatus: 'success',
          chartError: null,
          chartData: chartData.map(point => ({
            x: point.timestamp,
            y: parseInt(point.currentAuctionPrice, 10)
          }))
        })
      )
      .catch(err =>
        this.setState({
          chartStatus: 'failure',
          chartError: err.message,
          chartData: []
        })
      )
  }

  componentDidMount() {
    this.retrieveData()
  }

  static getDerivedStateFromProps(props, state) {
    const point = {
      y: parseInt(props.auction.currentPrice, 10),
      x: moment().unix()
    }
    const from = moment()
      .subtract({ days: 7 })
      .unix()
    const newChartData = state.chartData.concat(point).filter(p => p.x >= from)

    return {
      chartData: shrinkArray(newChartData, 500, last)
    }
  }

  render() {
    return (
      <StatCard
        title="Daily Auction"
        currentPrice={this.props.auction.currentPrice}
        chartStatus={this.state.chartStatus}
        chartLabel="Auction Price (last 7 days)"
        chartError={this.state.chartError}
        chartData={this.state.chartData}
        onRetry={this.retrieveData}
      />
    )
  }
}

const mapStateToProps = state => ({
  metApiUrl: state.config.chains[state.chain.active].metApiUrl,
  auction: state.auction.status
})

export default connect(mapStateToProps)(AuctionStatCard)
