import { handleActions } from 'redux-actions'
import BigNumber from 'bignumber.js'

// Since both ETH and MET are 18 decimal places, we can use a single const
const DECIMAL_PLACES = 18

// Ensure all division operations are not properly rounded
BigNumber.config({ DECIMAL_PLACES })

// Values are in ETH, not wei
const initialState = {
  eth: null,
  wait: false,
  useMinimum: true,
  estimate: null,
  estimateStatus: 'init',
  estimateError: null
}

const reducer = handleActions(
  {
    CLEAR_CONVERT_FORM: () => initialState,
    SHOW_CONVERT_RECEIPT: () => initialState,

    UPDATE_CONVERT_ETH: (state, { payload }) => ({
      ...state,
      eth: payload
    }),

    UPDATE_CONVERT_ESTIMATE_START: state => ({
      ...state,
      estimateStatus: 'pending',
      estimateError: null,
      estimate: null
    }),

    UPDATE_CONVERT_ESTIMATE_SUCCESS: (state, { payload }) => ({
      ...state,
      estimateStatus: 'success',
      estimate: payload
    }),

    UPDATE_CONVERT_ESTIMATE_FAILURE: (state, { payload }) => ({
      ...state,
      estimateStatus: 'failure',
      estimateError: payload.message,
      estimate: null
    }),

    USE_MINIMUM_TOGGLE: state => ({
      ...state,
      useMinimum: !state.useMinimum
    }),

    SHOW_CONVERT_WAITING: state => ({
      ...state,
      wait: true
    })
  },
  initialState
)

export default reducer
