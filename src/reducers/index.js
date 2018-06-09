import { combineReducers } from 'redux'

import auction from './auction'
import buyPanel from './buyPanel'
import config from './config'

const rootReducer = combineReducers({
  auction,
  buyPanel,
  config
})

export default rootReducer
