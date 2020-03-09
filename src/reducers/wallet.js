import { handleActions } from 'redux-actions'

const initialState = {
  permissionStatus: 'not-asked',
  metBalance: null,
  address: null,
  balance: null,
  chainId: null
}

const reducer = handleActions(
  {
    UPDATE_WALLET_INFO: (state, { payload }) => ({
      ...state,
      ...payload,
      permissionStatus: payload.permissionStatus
        ? payload.permissionStatus
        : payload.address
        ? 'granted'
        : state.permissionStatus
    })
  },
  initialState
)

export default reducer
