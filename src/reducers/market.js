import { handleActions } from 'redux-actions'

const initialState = {
  circulatingSupply: null,
  marketCapUsd: null,
  totalSupply: null
}

const reducer = handleActions(
  {
    UPDATE_AUCTION_STATUS: (state, { payload }) => ({
      ...state,
      totalSupply: payload.tokenSupply
    }),

    UPDATE_RATE: (state, { payload }) =>
      payload.type === 'MET'
        ? {
            ...state,
            circulatingSupply: payload.supply,
            marketCapUsd: payload.marketCapUsd
          }
        : state
  },
  initialState
)

export default reducer
