import { handleActions } from 'redux-actions'
import BigNumber from 'bignumber.js'

const genesisTime = new Date('2018-06-18T00:00:00Z').getTime()

const initialState = {
  error: null,
  loading: true,
  status: {
    genesisTime,
    isAuctionActive: false
  }
}

// We don't have a "stateless" way to know how much tokens were available at the
// beginnig of the daily auctions because of the eventual carryover of the
// previous one. Therefore, let's assume all auctions are depleted and new ones
// start with 2880 tokens.
const dailyAuctionSupply = new BigNumber(2880).times(1e18).toNumber()

const reducer = handleActions(
  {
    UPDATE_AUCTION_STATUS: (state, { payload }) => ({
      ...state,
      error: null,
      loading: false,
      status: {
        ...state.status,
        ...payload,
        isAuctionActive: !(new BigNumber(payload.tokensRemaining).eq(0)),
        auctionSupply: dailyAuctionSupply,
        remainingPercentage: Math.min(
          new BigNumber(payload.tokensRemaining)
            .div(dailyAuctionSupply)
            .times(100)
            .toNumber(),
          100
        ),
        // Next auction start price will be 2x last purchase price unless the
        // last auction ended with unsold tokens. Contract functions that
        // calculate this as private so that logic should be replicated here.
        nextAuctionStartPrice: Date.now() < payload.genesisTime
          ? payload.lastPurchasePrice
          : new BigNumber(payload.lastPurchasePrice).times(2).toString(),
        currentAuctionEndTime: payload.nextAuctionStartTime
      }
    }),
    AUCTION_STATUS_ERROR: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false
    })
  },
  initialState
)

export default reducer
