import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import normalizrMiddleware from 'redux-normalizr-middleware'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'

import persistentStore from './utils/persistentStore'
import { AuthStore } from './data/records'
import rootReducer from './store/root.reducer'
import rootSaga from './store/root.sagas'
import api from './utils/api'

export function configureStore() {

  // middleware
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddlewareObj = routerMiddleware(hashHistory)
  const middleware = [
    sagaMiddleware,
    routerMiddlewareObj,
    promiseMiddleware(),
    normalizrMiddleware(),
  ]

  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
  const auth = persistentStore.getItem('auth')
  
  const initialState = {}
  if (auth) {
    initialState.auth = new AuthStore({ ...auth, isLogged: true })
    api.setApiToken(auth.accessToken)
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devTools
    )
  )

  // Run sagas
  sagaMiddleware.run(rootSaga);

  return store
}
