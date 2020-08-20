import React from 'react'
import PropTypes from 'prop-types'

import ResetPasswordContent from 'components/contents/reset-password-content'

const ResetPasswordPage = ({ location }) => (
  <ResetPasswordContent location={location} />
)

ResetPasswordPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ResetPasswordPage
