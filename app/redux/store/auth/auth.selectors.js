export const getAuth = (state) => {
  return state.getIn(['auth'])
}

export const getEmail = (state) => {
  if (!state.getIn(['auth', 'profile'])) {
    return ''
  }

  return state.getIn(['auth', 'profile', 'email'])
}

export const getNewRefreshToken = (state) => {
  return state.getIn(['auth', 'newRefreshToken'])
}

export const getUserId = (state) => {
  return state.getIn(['auth', 'profile', 'id'])
}
