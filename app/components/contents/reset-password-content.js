import React from 'react'
import PropTypes from 'prop-types'

import ResetPassword from '../common/reset-password'

const ResetPasswordContent = ({ location }) => <ResetPassword location={location} />

ResetPasswordContent.propTypes = {
  location: PropTypes.object,
}

export default ResetPasswordContent
