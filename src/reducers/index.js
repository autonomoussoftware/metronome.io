import { combineReducers } from 'redux'

import converter from './converter'
import auction from './auction'
import buyForm from './buyForm'
import buyPanel from './buyPanel'
import config from './config'
import rates from './rates'
import wallet from './wallet'

const rootReducer = combineReducers({
  converter,
  auction,
  buyForm,
  buyPanel,
  config,
  rates,
  wallet
})

export default rootReducer
