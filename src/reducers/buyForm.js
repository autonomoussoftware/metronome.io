import { handleActions } from 'redux-actions'
import BigNumber from 'bignumber.js'

const initialState = {
  eth: '0',
  met: '0'
}

const reducer = handleActions(
  {
    UPDATE_BUY_ETH: (state, { payload }) => ({
      ...state,
      eth: payload.value,
      met: new BigNumber(payload.value)
        .div(payload.rate)
        .times(1e18)
        .toString()
    }),
    UPDATE_BUY_MET: (state, { payload }) => ({
      ...state,
      eth: new BigNumber(payload.value)
        .times(payload.rate)
        .div(1e18)
        .toString(),
      met: payload.value
    }),
    UPDATE_AUCTION_STATUS: (state, { payload }) => ({
      ...state,
      met: new BigNumber(state.eth)
        .div(payload.currentPrice)
        .times(1e18)
        .toString()
    })
  },
  initialState
)

export default reducer
