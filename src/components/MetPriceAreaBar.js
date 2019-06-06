import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine } from 'victory'
import React, { Component } from 'react'
import { VictoryTheme } from 'victory-core'
import smartRounder from 'smart-round'
import shrinkArray from 'shrink-array'
import { connect } from 'react-redux'
import { fromWei } from 'web3-utils'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import moment from 'moment'
import last from 'shrink-array/last'

import DollarValue from './DollarValue'
import EthValue from './EthValue'

const Container = styled.section`
  margin-top: 32px;
`

const Title = styled.h2`
  margin: 24px 0 8px 0;
  font-size: 24px;
  font-weight: 500;
`

const RowContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const PriceLabel = styled.div`
  margin-right: 16px;
`

const EthPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.8px;
  color: #7e61f8;
  margin-right: 16px;
`

const UsdPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: normal;
  color: #7e61f8;
`

const Dropdown = styled.div`
  position: relative;
  margin: -32px 0 0 0;
  float: right;
  border-radius: 5px;
  padding: 10px;
  background-color: ${p =>
    p.isActive ? 'rgba(126,97,248,0.1)' : 'transparent'};
  text-transform: uppercase;
  cursor: pointer;
`

const DropdownBtn = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.14;
  letter-spacing: 1.6px;
`

const DropdownPanel = styled.div`
  background-color: rgb(218, 211, 246);
  position: absolute;
  margin: 18px 0px 0px 0px;
  padding: 0px;
  border-radius: 5px;
  text-transform: none;
  width: 200px;
  z-index: 20;
  left: -50px;
`

const DropdownItemsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`

const DropdownItemsList = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style-type: none;
`

const DropdownItem = styled.li`
  background-color: ${p => (p.isActive ? '#c6bcf6' : 'transparent')};
  margin: 0px;
  color: #202020;
  width: 100%;
  padding: 15px;
  text-align: center;

  &:hover {
    background-color: #e5e0fd;
  }
`

const Arrow = styled.span`
  width: 0;
  height: 0;
  top: 12px;
  margin: 0 auto;
  position: relative;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #7e61f8;
  margin-left: 8px;
`

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  top: -8px;
  left: 90px;
  margin: 0 auto;
  position: absolute;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgb(218, 211, 246);
`

const ChartKeys = styled.div`
  clear: both;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0 15px 0 15px;
  position: relative;
`

const ChartKeyItem = styled.div`
  margin: 0 15px;
  display: flex;
  align-items: center;
`

const ChartKeyLabel = styled.div`
  font-size: 11px;
  font-weight: 500;
`

const SoldKeyBox = styled.div`
  background-color: #7e61f8;
  border-radius: 4px;
  display: inline-block;
  height: 16px;
  margin-right: 10px;
  width: 16px;
`

const PriceKeyBox = styled.div`
  background-color: #67686f;
  border-radius: 4px;
  display: inline-block;
  height: 2px;
  margin: 7px 10px 7px 0;
  width: 16px;
`

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`

const ChartBackground = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
`

const ChartForeground = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
`

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
    fill: '#626262',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0
  },
  axisLabel: {
    angle: 90,
    fill: '#626262',
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
    fill: '#626262',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0
  },
  axisLabel: {
    fill: '#626262',
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
  constructor(props) {
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

  retrieveData() {
    const { metApiUrl } = this.props.config

    const now = moment().unix()
    const from = moment()
      .subtract(timeWindows[this.state.timeWindow])
      .unix()

    fetch(`${metApiUrl}/history?from=${from}&to=${now}`)
      .then(response => response.json())
      .then(data => this.setState({ err: null, history: data, timestamp: now }))
      .catch(err => this.setState({ err }))
  }

  componentDidMount() {
    this.retrieveData()
  }

  static getDerivedStateFromProps(props, state) {
    const { currentAuction, currentPrice, tokensRemaining } = props.auction

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

  parseHistory(data) {
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
        supply: new BigNumber(fromWei(point.minting || '0')).toNumber(),
        time: point.timestamp * 1000,
        tokensSold: new BigNumber(point.currAuction === '0' ? 8000000 : 2880)
          .times(1e18)
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
        exactTime: point.time,
        time: point.group * grouping
      }))
      // group all points within the same target group (!)
      .reduce(function(groups, point) {
        const prop = `${point.auction}-${point.time}`
        groups[prop] = groups[prop] || []
        groups[prop].push(point)
        return groups
      }, {})

    const withTokensSold = Object.values(grouped)
      // from each group, take only the first and last data points
      .map(group => ({
        first: group.shift(),
        last: group.pop()
      }))
      .reduce(function(array, pair) {
        if (pair.first) {
          array.push(pair.first)
        }
        if (pair.last) {
          array.push(pair.last)
        }
        return array
      }, [])
      // and calculate the tokens sold in the group as the diff from previous
      // group's tokens sold but only if within the same auction
      .map((group, i, array) => ({
        ...group,
        tokensSoldInGroup:
          i === 0
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

  changeTimeWindow(timeWindow) {
    this.setState({ timeWindow, showDropdown: false }, () =>
      this.retrieveData()
    )
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  // eslint-disable-next-line complexity
  render() {
    const { history: data, showDropdown, timeWindow } = this.state

    const {
      auction: { isAuctionActive, currentPrice }
    } = this.props

    const auctionChartData = this.parseHistory(data)

    return (
      <Container>
        <Title>Charts</Title>

        <RowContainer>
          <PriceLabel>
            {isAuctionActive
              ? 'Current Auction Price: '
              : 'Auction Closing Price: '}
          </PriceLabel>
          <EthPrice>
            <EthValue>{currentPrice}</EthValue>
          </EthPrice>
          <UsdPrice>
            <DollarValue>{currentPrice}</DollarValue>
          </UsdPrice>
        </RowContainer>

        <Dropdown onClick={this.toggleDropdown} isActive={showDropdown}>
          <DropdownBtn>
            {timeWindows[timeWindow].label}
            <Arrow />
          </DropdownBtn>
          {showDropdown && (
            <DropdownPanel>
              <ArrowUp />
              <DropdownItemsContainer>
                <DropdownItemsList>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('quarter')}
                    isActive={timeWindow === 'quarter'}
                  >
                    15 Minutes
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('hour')}
                    isActive={timeWindow === 'hour'}
                  >
                    Hour
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('six')}
                    isActive={timeWindow === 'six'}
                  >
                    6 Hours
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('twelve')}
                    isActive={timeWindow === 'twelve'}
                  >
                    12 Hours
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('day')}
                    isActive={timeWindow === 'day'}
                  >
                    Day
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.changeTimeWindow('week')}
                    isActive={timeWindow === 'week'}
                  >
                    7 Days
                  </DropdownItem>
                </DropdownItemsList>
              </DropdownItemsContainer>
            </DropdownPanel>
          )}
        </Dropdown>

        <ChartKeys>
          <ChartKeyItem>
            <SoldKeyBox />
            <ChartKeyLabel>Tokens Sold</ChartKeyLabel>
          </ChartKeyItem>
          <ChartKeyItem>
            <PriceKeyBox />
            <ChartKeyLabel>Auction Price</ChartKeyLabel>
          </ChartKeyItem>
        </ChartKeys>

        <ChartContainer>
          <ChartForeground>
            <VictoryChart
              domainPadding={5}
              minDomain={{ y: 0 }}
              height={130}
              padding={{ top: 5, bottom: 15, right: 25, left: 25 }}
              style={{ labels: { fontSize: 2 }, padding: 0 }}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                dependentAxis
                height={400}
                label="PRICE [ETH]"
                orientation="right"
                style={foregroudTickStyle}
                tickFormat={y => `${smartRound(y)}`}
              />
              <VictoryLine
                data={auctionChartData}
                style={{ data: { stroke: '#999', strokeWidth: 1 } }}
                x="time"
                y="price"
              />
            </VictoryChart>
          </ChartForeground>
          <ChartBackground>
            <VictoryChart
              domainPadding={5}
              height={130}
              padding={{ top: 5, bottom: 15, right: 25, left: 25 }}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                scale={{ x: 'time' }}
                style={backgroundTickStyle}
                tickCount={10}
              />
              <VictoryAxis
                dependentAxis
                height={400}
                label="VOLUME [MET]"
                style={backgroundTickStyle}
                tickFormat={y => `${smartRound(y)}`}
              />
              <VictoryBar
                data={auctionChartData}
                style={{ data: { fill: '#7e61f8', fillOpacity: 0.3 } }}
                x="time"
                y="tokensSoldInGroup"
              />
            </VictoryChart>
          </ChartBackground>
        </ChartContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auction: state.auction.status,
  config: state.config
})

export default connect(mapStateToProps)(MetPriceAreaBar)
