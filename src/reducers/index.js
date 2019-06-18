import { combineReducers } from 'redux'

import convertPanel from './convertPanel'
import convertForm from './convertForm'
import converter from './converter'
import buyPanel from './buyPanel'
import auction from './auction'
import buyForm from './buyForm'
import wallet from './wallet'
import config from './config'
import rates from './rates'
import chain from './chain'

const rootReducer = combineReducers({
  convertPanel,
  convertForm,
  converter,
  buyPanel,
  buyForm,
  auction,
  config,
  wallet,
  rates,
  chain
})

export default rootReducer
