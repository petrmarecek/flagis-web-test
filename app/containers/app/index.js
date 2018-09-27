import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LandingPage from 'containers/landing-page/loadable'
import SignInPage from 'containers/sign-in-page'
import SignUpPage from 'containers/sign-up-page'
import EmailResetPasswordPage from 'containers/email-reset-password-page'
import ResetPasswordPage from 'containers/reset-password-page'
import UserContainer from 'containers/user-container'
import NotFoundPage from 'containers/not-found-page/loadable'

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/email-reset-password" component={EmailResetPasswordPage} />
        <Route path="/reset-password/*" component={ResetPasswordPage} />
        <Route path="/user" component={UserContainer} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}
