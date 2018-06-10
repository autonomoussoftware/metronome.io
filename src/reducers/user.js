import { handleActions } from 'redux-actions'

const initialState = {
  accounts: []
}

const reducer = handleActions(
  {
    UPDATE_USER_ACCOUNTS: (state, { payload }) => ({
      ...state,
      accounts: payload || []
    })
  },
  initialState
)

export default reducer
