import { VictoryGroup, VictoryLine } from 'victory'
import Card, { CardAccent } from './Card'
import React, { Component } from 'react'
import DollarValue from './DollarValue'
import EthValue from './EthValue'
import styled from 'styled-components'

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

const ChartLabel = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 200;
  margin-top: 24px;
`

export default class StatCard extends Component {
  render () {
    const { currentPrice, chartData, title, chartLabel } = this.props
    return (
      <Card title={title}>
        <Accent bb={!!chartData}>
          <WidthConstraints>
            <PriceContainer>
              <Value>1 MET</Value>
              <Equals>=</Equals>
              <Value>
                <EthValue>{currentPrice}</EthValue>
              </Value>
            </PriceContainer>
            <DollarContainer>
              <DollarValue>{currentPrice}</DollarValue>
            </DollarContainer>
          </WidthConstraints>
        </Accent>
        {chartData && (
          <div className="p-4">
            <VictoryGroup
              domainPadding={4}
              padding={{ top: 0, bottom: 0, right: 0, left: 0 }}
              height={60}
            >
              <VictoryLine
                data={chartData}
                style={{ data: { stroke: '#7e61f8', strokeWidth: 4 } }}
                x="time"
                y="price"
              />
            </VictoryGroup>
            {chartLabel && (
              <ChartLabel>{chartLabel}</ChartLabel>
            )}
          </div>
        )}
      </Card>
    )
  }
}
