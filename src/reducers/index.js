import { combineReducers } from 'redux'

import auction from './auction'
import buyPanel from './buyPanel'
import config from './config'
import user from './user'

const rootReducer = combineReducers({
  auction,
  buyPanel,
  config,
  user
})

export default rootReducer
