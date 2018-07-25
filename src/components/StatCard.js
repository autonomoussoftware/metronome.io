import { VictoryGroup, VictoryLine } from 'victory'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card, { CardAccent } from './Card'
import DollarValue from './DollarValue'
import METLoader from './METLoader'
import EthValue from './EthValue'

const Accent = styled(CardAccent)`
  padding: 32px 24px;
`

const WidthConstraints = styled.div`
  max-width: 300px;
  margin: 0 auto;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Muli;
  font-size: 18px;
  line-height: 1.2;
  color: #ffffff;
`

const Value = styled.div`
  padding: 12px 14px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  white-space: nowrap;
`

const Equals = styled.div`
  margin: 0 5px;
`

const DollarContainer = styled.div`
  margin-top: 16px;
  text-align: right;
  font-size: 13px;
`

const ChartContainer = styled.div`
  padding: 24px;
  min-height: 136px;
`

const Loading = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 200;
  margin: 9px 0;
`

const Label = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 200;
`

export default class StatCard extends Component {
  static propTypes = {
    extraChartProps: PropTypes.object,
    currentPrice: PropTypes.string.isRequired,
    chartStatus: PropTypes.oneOf(['success', 'failure', 'pending']).isRequired,
    chartLabel: PropTypes.string.isRequired,
    chartError: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    onRetry: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <Card title={this.props.title}>
        <Accent bb={this.props.chartData.length > 0}>
          <WidthConstraints>
            <PriceContainer>
              <Value>1 MET</Value>
              <Equals>=</Equals>
              <Value>
                <EthValue>{this.props.currentPrice}</EthValue>
              </Value>
            </PriceContainer>
            <DollarContainer>
              <DollarValue>{this.props.currentPrice}</DollarValue>
            </DollarContainer>
          </WidthConstraints>
        </Accent>
        <ChartContainer>
          {this.props.chartStatus === 'pending' && (
            <Loading>
              <METLoader size={32} />
              Loading data...
            </Loading>
          )}
          {this.props.chartStatus === 'success' && (
            <div>
              <VictoryGroup
                domainPadding={{ x: [0, 0], y: [4, 4] }}
                padding={{ top: 0, bottom: 0, right: 0, left: 0 }}
                height={60}
                {...this.props.extraChartProps}
              >
                <VictoryLine
                  animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                  style={{ data: { stroke: '#7e61f8', strokeWidth: 4 } }}
                  data={this.props.chartData}
                />
              </VictoryGroup>
              <Label className="mt-4">{this.props.chartLabel}</Label>
            </div>
          )}
          {this.props.chartStatus === 'failure' && (
            <div className="text-center">
              <button
                className="btn mt-2"
                onClick={this.props.onRetry}
                type="button"
              >
                Retry
              </button>
              <Label className="mt-3">{this.props.chartError}</Label>
            </div>
          )}
        </ChartContainer>
      </Card>
    )
  }
}
