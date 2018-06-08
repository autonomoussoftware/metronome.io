import { connect } from 'react-redux'
import { VictoryPie } from 'victory'
import BigNumber from 'bignumber.js'
import Countdown from 'react-countdown-now'
import React from 'react'

import TimeString from './TimeString'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function AuctionCounterSm (props) {
  const { currentAuction, nextAuctionStartTime, tokensRemaining } = props

  const endTime = nextAuctionStartTime * 1000
  const remainingTime = endTime - Date.now()
  const totalTime = (currentAuction === 0 ? 7 : 1) * MS_PER_DAY
  const auctionTime = totalTime - remainingTime
  const isAuctionInProgress = !(new BigNumber(tokensRemaining).eq(0))

  return (
    <div className="AuctionCounterSm">
      {isAuctionInProgress && <VictoryPie
        colorScale={[
          '#202020',
          '#7e61f8'
        ]}
        data={[
          { y: auctionTime },
          { y: remainingTime }
        ]}
      />}
      <span className="auction__counter-sm">
        <Countdown
          date={endTime}
          renderer={TimeString}
        />
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionInProgress
          ? 'Remaining'
          : 'Until Next Auction'}
      </span>
    </div>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionCounterSm)
