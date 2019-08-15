import { combineReducers } from 'redux'

import convertPanel from './convertPanel'
import convertForm from './convertForm'
import converter from './converter'
import buyPanel from './buyPanel'
import proceeds from './proceeds'
import auction from './auction'
import buyForm from './buyForm'
import wallet from './wallet'
import config from './config'
import market from './market'
import rates from './rates'
import chain from './chain'

const rootReducer = combineReducers({
  convertPanel,
  convertForm,
  converter,
  buyPanel,
  proceeds,
  buyForm,
  auction,
  config,
  wallet,
  market,
  rates,
  chain
})

export default rootReducer
