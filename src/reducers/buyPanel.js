import { handleActions } from 'redux-actions'

const initialState = {
  show: false,
  showBuyForm: false
}

const reducer = handleActions(
  {
    SHOW_BUY_PANEL: (state, { payload }) => ({
      ...state,
      show: payload
    }),
    SHOW_BUY_FORM: (state, { payload }) => ({
      ...state,
      showBuyForm: payload
    })
  },
  initialState
)

export default reducer
