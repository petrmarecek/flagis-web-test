import React from 'react'
import PropTypes from 'prop-types'

import VerificationEmailContent from 'components/contents/verification-email-content'

const VerificationEmailPage = ({ location }) => <VerificationEmailContent location={location} />

VerificationEmailPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default VerificationEmailPage
