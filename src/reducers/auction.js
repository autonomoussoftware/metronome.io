import { handleActions } from 'redux-actions'

const initialState = {
  loading: true,
  status: {
    genesisTime: new Date('2018-06-18T00:00:00Z').getTime() / 1000
  }
}

const reducer = handleActions(
  {
    UPDATE_AUCTION_STATUS: (state, { payload }) => ({
      ...state,
      loading: false,
      status: { ...state.status, ...payload }
    })
  },
  initialState
)

export default reducer
