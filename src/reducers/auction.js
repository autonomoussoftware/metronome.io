import { handleActions } from 'redux-actions'
import BigNumber from 'bignumber.js'

const initialState = {
  loading: true,
  status: {
    genesisTime: new Date('2018-06-18T00:00:00Z').getTime(),
    isAuctionInProgress: false,
    isDailyAuction: false,
    isInitialAuction: false
  }
}

const reducer = handleActions(
  {
    UPDATE_AUCTION_STATUS: (state, { payload }) => ({
      ...state,
      loading: false,
      status: {
        ...state.status,
        ...payload,
        isAuctionInProgress: !(new BigNumber(payload.tokensRemaining).eq(0)),
        isDailyAuction: !(payload.currentAuction === 0),
        isInitialAuction: payload.currentAuction === 0
      }
    })
  },
  initialState
)

export default reducer
