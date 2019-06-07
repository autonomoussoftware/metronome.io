import React, { Component } from 'react'
import shrinkArray from 'shrink-array'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import last from 'shrink-array/last'

import StatCard from '../common/StatCard'

const sevenDaysAgo = () =>
  moment()
    .subtract({ days: 7 })
    .unix()

class ConverterStatCard extends Component {
  static propTypes = {
    converter: PropTypes.shape({
      currentPrice: PropTypes.string.isRequired
    }).isRequired,
    config: PropTypes.shape({
      metApiUrl: PropTypes.string.isRequired
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

    const { metApiUrl } = this.props.config
    const from = sevenDaysAgo()
    const now = moment().unix()

    fetch(`${metApiUrl}/history?from=${from}&to=${now}`)
      .then(response => response.json())
      .then(data => data.filter(p => Boolean(p.currentConverterPrice)))
      .then(data =>
        this.setState({
          chartStatus: 'success',
          chartError: null,
          chartData: data.map(point => ({
            x: point.timestamp,
            y: parseInt(point.currentConverterPrice, 10)
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
      y: parseInt(props.converter.currentPrice, 10),
      x: moment().unix()
    }
    const from = sevenDaysAgo()
    const newChartData = state.chartData.concat(point).filter(p => p.x >= from)

    return {
      chartData: shrinkArray(newChartData, 500, last)
    }
  }

  render() {
    return (
      <StatCard
        title="Autonomous Converter"
        extraChartProps={{ minDomain: { x: sevenDaysAgo() } }}
        currentPrice={this.props.converter.currentPrice}
        chartStatus={this.state.chartStatus}
        chartLabel="Exchange Rate (last 7 days)"
        chartError={this.state.chartError}
        chartData={this.state.chartData}
        onRetry={this.retrieveData}
      />
    )
  }
}

const mapStateToProps = state => ({
  converter: state.converter.status,
  config: state.config
})

export default connect(mapStateToProps)(ConverterStatCard)
