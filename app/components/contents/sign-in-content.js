import React from 'react'
import PropTypes from 'prop-types'

import SignIn from '../common/sign-in'

const SignInContent = ({ location }) => <SignIn location={location} />

SignInContent.propTypes = {
  location: PropTypes.object,
}

export default SignInContent
