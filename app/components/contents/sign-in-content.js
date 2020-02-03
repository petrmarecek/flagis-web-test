import React from 'react'
import PropTypes from 'prop-types'

import SignIn from '../forms/sign-in'

const SignInContent = ({ location }) => <SignIn location={location} />

SignInContent.propTypes = {
  location: PropTypes.object,
}

export default SignInContent
