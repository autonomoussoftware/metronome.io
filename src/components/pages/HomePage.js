import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import GetMetButton from '../GetMetButton'
import { Btn } from '../Btn'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 151px;
  padding-top: 7px;
  min-height: 52px;
`

const Placeholder = Container.extend`
  line-height: 52px;
  text-align: center;
  opacity: 0.5;
`

function HomePageContent(props) {
  const {
    onConvertMetronomeClick,
    onBuyMetronomeClick,
    isAuctionActive,
    converterPrice,
    auctionPrice
  } = props

  if (!converterPrice || !auctionPrice) {
    return (
      <Placeholder>Waiting for Auction and Converter status...</Placeholder>
    )
  }

  const isAuctionCheaper = new BigNumber(auctionPrice).lt(
    new BigNumber(converterPrice)
  )

  return (
    <Container>
      {isAuctionActive ? (
        <GetMetButton
          defaultActive={
            isAuctionCheaper ? 'Buy Metronome' : 'Convert ETH to MET'
          }
          items={{
            'Convert ETH to MET': onConvertMetronomeClick,
            'Buy Metronome': onBuyMetronomeClick
          }}
        />
      ) : (
        <Btn onClick={onConvertMetronomeClick}>Convert ETH to MET</Btn>
      )}
    </Container>
  )
}

HomePageContent.propTypes = {
  onConvertMetronomeClick: PropTypes.func.isRequired,
  onBuyMetronomeClick: PropTypes.func.isRequired,
  isAuctionActive: PropTypes.bool.isRequired,
  converterPrice: PropTypes.string,
  auctionPrice: PropTypes.string
}

const mapStateToProps = state => ({
  isAuctionActive: state.auction.status.isAuctionActive,
  converterPrice: state.auction.status.currentPrice,
  auctionPrice: state.auction.status.currentPrice
})

const mapDispatchToProps = dispatch => ({
  onConvertMetronomeClick: () =>
    dispatch({
      type: 'SHOW_CONVERT_PANEL',
      payload: true
    }),
  onBuyMetronomeClick: () =>
    dispatch({
      type: 'SHOW_BUY_PANEL',
      payload: true
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContent)
