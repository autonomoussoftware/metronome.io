import { compose, createStore } from 'redux'
import reduxLocalStorage from 'redux-localstorage'
import { identity } from 'lodash'

import rootReducer from './reducers'

const persistState =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? identity
    : reduxLocalStorage(['auction', 'rates', 'wallet'])

export default function(reduxDevtoolsOptions, initialState) {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevtoolsOptions)) ||
    compose

  return createStore(rootReducer, initialState, composeEnhancers(persistState))
}
