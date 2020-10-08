import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { titles } from 'utils/titles-enums'

// components
import { withTitle } from 'components/head-title/withTitle'

// containers
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

// styles
import { GlobalStyles } from 'global-styles'
import {
  EditorStyles,
  CodeMirrorStyles,
} from 'components/editor/markdown-editor-styles'

// adding title
const LandingPageWithTitle = withTitle({
  Component: LandingPage,
  title: titles.LANDING,
})
const LegalPageWithTitle = withTitle({
  Component: LegalPage,
  title: titles.LEGAL,
})
const AboutPageWithTitle = withTitle({
  Component: AboutPage,
  title: titles.ABOUT,
})
const ContactUsPageWithTitle = withTitle({
  Component: ContactUsPage,
  title: titles.CONTACT_US,
})
const SignInPageWithTitle = withTitle({
  Component: SignInPage,
  title: titles.SIGN_IN,
})
const SignUpPageWithTitle = withTitle({
  Component: SignUpPage,
  title: titles.SIGN_UP,
})
const EmailResetPasswordPageWithTitle = withTitle({
  Component: EmailResetPasswordPage,
  title: titles.EMAIL_RESET_PASSWORD,
})
const ResetPasswordPageWithTitle = withTitle({
  Component: ResetPasswordPage,
  title: titles.RESET_PASSWORD,
})
const VerificationEmailPageWithTitle = withTitle({
  Component: VerificationEmailPage,
  title: titles.VERIFICATION_EMAIL,
})
const NotFoundPageWithTitle = withTitle({
  Component: NotFoundPage,
  title: titles.NOT_FOUND,
})

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <EditorStyles />
      <CodeMirrorStyles />
      <Switch>
        <Route exact path="/" component={LandingPageWithTitle} />
        <Route exact path="/legal*" component={LegalPageWithTitle} />
        <Route exact path="/about" component={AboutPageWithTitle} />
        <Route exact path="/contact-us" component={ContactUsPageWithTitle} />
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
