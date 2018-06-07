import { combineReducers } from 'redux'

import auction from './auction'
import config from './config'

const rootReducer = combineReducers({
  auction,
  config
})

export default rootReducer
