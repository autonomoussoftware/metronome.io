import { compose, createStore } from 'redux'
import reduxLocalStorage from 'redux-localstorage'

import rootReducer from './reducers'

export default function (reduxDevtoolsOptions, initialState) {
  const composeEnhancers = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevtoolsOptions)
  ) || compose

  const persistState = reduxLocalStorage(['auction', 'rates', 'wallet'])

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(persistState)
  )
}
