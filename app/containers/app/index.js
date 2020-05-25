import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LandingPage from 'containers/landing-page/loadable'
import LegalPage from 'containers/legal-page/loadable'
import AboutPage from 'containers/about-page/loadable'
import ContactUsPage from 'containers/contact-us-page/loadable'
import SignInPage from 'containers/sign-in-page'
import SignUpPage from 'containers/sign-up-page'
import EmailResetPasswordPage from 'containers/email-reset-password-page'
import ResetPasswordPage from 'containers/reset-password-page'
import VerificationEmailPage from 'containers/verification-email-page'
import UserContainer from 'containers/user-container'
import NotFoundPage from 'containers/not-found-page/loadable'
import { GlobalStyles } from 'global-styles'
import { EditorStyles, CodeMirrorStyles } from 'components/editor/markdown-editor-styles'

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <EditorStyles />
      <CodeMirrorStyles />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/legal*" component={LegalPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact-us" component={ContactUsPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route
          path="/email-reset-password"
          component={EmailResetPasswordPage}
        />
        <Route path="/reset-password/*" component={ResetPasswordPage} />
        <Route path="/verification/email/*" component={VerificationEmailPage} />
        <Route path="/user" component={UserContainer} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}
