import { connect } from 'react-redux'
import React from 'react'

import AuctionSummary from '../AuctionSummary'
import BuyMetronomeButton from '../BuyMetronomeButton'
import EmailForm from '../EmailForm'
import TokenSaleCountdown from '../TokenSaleCountdown'

function HomePageContent (props) {
  const {
    isAuctionActive,
    isDailyAuction,
    isInitialAuction,
    onBuyMetronomeClick
  } = props

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 162,
    marginTop: 37
  }

  return isInitialAuction
    ? <AuctionSummary />
    : isDailyAuction
      ? <div style={buttonContainerStyle}>
        <BuyMetronomeButton
          disabled={!isAuctionActive}
          onClick={onBuyMetronomeClick} />
      </div>
      : <React.Fragment>
        <TokenSaleCountdown />
        <EmailForm />
      </React.Fragment>
}

const mapStateToProps = state => ({
  isAuctionActive: state.auction.status.isAuctionActive,
  isDailyAuction: state.auction.status.isDailyAuction,
  isInitialAuction: state.auction.status.isInitialAuction
})

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: true
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent)
