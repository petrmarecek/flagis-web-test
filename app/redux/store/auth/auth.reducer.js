import { AUTH } from './auth.actions'
import { AuthStore, Profile } from '../../data/records'
import typeToReducer from 'type-to-reducer'

export default typeToReducer(
  {
    [AUTH.REFRESH_TOKEN]: {
      PENDING: state => state.set('newRefreshToken', true),

      FULFILLED: (state, action) =>
        state
          .set('accessToken', action.payload.accessToken)
          .set('expiresAt', action.payload.expiresAt)
          .set('expiresIn', action.payload.expiresIn)
          .set('firebaseToken', action.payload.firebaseToken)
          .set('newRefreshToken', false),
    },

    [AUTH.LOGIN]: {
      FULFILLED: (state, action) =>
        state
          .set('isLogged', true)
          .set('accessToken', action.payload.accessToken)
          .set('expiresAt', action.payload.expiresAt)
          .set('expiresIn', action.payload.expiresIn)
          .set('refreshToken', action.payload.refreshToken)
          .set('firebaseToken', action.payload.firebaseToken)
          .set('profile', new Profile(action.payload.profile)),
    },

    [AUTH.SET_FIREBASE_TOKENS]: (state, action) =>
      state
        .set('firebaseToken', action.payload.firebaseToken)
        .set('firebaseRefreshToken', action.payload.firebaseRefreshToken),

    [AUTH.LOGOUT]: () => new AuthStore(),

    [AUTH.UPDATE_PROFILE]: (state, action) =>
      state.set('profile', new Profile(action.payload.profile)),
  },
  new AuthStore()
)
