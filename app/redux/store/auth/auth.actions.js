export const AUTH = {
  CONTROL_REDIRECT_SIGN_IN: 'AUTH/CONTROL_REDIRECT_SIGN_IN',
  CONTROL_REDIRECT_TASKS: 'AUTH/CONTROL_REDIRECT_TASKS',
  SIGN_UP: 'AUTH/SIGN_UP',
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATE_PROFILE: 'AUTH/UPDATE_PROFILE',
  CHANGE_PASSWORD: 'AUTH/CHANGE_PASSWORD',
  EMAIL_RESET_PASSWORD: 'AUTH/EMAIL_RESET_PASSWORD',
  RESET_PASSWORD: 'AUTH/RESET_PASSWORD',
  REFRESH_TOKEN: 'AUTH/REFRESH-TOKEN',
}

export const controlRedirectSignIn = () => ({
  type: AUTH.CONTROL_REDIRECT_SIGN_IN,
})

export const controlRedirectTasks = () => ({
  type: AUTH.CONTROL_REDIRECT_TASKS,
})

export const signUp = userData => ({
  type: AUTH.SIGN_UP,
  payload: userData
})

export const login = userData => ({
  type: AUTH.LOGIN,
  payload: userData
})

export const changePassword = userData => ({
  type: AUTH.CHANGE_PASSWORD,
  payload: userData
})

export const emailResetPassword = userData => ({
  type: AUTH.EMAIL_RESET_PASSWORD,
  payload: userData
})

export const resetPassword = userData => ({
  type: AUTH.RESET_PASSWORD,
  payload: userData
})

export const logout = () => ({ type: AUTH.LOGOUT })
