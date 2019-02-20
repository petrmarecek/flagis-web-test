export const AUTH = {
  CONTROL_REDIRECT_SIGN_IN: 'AUTH/CONTROL_REDIRECT_SIGN_IN',
  CONTROL_REDIRECT_TASKS: 'AUTH/CONTROL_REDIRECT_TASKS',
  SIGN_UP: 'AUTH/SIGN_UP',
  INIT_EMAIL: 'AUTH/INIT_EMAIL',
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATE_PROFILE: 'AUTH/UPDATE_PROFILE',
  CHANGE_NAME: 'AUTH/CHANGE_NAME',
  CHANGE_USER_IMAGE: 'AUTH/CHANGE_USER_IMAGE',
  CHANGE_PASSWORD: 'AUTH/CHANGE_PASSWORD',
  EMAIL_RESET_PASSWORD: 'AUTH/EMAIL_RESET_PASSWORD',
  RESET_PASSWORD: 'AUTH/RESET_PASSWORD',
  REFRESH_TOKEN: 'AUTH/REFRESH-TOKEN',
  TOGGLE_COLOR_THEME: 'APP-STATE/TOGGLE_COLOR_THEME',
}

export const controlRedirectSignIn = () => ({
  type: AUTH.CONTROL_REDIRECT_SIGN_IN,
})

export const controlRedirectTasks = () => ({
  type: AUTH.CONTROL_REDIRECT_TASKS,
})

export const signUp = userData => ({
  type: AUTH.SIGN_UP,
  payload: userData,
})

export const initEmail = invitationId => ({
  type: AUTH.INIT_EMAIL,
  payload: { invitationId },
})

export const login = userData => ({
  type: AUTH.LOGIN,
  payload: userData,
})

export const updateProfile = profile => ({
  type: AUTH.UPDATE_PROFILE,
  payload: { profile },
})

export const changeName = userData => ({
  type: AUTH.CHANGE_NAME,
  payload: userData,
})

export const changeUserImage = userData => ({
  type: AUTH.CHANGE_USER_IMAGE,
  payload: userData,
})

export const changePassword = userData => ({
  type: AUTH.CHANGE_PASSWORD,
  payload: userData,
})

export const emailResetPassword = userData => ({
  type: AUTH.EMAIL_RESET_PASSWORD,
  payload: userData,
})

export const resetPassword = userData => ({
  type: AUTH.RESET_PASSWORD,
  payload: userData,
})

export const logout = () => ({
  type: AUTH.LOGOUT,
})

export const toggleColorTheme = theme => ({
  type: AUTH.TOGGLE_COLOR_THEME,
  payload: { theme },
})
