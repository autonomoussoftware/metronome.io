import Card, { CardAccent } from './Card'
import React, { Component } from 'react'
import HeaderDashboard from './HeaderDashboard'
import MetPriceAreaBar from './MetPriceAreaBar'
import GeneralStats from './GeneralStats'
import DollarValue from './DollarValue'
import { connect } from 'react-redux'
import METLoader from './METLoader'
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

class MainDashboard extends Component {
  render () {
    const { auction, converter } = this.props
    return (
      <div className={this.props.showScreenDarken ? 'MainDashboard container__main --screenDarken' : 'MainDashboard container__main'}>
        {auction.loading || converter.loading
          ? <div className="loader"><METLoader/></div>
          : <div>
            <GeneralStats />
            <div className="container__primary">
              <div className="container__primary--inner">
                <HeaderDashboard />
                <MetPriceAreaBar />
                <div className="container__row container__stats mt-3">
                  <div className="container__header-top-border"></div>
                  <div className="container__mtn-auction-inner">
                    <span className="label__title">Stats</span>
                    <div className="container-fluid">
                      <div className="row my-4">
                        <div className="col-lg-4 col-md-6">
                          <Card title="MET AUCTION">
                            <Accent>
                              <WidthConstraints>
                                <PriceContainer>
                                  <Value>1 MET</Value>
                                  <Equals>=</Equals>
                                  <Value>
                                    <EthValue>{auction.status.currentPrice}</EthValue>
                                  </Value>
                                </PriceContainer>
                                <DollarContainer>
                                  <DollarValue>{auction.status.currentPrice}</DollarValue>
                                </DollarContainer>
                              </WidthConstraints>
                            </Accent>
                          </Card>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                          <Card title="CONVERTER CONTRACT">
                            <Accent>
                              <WidthConstraints>
                                <PriceContainer>
                                  <Value>1 MET</Value>
                                  <Equals>=</Equals>
                                  <Value>
                                    <EthValue>{converter.status.currentPrice}</EthValue>
                                  </Value>
                                </PriceContainer>
                                <DollarContainer>
                                  <DollarValue>{converter.status.currentPrice}</DollarValue>
                                </DollarContainer>
                              </WidthConstraints>
                            </Accent>
                          </Card>
                        </div>
                        {/* <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                          <Card title="OTHER CARD">Other Content</Card>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  converter: state.converter,
  auction: state.auction
})

export default connect(mapStateToProps)(MainDashboard)
