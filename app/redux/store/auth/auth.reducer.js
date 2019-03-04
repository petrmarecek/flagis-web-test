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
        state.merge({
          isLogged: true,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          expiresIn: action.payload.expiresIn,
          expiresAt: action.payload.expiresAt,
          firebaseToken: action.payload.firebaseToken,
          profile: new Profile(action.payload.profile),
        }),
    },

    [AUTH.LOGOUT]: () => new AuthStore(),

    [AUTH.UPDATE_PROFILE]: (state, action) =>
      state.setIn(['profile'], new Profile(action.payload.profile)),
  },
  new AuthStore()
)
