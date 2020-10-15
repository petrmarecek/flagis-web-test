import { AUTH } from './auth.actions'
import { AuthStore, Profile } from '../../data/records'
import typeToReducer from 'type-to-reducer'

export default typeToReducer(
  {
    [AUTH.REFRESH_TOKEN]: {
      FULFILLED: (state, action) =>
        state
          .set('accessToken', action.payload.accessToken)
          .set('expiresAt', action.payload.expiresAt)
          .set('expiresIn', action.payload.expiresIn)
          .set('firebaseToken', action.payload.firebaseToken),
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

    [AUTH.VERIFY_USER]: {
      FULFILLED: (state, action) =>
        state
          .set('isVerificationFailed', false)
          .set('isLogged', true)
          .set('accessToken', action.payload.accessToken)
          .set('expiresAt', action.payload.expiresAt)
          .set('expiresIn', action.payload.expiresIn)
          .set('refreshToken', action.payload.refreshToken)
          .set('firebaseToken', action.payload.firebaseToken)
          .set('profile', new Profile(action.payload.profile)),
      REJECTED: state => state.set('isVerificationFailed', true),
    },

    [AUTH.LOGOUT]: () => new AuthStore(),

    [AUTH.UPDATE_PROFILE]: (state, action) =>
      state.set('profile', new Profile(action.payload.profile)),

    [AUTH.READ_TIP]: {
      PENDING: (state, { payload }) => state
        .mergeIn(['profile', 'settings'], { tips: { [payload]: true } }),

      FULFILLED: (state, { payload }) => state.setIn(['profile'], new Profile(payload)),
    },

    [AUTH.UNREAD_TIP]: {
      PENDING: (state, { payload }) => state
        .mergeIn(['profile', 'settings'], { tips: { [payload]: false } }),

      FULFILLED: (state, { payload }) => state.setIn(['profile'], new Profile(payload)),
    },
  },
  new AuthStore(),
)
