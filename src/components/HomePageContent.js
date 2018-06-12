import { connect } from 'react-redux'
import React from 'react'

import AuctionSummary from './AuctionSummary'
import BuyMetronomeButton from './BuyMetronomeButton'
import EmailForm from './EmailForm'
import TokenSaleCountdown from './TokenSaleCountdown'

function HomePageContent (props) {
  const {
    isAuctionActive,
    isDailyAuction,
    isInitialAuction,
    onBuyMetronomeClick
  } = props

  return isInitialAuction
    ? <AuctionSummary />
    : isDailyAuction
      ? <BuyMetronomeButton
        disabled={!isAuctionActive}
        onClick={onBuyMetronomeClick} />
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
  onBuyMetronomeClick: () => dispatch({ type: 'SHOW_BUY_PANEL', payload: true })
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent)
