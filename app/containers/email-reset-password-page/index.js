import React from 'react'
import PropTypes from 'prop-types'

import EmailResetPasswordContent from 'components/contents/email-reset-password-content'

const EmailResetPasswordPage = ({ location }) => (
  <EmailResetPasswordContent location={location} />
)

EmailResetPasswordPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default EmailResetPasswordPage
