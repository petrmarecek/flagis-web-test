import React from 'react'
import PropTypes from 'prop-types'

import SignInContent from 'components/contents/sign-in-content'

const SignInPage = ({ location }) => <SignInContent location={location} />

SignInPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default SignInPage
