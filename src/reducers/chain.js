import { handleActions } from 'redux-actions'

import config from '../config'

const defaultChain = Object.keys(config.chains).includes('3')
  ? '3'
  : Object.keys(config.chains)[0]

const initialState = {
  active: defaultChain
}

const reducer = handleActions(
  {
    UPDATE_WALLET_INFO: (state, { payload }) => ({
      ...state,
      active: Object.keys(config.chains).includes(payload.chainId)
        ? payload.chainId
        : defaultChain
    }),
    ACTIVE_CHAIN_CHANGED: (state, { payload }) => ({
      ...state,
      active: payload.chainId
    })
  },
  initialState
)

export default reducer
