import { createStore } from 'redux'

import rootReducer from './reducers'

export default function (reduxDevtoolsOptions, initialState) {
  const enhancers = typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(reduxDevtoolsOptions)

  return createStore(rootReducer, initialState, enhancers)
}
