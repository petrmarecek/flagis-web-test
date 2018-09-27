import React from 'react'
import PropTypes from 'prop-types'

import Landing from '../landing'

const LandingContent = ({ location }) => <Landing location={location} />

LandingContent.propTypes = {
  location: PropTypes.object,
}

export default LandingContent
