/**
 * Test store addons
 */

import { browserHistory } from 'react-router-dom'
import configureStore from '../redux/configure-store'

/* eslint-disable no-undefined */
/* eslint-disable no-undef */

describe('configureStore', () => {
  let store

  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object')
    })
  })

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object')
    })
  })

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function')
    })
  })
})
