// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getFromValues = (state, form) =>
  state.getIn(['form', form, 'values'])

export const getForm = (state, form) => state.getIn(['form', form])
