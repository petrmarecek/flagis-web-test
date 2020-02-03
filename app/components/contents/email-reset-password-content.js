import React from 'react'
import PropTypes from 'prop-types'

import EmailResetPassword from '../forms/email-reset-password'

const EmailResetPasswordContent = ({ location }) => (
  <EmailResetPassword location={location} />
)

EmailResetPasswordContent.propTypes = {
  location: PropTypes.object,
}

export default EmailResetPasswordContent
