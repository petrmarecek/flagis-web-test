import React from 'react'
import PropTypes from 'prop-types'

import ResetPassword from '../forms/reset-password'

const ResetPasswordContent = ({ location }) => (
  <ResetPassword location={location} />
)

ResetPasswordContent.propTypes = {
  location: PropTypes.object,
}

export default ResetPasswordContent
