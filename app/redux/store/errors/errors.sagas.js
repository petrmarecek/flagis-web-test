import * as Sentry from '@sentry/browser'

export function* errorSentry(action) {
  const { err, data } = action.payload

  if (
    process.env.NODE_ENV === 'local' ||
    process.env.NODE_ENV === 'development'
  ) {
    console.error(err)
  } else {
    // set user and tag
    Sentry.configureScope(scope => {
      scope.setTag(data.tagType, data.tagValue)
    })

    // set breadcrumb
    Sentry.addBreadcrumb({
      category: data.breadcrumbCategory,
      message: data.breadcrumbMessage,
      level: Sentry.Severity.Info,
    })

    // send error to sentry
    Sentry.captureException(err)
  }
}
