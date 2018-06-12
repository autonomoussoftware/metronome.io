import { handleActions } from 'redux-actions'

const initialState = {
  show: false,
  showStep: 'options',
  ongoingTx: {
    hash: ''
  }
}

const reducer = handleActions(
  {
    SHOW_BUY_PANEL: (state, { payload }) => ({
      ...state,
      show: payload,
      showStep: payload ? 'options' : state.showStep
    }),
    SHOW_BUY_FORM: state => ({
      ...state,
      showStep: 'form'
    }),
    SHOW_BUY_OPTIONS: state => ({
      ...state,
      showStep: 'options'
    }),
    SHOW_BUY_WAITING: (state, payload) => ({
      ...state,
      showStep: 'waiting',
      ongoingTx: { hash: payload || '' }
    })
  },
  initialState
)

export default reducer
