import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { titles } from 'components/head-title/head-title-common'

// components
import { withTitle } from 'components/head-title/withTitle'

// containers
import DefaultPage from 'containers/default-page'
import SignInPage from 'containers/sign-in-page'
import SignUpPage from 'containers/sign-up-page'
import EmailResetPasswordPage from 'containers/email-reset-password-page'
import ResetPasswordPage from 'containers/reset-password-page'
import VerificationEmailPage from 'containers/verification-email-page'
import UserContainer from 'containers/user-container'
import NotFoundPage from 'containers/not-found-page/loadable'

// styles
import { GlobalStyles } from 'global-styles'
import {
  EditorStyles,
  CodeMirrorStyles,
} from 'components/editor/markdown-editor-styles'

// adding title
const DefaultPageWithTitle = withTitle(DefaultPage, titles.DEFAULT)
const SignInPageWithTitle = withTitle(SignInPage, titles.SIGN_IN)
const SignUpPageWithTitle = withTitle(SignUpPage, titles.SIGN_UP)
const EmailResetPasswordPageWithTitle = withTitle(
  EmailResetPasswordPage,
  titles.EMAIL_RESET_PASSWORD
)
const ResetPasswordPageWithTitle = withTitle(
  ResetPasswordPage,
  titles.RESET_PASSWORD
)
const VerificationEmailPageWithTitle = withTitle(
  VerificationEmailPage,
  titles.VERIFICATION_EMAIL
)
const NotFoundPageWithTitle = withTitle(NotFoundPage, titles.NOT_FOUND)

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <EditorStyles />
      <CodeMirrorStyles />
      <Switch>
        <Route exact path="/" component={DefaultPageWithTitle} />
        <Route path="/sign-in" component={SignInPageWithTitle} />
        <Route path="/sign-up" component={SignUpPageWithTitle} />
        <Route
          path="/email-reset-password"
          component={EmailResetPasswordPageWithTitle}
        />
        <Route
          path="/reset-password/*"
          component={ResetPasswordPageWithTitle}
        />
        <Route
          path="/verification/email/*"
          component={VerificationEmailPageWithTitle}
        />
        <Route path="/user" component={UserContainer} />
        <Route component={NotFoundPageWithTitle} />
      </Switch>
    </div>
  )
}
