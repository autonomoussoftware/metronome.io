import { handleActions } from 'redux-actions'

const initialState = {
  address: null,
  balance: null,
  chainId: null
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
