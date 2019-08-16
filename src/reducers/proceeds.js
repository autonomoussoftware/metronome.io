import { handleActions } from 'redux-actions'

const initialState = {
  error: null,
  loading: true,
  status: {}
}

const reducer = handleActions(
  {
    UPDATE_PROCEEDS_STATUS: (state, { payload }) => ({
      ...state,
      error: null,
      loading: false,
      status: {
        ...state.status,
        ...payload
      }
    }),
    METRONOME_STATUS_ERROR: (state, { payload }) => ({
      ...state,
      error: payload,
      loading: false
    })
  },
  initialState
)

export default reducer
