// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getAuth = state => state.getIn(['auth'])
export const getNewRefreshToken = state => state.getIn(['auth', 'newRefreshToken'])

export const getUserId = state => {
  if (!state.getIn(['auth', 'profile'])) {
    return null
  }

  return state.getIn(['auth', 'profile', 'id'])
}

export const getEmail = (state) => {
  if (!state.getIn(['auth', 'profile'])) {
    return ''
  }

  return state.getIn(['auth', 'profile', 'email'])
}
