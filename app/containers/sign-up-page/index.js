import React from 'react'
import PropTypes from 'prop-types'

import SignUpContent from 'components/contents/sign-up-content'

const SignUpPage = ({ location }) => <SignUpContent location={location} />

SignUpPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default SignUpPage
