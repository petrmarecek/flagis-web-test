export const ERRORS = {
  ERROR_SENTRY: 'ERRORS/ERROR_SENTRY',
}

export const errorSentry = (err, data) => ({
  type: ERRORS.ERROR_SENTRY,
  payload: { err, data },
})
