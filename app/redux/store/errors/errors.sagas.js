import * as Sentry from '@sentry/browser'

// redux
import { select } from 'redux-saga/effects'
import * as authSelectors from 'redux/store/auth/auth.selectors'

export function* errorSentry(action) {
  const { err, data } = action.payload
  const userEmail = yield select(state => authSelectors.getUserEmail(state))

  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  } else {
    // set user and tag
    Sentry.configureScope(scope => {
      scope.setUser({
        email: userEmail,
      })
      scope.setTag(data.tagType, data.tagValue)
    })

    // set breadcrumb
    Sentry.addBreadcrumb({
      category: data.breadcrumbCategory,
      message: `USER: ${userEmail} => ${data.breadcrumbMessage}`,
      level: Sentry.Severity.Info,
    })

    // send error to sentry
    Sentry.captureException(err)
  }
}