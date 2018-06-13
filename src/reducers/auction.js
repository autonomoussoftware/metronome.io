import { handleActions } from 'redux-actions'
import BigNumber from 'bignumber.js'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const genesisTime = new Date('2018-06-18T00:00:00Z').getTime()
const genesisTimePlus7 = genesisTime + 7 * MS_PER_DAY

const now = Date.now()

const initialState = {
  loading: true,
  status: {
    genesisTime,
    isAuctionActive: false,
    isDailyAuction: now >= genesisTimePlus7,
    isInitialAuction: now >= genesisTime && now < genesisTimePlus7
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
        isAuctionActive: !(new BigNumber(payload.tokensRemaining).eq(0)),
        isDailyAuction: !(payload.currentAuction === 0),
        isInitialAuction: payload.currentAuction === 0
      }
    })
  },
  initialState
)

export default reducer
