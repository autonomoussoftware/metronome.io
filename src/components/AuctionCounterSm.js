import { VictoryPie } from 'victory'
import Countdown from 'react-countdown-now'
import React from 'react'

import TimeString from './TimeString'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function AuctionCounterSm (props) {
  const { currentAuction, nextAuctionStartTime } = props

  const endTime = nextAuctionStartTime * 1000
  const remainingTime = endTime - Date.now()
  const totalTime = (currentAuction === 0 ? 7 : 1) * MS_PER_DAY
  const auctionTime = totalTime - remainingTime

  return (
    <div className="AuctionCounterSm">
      <VictoryPie
        colorScale={[
          '#202020',
          '#7e61f8'
        ]}
        data={[
          { y: auctionTime },
          { y: remainingTime }
        ]}
      />
      <span className="auction__counter-sm">
        <Countdown
          date={endTime}
          renderer={TimeString}
        />
      </span>
    </div>
  )
}

export default AuctionCounterSm
