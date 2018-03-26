import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LandingPage from 'containers/landing-page/loadable'
import SignIn from 'containers/sign-in'
import SignUp from 'containers/sign-up'
import EmailResetPassword from 'containers/email-reset-password'
import ResetPassword from 'containers/reset-password'
import UserContainer from 'containers/user-container'
import NotFoundPage from 'containers/not-found-page/loadable'

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/email-reset-password" component={EmailResetPassword} />
        <Route path="/reset-password/*" component={ResetPassword} />
        <Route path="/user" component={UserContainer} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}
