import React from 'react'
import PropTypes from 'prop-types'

import LandingContent from 'components/contents/landing-content'

const LandingPage = ({ location }) => <LandingContent location={location} />

LandingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default LandingPage
