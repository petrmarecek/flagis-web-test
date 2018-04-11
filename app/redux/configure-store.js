/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate, getStoredState } from 'redux-persist-immutable'
import immutableTransform from 'redux-persist-transform-immutable'
import normalizrMiddleware from 'redux/utils/normalizr-middleware'
import createSagaMiddleware from 'redux-saga'

import createReducer from 'redux/store/root.reducer'
import sagas from 'redux/store/root.sagas'
import { AuthStore as auth } from './data/records'
import localforage from 'localforage'
import api from './utils/api'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    normalizrMiddleware(),
  ];

  const enhancers = [
    autoRehydrate(),
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(sagas)

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./store/root.reducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store
}
