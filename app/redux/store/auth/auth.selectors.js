export const getEmail = (state) => {
  if (!state.getIn(['auth', 'profile'])) {
    return ''
  }

  return state.getIn(['auth', 'profile', 'email'])
}
