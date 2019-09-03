import { compose, createStore } from 'redux'
import reduxLocalStorage from 'redux-localstorage'
import { identity } from 'lodash'

import rootReducer from './reducers'

const persistState =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? identity
    : reduxLocalStorage([
        'converter',
        'proceeds',
        'auction',
        'market',
        'wallet',
        'rates'
      ])

export default function(initialState) {
  const reduxDevtoolsOptions = {
    features: { dispatch: true }
  }

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevtoolsOptions)) ||
    compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(persistState)
  )

  // @see https://github.com/reduxjs/react-redux/releases/tag/v2.0.0
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
