import React from 'react'
import PropTypes from 'prop-types'

import SignUp from '../forms/sign-up'

const SignUpContent = ({ location }) => <SignUp location={location} />

SignUpContent.propTypes = {
  location: PropTypes.object,
}

export default SignUpContent
