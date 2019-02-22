// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getAuth = state => state.getIn(['auth'])

export const getUserProfile = state => {
  if (!state.getIn(['auth', 'profile'])) {
    return null
  }

  return state.getIn(['auth', 'profile'])
}

export const getNewRefreshToken = state =>
  state.getIn(['auth', 'newRefreshToken'])

export const getColorTheme = state => {
  const profile = state.getIn(['auth', 'profile'])
  if (!profile) {
    return 'standard'
  }

  if (!profile.has('settings')) {
    return 'standard'
  }

  const settings = state.getIn(['auth', 'profile', 'settings'])
  if (settings === null) {
    return 'standard'
  }

  const isColorTheme = settings.hasOwnProperty('colorTheme')
  return isColorTheme ? settings.colorTheme : 'standard'
}

export const getUserId = state => {
  if (!state.getIn(['auth', 'profile'])) {
    return null
  }

  return state.getIn(['auth', 'profile', 'id'])
}

export const getUserEmail = state => {
  if (!state.getIn(['auth', 'profile'])) {
    return null
  }

  return state.getIn(['auth', 'profile', 'email'])
}

export const getUsername = state => {
  if (!state.getIn(['auth', 'profile'])) {
    return null
  }

  if (state.getIn(['auth', 'profile', 'firstName']) === '') {
    return null
  }

  if (state.getIn(['auth', 'profile', 'lastName']) === '') {
    return null
  }

  return {
    firstName: state.getIn(['auth', 'profile', 'firstName']),
    lastName: state.getIn(['auth', 'profile', 'lastName']),
  }
}

export const getUserPhoto = state => {
  const profile = state.getIn(['auth', 'profile'])
  if (!profile) {
    return null
  }

  if (!profile.has('photo')) {
    return null
  }

  return state.getIn(['auth', 'profile', 'photo'])
}
