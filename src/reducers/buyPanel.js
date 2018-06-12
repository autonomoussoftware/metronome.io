import { handleActions } from 'redux-actions'

const initialState = {
  show: false,
  showStep: 'options',
  ongoingTx: {
    hash: ''
  },
  receipt: null
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
    SHOW_BUY_RECEIPT: (state, { payload }) => ({
      ...state,
      showStep: 'receipt',
      receipt: payload.transactionHash === state.ongoingTx.hash
        ? payload
        : state.receipt
    }),
    SHOW_BUY_WAITING: (state, { payload }) => ({
      ...state,
      showStep: 'waiting',
      ongoingTx: {
        hash: payload || ''
      }
    }),
    UPDATE_ONGOING_TX: (state, { payload }) => ({
      ...state,
      ongoingTx: payload.hash === state.ongoingTx.hash
        ? payload
        : state.ongoingTx
    })
  },
  initialState
)

export default reducer
