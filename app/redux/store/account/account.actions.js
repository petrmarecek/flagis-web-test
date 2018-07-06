export const ACCOUNT = {
  SET_CONTENT: 'ACCOUNT/SET_CONTENT',
}

export const setContent = content => ({
  type: ACCOUNT.SET_CONTENT,
  payload: { content }
})

