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

const MAX_DATA_POINTS = 500

const smartRound = smartRounder(3, 0, 3)

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
    angle: 90,
    fill: '#fff',
    fontFamily: 'inherit',
    fontSize: 4,
    letterSpacing: 1,
    padding: 24
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
    fill: '#fff',
    fontFamily: 'inherit',
    fontSize: 4,
    letterSpacing: 1,
    padding: 20
  }
}

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
    timeWindow: 'day'
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
      currentAuction,
      currentPrice,
      tokensRemaining
    } = props.auction

    const point = {
      currAuction: `${currentAuction}`,
      currentAuctionPrice: currentPrice,
      minting: tokensRemaining,
      timestamp: moment().unix()
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

    const { grouping } = timeWindows[this.state.timeWindow]

    // const shouldGroup = (a, b) =>
    //   a.group === b.group && a.currentAuction === b.currentAuction

    const grouped = data
      // standardize data points
      .map(point => ({
        auction: point.currAuction,
        price: new BigNumber(point.currentAuctionPrice || '0')
          .div(1e18)
          .toNumber(),
        supply: new BigNumber(fromWei(point.minting || '0'))
          .toNumber(),
        time: point.timestamp * 1000,
        tokensSold: new BigNumber(auctionSupply)
          .minus(point.minting)
          .div(1e18)
          .toNumber()
      }))
      // ensure all are sorted by time
      .sort((a, b) => a.time - b.time)
      // add grouping information
      .map(point => ({
        ...point,
        group: Math.ceil(point.time / grouping)
      }))
      .map(point => ({
        ...point,
        time: point.group * grouping
      }))
      // group all points within the same target group (!)
      .reduce(function (groups, point) {
        const prop = `${point.auction}-${point.time}`
        groups[prop] = groups[prop] || []
        groups[prop].push(point)
        return groups
      }, {})

    const withTokensSold = Object.values(grouped)
      // from each group, take only the last one
      .map(group => group.pop())
      // and calculate the tokens sold in the group as the diff from previous
      // group's tokens sold but only if within the same auction
      .map((group, i, array) => ({
        ...group,
        tokensSoldInGroup: i === 0
          ? 0
          : group.auction !== array[i - 1].auction
            ? group.tokensSold
            : group.tokensSold - array[i - 1].tokensSold
      }))

    // remove the first element as was used only for reference to calculate the
    // next data point and has not useful data
    withTokensSold.shift()

    return withTokensSold
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
        currentPrice
      }
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
              <span>Tokens Sold</span>
            </div>
            <div className="price__available-container">
              <div className="price__available-box"></div>
              <span>Auction Price</span>
            </div>
          </div>
          <div className="chart__victory-container">
            <div className="chart__victory-foreground">
              <VictoryChart
                domainPadding={5}
                height={130}
                padding={{ top: 5, bottom: 15, right: 25, left: 25 }}
                style={{ labels: { fontSize: 2 }, padding: 0 }}
                theme={VictoryTheme.material}>
                <VictoryAxis
                  dependentAxis
                  height={400}
                  label="PRICE [ETH]"
                  orientation="right"
                  style={foregroudTickStyle}
                  tickFormat={y => `${smartRound(y)}`} />
                <VictoryLine
                  data={auctionChartData}
                  style={{ data: { stroke: '#fff2', strokeWidth: 1 } }}
                  x="time"
                  y="price" />
              </VictoryChart>
            </div>
            <div className="chart__victory-background">
              <VictoryChart
                domainPadding={5}
                height={130}
                padding={{ top: 5, bottom: 15, right: 25, left: 25 }}
                theme={VictoryTheme.material}>
                <VictoryAxis
                  scale={{ x: 'time' }}
                  style={backgroundTickStyle}
                  tickCount={10} />
                <VictoryAxis
                  dependentAxis
                  height={400}
                  label="VOLUME [MET]"
                  style={backgroundTickStyle}
                  tickFormat={y => `${smartRound(y)}`} />
                <VictoryBar
                  data={auctionChartData}
                  style={{ data: { fill: '#7e61f8', fillOpacity: 0.3 } }}
                  x="time"
                  y="tokensSoldInGroup" />
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
