import { handleActions } from 'redux-actions'

const initialState = {
  accounts: [],
  balances: []
}

const reducer = handleActions(
  {
    UPDATE_WALLET_INFO: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
)

export default reducer
