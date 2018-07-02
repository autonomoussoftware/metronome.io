import { connect } from 'react-redux'
import React from 'react'

import BuyMetronomeButton from '../BuyMetronomeButton'

function HomePageContent (props) {
  const {
    isAuctionActive,
    onBuyMetronomeClick
  } = props

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 162,
    paddingTop: 7
  }

  return (
    <div style={buttonContainerStyle}>
      <BuyMetronomeButton
        disabled={!isAuctionActive}
        onClick={onBuyMetronomeClick} />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuctionActive: state.auction.status.isAuctionActive
})

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: true
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent)
