import { handleActions } from 'redux-actions'

const initialState = {
  errorData: {},
  ongoingTx: { hash: '' },
  receipt: null,
  show: false,
  showStep: 'options',
  warn: ''
}

const reducer = handleActions(
  {
    SHOW_CONVERT_PANEL: (state, { payload }) => ({
      ...state,
      show: payload,
      showStep: payload ? 'options' : state.showStep
    }),
    SHOW_CONVERT_FORM: state => ({
      ...state,
      showStep: 'form'
    }),
    SHOW_CONVERT_OPTIONS: state => ({
      ...state,
      showStep: 'options'
    }),
    SHOW_CONVERT_RECEIPT: (state, { payload }) => ({
      ...state,
      errorData: {},
      receipt:
        payload.transactionHash === state.ongoingTx.hash
          ? payload
          : state.receipt,
      showStep: 'receipt'
    }),
    SHOW_CONVERT_WAITING: (state, { payload }) => ({
      ...state,
      showStep: 'waiting',
      ongoingTx: {
        hash: payload || ''
      }
    }),
    SHOW_CONVERT_ERROR: (state, { payload }) => ({
      ...state,
      errorData: payload,
      ongoingTx: initialState.ongoingTx,
      receipt: null,
      showStep: 'form'
    }),
    UPDATE_ONGOING_TX: (state, { payload }) => ({
      ...state,
      ongoingTx:
        payload.hash === state.ongoingTx.hash ? payload : state.ongoingTx
    }),
    UPDATE_WALLET_INFO: (state, { payload }) => ({
      ...state,
      warn: payload.accounts.length ? '' : 'Log into your web wallet'
    })
  },
  initialState
)

export default reducer
