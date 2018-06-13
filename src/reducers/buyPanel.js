import { handleActions } from 'redux-actions'

const initialState = {
  error: null,
  ongoingTx: { hash: '' },
  receipt: null,
  show: false,
  showStep: 'options'
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
      error: null,
      receipt: payload.transactionHash === state.ongoingTx.hash
        ? payload
        : state.receipt,
      showStep: 'receipt'
    }),
    SHOW_BUY_WAITING: (state, { payload }) => ({
      ...state,
      showStep: 'waiting',
      ongoingTx: {
        hash: payload || ''
      }
    }),
    SHOW_BUY_ERROR: (state, { payload }) => ({
      ...state,
      error: payload,
      ongoingTx: initialState.ongoingTx,
      receipt: null,
      showStep: 'form'
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
