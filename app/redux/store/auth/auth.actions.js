export const AUTH = {
  CONTROL_REDIRECT_SIGN_IN: 'AUTH/CONTROL_REDIRECT_SIGN_IN',
  CONTROL_REDIRECT_TASKS: 'AUTH/CONTROL_REDIRECT_TASKS',
  SIGN_UP: 'AUTH/SIGN_UP',
  SET_FIREBASE_TOKENS: 'AUTH/SET_FIREBASE_TOKENS',
  INIT_EMAIL: 'AUTH/INIT_EMAIL',
  VERIFY_USER: 'AUTH/VERIFY_USER',
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATE_PROFILE: 'AUTH/UPDATE_PROFILE',
  CHANGE_NAME: 'AUTH/CHANGE_NAME',
  CHANGE_USER_PHOTO: 'AUTH/CHANGE_USER_PHOTO',
  RESET_USER_PHOTO: 'AUTH/RESET_USER_PHOTO',
  CHANGE_PASSWORD: 'AUTH/CHANGE_PASSWORD',
  EMAIL_RESET_PASSWORD: 'AUTH/EMAIL_RESET_PASSWORD',
  RESET_PASSWORD: 'AUTH/RESET_PASSWORD',
  REFRESH_TOKEN: 'AUTH/REFRESH-TOKEN',
  RESTORED: 'AUTH/RESTORED',
  TOGGLE_COLOR_THEME: 'APP-STATE/TOGGLE_COLOR_THEME',
  CONTACT_US: 'AUTH/CONTACT_US',
  READ_TIP: 'AUTH/READ-TIP',
  UNREAD_TIP: 'AUTH/UNREAD-TIP',
}

export const controlRedirectSignIn = () => ({
  type: AUTH.CONTROL_REDIRECT_SIGN_IN,
})

export const controlRedirectTasks = () => ({
  type: AUTH.CONTROL_REDIRECT_TASKS,
})

export const verifyUser = code => ({
  type: AUTH.VERIFY_USER,
  payload: code,
})

export const signUp = userData => ({
  type: AUTH.SIGN_UP,
  payload: userData,
})

export const setFirebaseTokens = (firebaseToken, firebaseRefreshToken) => ({
  type: AUTH.SET_FIREBASE_TOKENS,
  payload: { firebaseToken, firebaseRefreshToken },
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

export const changeUserPhoto = userData => ({
  type: AUTH.CHANGE_USER_PHOTO,
  payload: userData,
})

export const resetUserPhoto = () => ({
  type: AUTH.RESET_USER_PHOTO,
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

export const sendContactUs = userData => ({
  type: AUTH.CONTACT_US,
  payload: userData,
})

export const readTip = tipName => ({
  type: AUTH.READ_TIP,
  payload: tipName,
})

export const unreadTip = tipName => ({
  type: AUTH.UNREAD_TIP,
  payload: tipName,
})
