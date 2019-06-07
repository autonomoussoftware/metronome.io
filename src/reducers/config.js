import { handleActions } from 'redux-actions'

const initialState = {
  desktopAppVersion: ''
}

const reducer = handleActions(
  {
    UPDATE_WALLET_VERSION: (state, { payload }) => ({
      ...state,
      desktopAppVersion: payload
    })
  },
  initialState
)

export default reducer
