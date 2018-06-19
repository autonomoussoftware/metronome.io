import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTooltip
} from 'victory'
import { VictoryTheme } from 'victory-core'
import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import shrinkArray from 'shrink-array'
import last from 'shrink-array/last'

import EthValue from './EthValue'
import DollarValue from './DollarValue'

const MAX_DATA_POINTS = 500

const foregroudTickStyle = {
  grid: {
    stroke: '#292929',
    strokeDasharray: '',
    strokeOpacity: 0.5
  },
  axis: {
    stroke: 'none'
  },
  tickLabels: {
    fontSize: '4px',
    fill: '#fff',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0
  },
  axisLabel: {
    fontsize: 12
  }
}
const backgroundTickStyle = {
  grid: {
    stroke: 'none'
  },
  axis: {
    stroke: 'none'
  },
  tickLabels: {
    fontSize: '4px',
    fill: '#fff',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0
  },
  axisLabel: {
    fontsize: 12
  }
}

const timeWindows = {
  minute: { minutes: 1, label: 'Minute' },
  quarter: { minutes: 15, label: '15 Minutes' },
  hour: { hours: 1, label: 'Hour' },
  six: { hours: 6, label: '6 Hours' },
  twelve: { hours: 12, label: '12 Hours' },
  day: { days: 1, label: 'Day' },
  week: { days: 7, label: '7 Days' }
}

class MetPriceAreaBar extends Component {
  constructor (props) {
    super(props)

    this.changeTimeWindow = this.changeTimeWindow.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  state = {
    err: null,
    history: [],
    showDropdown: false,
    timeWindow: 'quarter'
  }

  retrieveData () {
    const { metApiUrl } = this.props.config

    const now = moment()
      .unix()
    const from = moment()
      .subtract(timeWindows[this.state.timeWindow])
      .unix()

    fetch(`${metApiUrl}/history?from=${from}&to=${now}`)
      .then(response => response.json())
      .then(data => this.setState({ err: null, history: data, timestamp: now }))
      .catch(err => this.setState({ err }))
  }

  componentDidMount () {
    this.retrieveData()
  }

  static getDerivedStateFromProps (props, state) {
    const {
      currentPrice,
      tokensRemaining
    } = props.auction

    const point = {
      timestamp: moment().unix(),
      minting: tokensRemaining,
      currentAuctionPrice: currentPrice
    }

    const from = moment()
      .subtract(timeWindows[state.timeWindow])
      .unix()

    const newHistory = state.history
      .concat(point)
      .filter(p => p.timestamp >= from)

    return {
      history: shrinkArray(newHistory, MAX_DATA_POINTS, last)
    }
  }

  parseHistory (data) {
    return data.map(point => ({
      time: point.timestamp * 1000,
      supply: new BigNumber(fromWei(point.minting)).toNumber(),
      price: new BigNumber(point.currentAuctionPrice).div(1e18).toNumber()
    }))
  }

  changeTimeWindow (timeWindow) {
    this.setState({ timeWindow, showDropdown: false }, () =>
      this.retrieveData()
    )
  }

  toggleDropdown () {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  // eslint-disable-next-line complexity
  render () {
    const {
      history: data,
      showDropdown,
      timeWindow
    } = this.state

    const {
      auction: { currentPrice }
    } = this.props

    const auctionChartData = this.parseHistory(data)

    return (
      <div className="container__mtn-price">
        <div className="container__header-top-border"></div>
        <div className="chart__main-inner-container">
          <span className="label__title">Charts </span>
          <div className="chart__main-label">
            <span className="label__Auction-Price">Auction Price:</span>
            <span className="label_-ETH"><EthValue>{currentPrice}</EthValue></span>
            <span className="label_-USD"><DollarValue/></span>
          </div>
          <div className={`chart__dropdown-time-selector ${showDropdown ? '--active' : ''}`} onClick={this.toggleDropdown}>
            <span className="label__selector">{timeWindows[timeWindow].label}<span className="arrow-down"></span></span>
            <div className={`chart__dropdown-time-selector--dropdown ${showDropdown ? '--show' : ''}`}>
              <div className="arrow-up"></div>
              <div className="chart__dropdown-time-selector-items">
                <ul>
                  <li onClick={() => this.changeTimeWindow('minute')} className={timeWindow === 'minute' ? '--active' : ''}><a>Minute</a></li>
                  <li onClick={() => this.changeTimeWindow('quarter')} className={timeWindow === 'quarter' ? '--active' : ''}><a>15 Minutes</a></li>
                  <li onClick={() => this.changeTimeWindow('hour')} className={timeWindow === 'hour' ? '--active' : ''}><a>Hour</a></li>
                  <li onClick={() => this.changeTimeWindow('six')} className={timeWindow === 'six' ? '--active' : ''}><a>6 Hours</a></li>
                  <li onClick={() => this.changeTimeWindow('twelve')} className={timeWindow === 'twelve' ? '--active' : ''}><a>12 Hours</a></li>
                  <li onClick={() => this.changeTimeWindow('day')} className={timeWindow === 'day' ? '--active' : ''}><a>Day</a></li>
                  <li onClick={() => this.changeTimeWindow('week')} className={timeWindow === 'week' ? '--active' : ''}><a>7 Days</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="chart__keys">
            <div className="supply__available-container">
              <div className="supply__available-box"></div>
              <span>Available Supply</span>
            </div>
            <div className="price__available-container">
              <div className="price__available-box"></div>
              <span>Price (ETH)</span>
            </div>
          </div>
          <div className="chart__victory-container">
            <div className="chart__victory-foreground">
              <VictoryChart
                theme={VictoryTheme.material}
                height={130}
                style={{ labels: { fontSize: 2 }, padding: 0 }}
                padding={{ top: 5, bottom: 15, right: 25, left: 15 }}>
                <VictoryAxis
                  height={400}
                  orientation="right"
                  tickFormat={x => (`${x} ETH`)}
                  dependentAxis
                  style={foregroudTickStyle}/>
                <VictoryGroup
                  data={auctionChartData}
                  x="time"
                  y="price"
                  dependentAxis>
                  <VictoryLine
                    interpolationNoooooo="basis"
                    style={{ data: { stroke: '#fff2', strokeWidth: 1 } }} />
                </VictoryGroup>
              </VictoryChart>
            </div>
            <div className="chart__victory-background">
              <VictoryChart
                theme={VictoryTheme.material}
                height={130}
                padding={{ top: 5, bottom: 15, right: 25, left: 15 }}>
                <VictoryAxis
                  tickCount={10}
                  scale={{ x: 'time' }}
                  style={backgroundTickStyle} />
                <VictoryAxis
                  height={400}
                  tickFormat={x => (`${x / 1000000}m`)}
                  dependentAxis
                  style={backgroundTickStyle} />
                <VictoryGroup
                  data={auctionChartData}
                  x="time"
                  y="supply"
                  dependentAxis
                  labels={d => `y: ${d.y}`}
                  labelComponent={<VictoryTooltip/>}>
                  <VictoryArea
                    style={{ data: { fill: '#7e61f8', fillOpacity: 0.3, stroke: '#7e61f8', strokeWidth: 0 } }} />
                </VictoryGroup>
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auction: state.auction.status,
  config: state.config
})

export default connect(mapStateToProps)(MetPriceAreaBar)
