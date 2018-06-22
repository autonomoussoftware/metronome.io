import { handleActions } from 'redux-actions'

const initialState = {
  accounts: []
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
