import { handleActions } from 'redux-actions'
import { fromWei } from 'web3-utils'
import BigNumber from 'bignumber.js'

// Since both ETH and MET are 18 decimal places, we can use a single const
const DECIMAL_PLACES = 18

// Ensure all division operations are not properly rounded
BigNumber.config({ DECIMAL_PLACES })

// Values are in ETH and MET, not wei and aMET
const initialState = {
  tokensRemaining: null,
  currentPrice: null,
  estimate: '0',
  wait: false,
  eth: '0'
}

function getEstimate(input, available, rate) {
  return BigNumber.min(
    new BigNumber(input).div(fromWei(rate)),
    fromWei(available)
  ).toFixed(DECIMAL_PLACES)
}

const reducer = handleActions(
  {
    CLEAR_BUY_FORM: () => initialState,
    SHOW_BUY_RECEIPT: () => initialState,
    SHOW_BUY_WAITING: state => ({
      ...state,
      wait: true
    }),
    UPDATE_BUY_ETH: (state, { payload }) => ({
      ...state,
      eth: new BigNumber(payload.value).toFixed(DECIMAL_PLACES),
      estimate: getEstimate(
        payload.value,
        state.tokensRemaining,
        state.currentPrice
      )
    }),
    UPDATE_AUCTION_STATUS: (state, { payload }) =>
      // avoid updating estimate if status still not received
      state.currentPrice
        ? {
            ...state,
            tokensRemaining: payload.tokensRemaining,
            currentPrice: payload.currentPrice,
            estimate: getEstimate(
              state.eth,
              payload.tokensRemaining,
              payload.currentPrice
            )
          }
        : state
  },
  initialState
)

export default reducer
