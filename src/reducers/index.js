import { combineReducers } from 'redux'

import convertPanel from './convertPanel'
import convertForm from './convertForm'
import converter from './converter'
import buyPanel from './buyPanel'
import buyForm from './buyForm'
import auction from './auction'
import config from './config'
import wallet from './wallet'
import rates from './rates'

const rootReducer = combineReducers({
  convertPanel,
  convertForm,
  converter,
  buyPanel,
  buyForm,
  auction,
  config,
  rates,
  wallet
})

export default rootReducer
