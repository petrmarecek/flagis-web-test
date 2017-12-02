export const getEmail = (state) => {
  if (!state.auth.profile) {
    return ''
  }

  return state.auth.profile.email
}