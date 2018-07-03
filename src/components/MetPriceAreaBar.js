import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine
} from 'victory'
import { VictoryTheme } from 'victory-core'
import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import shrinkArray from 'shrink-array'
import last from 'shrink-array/last'
import smartRounder from 'smart-round'
import EthValue from './EthValue'
import DollarValue from './DollarValue'

const ReactHighcharts = require('react-highcharts')
const MAX_DATA_POINTS = 500
const smartRound = smartRounder(3, 0, 3)

const timeWindows = {
  quarter: { minutes: 15, label: '15 Minutes', grouping: 60000 },
  hour: { hours: 1, label: 'Hour', grouping: 60000 },
  six: { hours: 6, label: '6 Hours', grouping: 600000 },
  twelve: { hours: 12, label: '12 Hours', grouping: 1200000 },
  day: { days: 1, label: 'Day', grouping: 1200000 },
  week: { days: 7, label: '7 Days', grouping: 1200000 }
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
    timeWindow: 'hour'
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
      .then(data => this.setState({err: null, history: data, timestamp: now}))
      .catch(err => this.setState({ err }))
  }

  componentDidMount () {
    this.retrieveData()
    const chart = this.refs.chart.getChart()
    chart.series[0].addPoint({x: 10, y: 12})
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
    const { auctionSupply } = this.props.auction
    const parsed = data.map(point => ({
      time: point.timestamp * 1000,
      supply: new BigNumber(fromWei(point.minting || '0'))
        .toNumber(),
      price: new BigNumber(point.currentAuctionPrice || '0')
        .div(1e18)
        .toNumber(),
      tokensSold: Math.max(
        new BigNumber(auctionSupply)
          .minus(point.minting)
          .div(1e18)
          .toNumber(),
        0
      )
    }))

    const { grouping } = timeWindows[this.state.timeWindow]

    const byGroups = parsed.sort((a, b) => a.time - b.time).map(point => ({
      ...point,
      group: Math.ceil(point.time / grouping)
    })).map(point => ({
      ...point,
      time: point.group * grouping
    }))

    const grouped = byGroups.reduce(
      (arr, point) => arr[arr.length - 1].group === point.group
        ? arr
        : arr.concat({
          ...point,
          tokensSoldInGroup: point.tokensSold - arr[arr.length - 1].tokensSold
        }),
      [{
        ...byGroups[0],
        tokensSoldInGroup: 0
      }]
    )

    return grouped
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
      auction: {
        currentPrice,
        isDailyAuction
      }
    } = this.props
    const auctionChartData = this.parseHistory(data)
    const timeNestedArray = auctionChartData.map(
      dataMapped => moment(dataMapped.time).format('hh:mm')
    )
    const priceNestedArray = auctionChartData.map(priceMapped => priceMapped.price)
    const supplyNestedArray = auctionChartData.map(supplyMapped => supplyMapped.supply)
    const timeString = JSON.stringify(timeNestedArray)
    const priceString = JSON.stringify(priceNestedArray)
    const supplyString = JSON.stringify(supplyNestedArray)
    const parseTimeString = JSON.parse(timeString)
    const parsePriceString = JSON.parse(priceString)
    const parseSupplyString = JSON.parse(supplyString)
    const config = {
      chart: {
        backgroundColor: null,
        animation: false
      },
      xAxis: [{
        categories: parseTimeString,
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}'
        },
        title: {
          text: 'Volume'
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Price'
        },
        labels: {
          format: '{value}'
        }
      }],
      tooltip: {
        shared: true
      },
      series: [{
        name: 'Volume',
        type: 'area',
        animation: false,
        yAxis: 1,
        data: parseSupplyString
      }, {
        name: 'Price',
        animation: false,
        type: 'line',
        data: parsePriceString
      }]
    }
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
                  <li onClick={() => this.changeTimeWindow('quarter')} className={timeWindow === 'quarter' ? '--active' : ''}><a>15 Minutes</a></li>
                  <li onClick={() => this.changeTimeWindow('hour')} className={timeWindow === 'hour' ? '--active' : ''}><a>Hour</a></li>
                  <li onClick={() => this.changeTimeWindow('six')} className={timeWindow === 'six' ? '--active' : ''}><a>6 Hours</a></li>
                  <li onClick={() => this.changeTimeWindow('twelve')} className={timeWindow === 'twelve' ? '--active' : ''}><a>12 Hours</a></li>
                  <li onClick={() => this.changeTimeWindow('day')} className={timeWindow === 'day' ? '--active' : ''}><a>Day</a></li>
                  {isDailyAuction
                    ? <li onClick={() => this.changeTimeWindow('week')} className={timeWindow === 'week' ? '--active' : ''}><a>7 Days</a></li>
                    : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="chart__keys">
            <div className="supply__available-container">
              <div className="supply__available-box"></div>
              <span>Tokens Sold</span>
            </div>
            <div className="price__available-container">
              <div className="price__available-box"></div>
              <span>Auction Price</span>
            </div>
          </div>
          <div className="chart__victory-container">
            <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
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
