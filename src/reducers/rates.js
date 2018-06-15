import { handleActions } from 'redux-actions'

const initialState = {
  ETH_USD: 500
}

const reducer = handleActions(
  {
    UPDATE_RATE: (state, { payload }) => ({
      ...state,
      [payload.type]: payload.value
    })
  },
  initialState
)

export default reducer
